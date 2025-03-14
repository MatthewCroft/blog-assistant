package com.blog.blogassistantapi.service;

import com.blog.blogassistantapi.model.RefinementRequest;
import com.blog.blogassistantapi.model.RefinementResponse;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.service.OpenAiService;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class RefinementService {
    private Map<String, List<RefinementResponse>> refinementMemory = new HashMap<>();
    private OpenAIService openAiService;
    private PineconeService pineconeService;

    public RefinementService(OpenAIService openAiService, PineconeService pineconeService) {
       this.openAiService = openAiService;
       this.pineconeService = pineconeService;
    }

    public List<RefinementResponse> getRefinements(String key) {
        return refinementMemory.getOrDefault(key, new ArrayList<>());
    }

    public RefinementResponse refineText(RefinementRequest refinementRequest) {
        String prompt = buildPrompt(
                refinementRequest.getTask(),
                refinementRequest.getSelectedHtml()
        );

        List<Float> embedding = openAiService.generateEmbedding(prompt);
        List<String> relevantVectors = pineconeService.searchPinecone(embedding);

        if (!relevantVectors.isEmpty()) {
            prompt = augmentPromptWithContext(prompt, relevantVectors);
        }

        String content = openAiService.chatCompletion(prompt);
        pineconeService.saveEmbedding(prompt, embedding);

        RefinementResponse refinementResponse = new RefinementResponse(sanitizeHtml(content), refinementRequest.getTask());

        String key = refinementRequest.getUserName()+"-"+refinementRequest.getBlogName();
        refinementMemory.putIfAbsent(key, new ArrayList<>());
        refinementMemory.get(key).add(refinementResponse);
        return refinementResponse;
    }

    private String augmentPromptWithContext(String prompt, List<String> vectors) {
        StringBuilder context = new StringBuilder("Relevant context from previous html refinements:\n\n");
        for (String vector : vectors) {
            context.append(vector).append("\n");
        }
        return context.append("\n\n").append(prompt).toString();
    }

    private String buildPrompt(String task, String contentHtml) {
        return String.format(
                "%s the following HTML content while keeping the formatting intact. Maintain paragraph tags, bold, italics, and lists.\n\n"
                        + "Content:\n%s\n\n",
                task, contentHtml
        );
    }

    private String sanitizeHtml(String html) {
        // Use Jsoup to clean and ensure valid HTML structure
        return Jsoup.clean(html, Safelist.basicWithImages());
    }
}
