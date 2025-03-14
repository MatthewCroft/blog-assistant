package com.blog.blogassistantapi.service;

import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.embedding.EmbeddingRequest;
import com.theokanning.openai.embedding.EmbeddingResult;
import com.theokanning.openai.service.OpenAiService;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OpenAIService {
    private OpenAiService openAIService;

    private String OPEN_API_KEY = "";

    public OpenAIService() {
       this.openAIService = new OpenAiService(OPEN_API_KEY, Duration.ofSeconds(30));
    }

    private OpenAiService getOpenAIService() {
        return this.openAIService;
    }

    public List<Float> generateEmbedding(String text) {
        EmbeddingRequest embeddingRequest = EmbeddingRequest.builder()
                .model("text-embedding-ada-002")
                .input(List.of(text))
                .build();

        EmbeddingResult embeddingResult = getOpenAIService().createEmbeddings(embeddingRequest);

        // Convert List<Double> to List<Float>
        return embeddingResult.getData().get(0).getEmbedding().stream()
                .map(Double::floatValue)
                .collect(Collectors.toList());
    }

    public String chatCompletion(String prompt) {
        ChatCompletionRequest completionRequest = ChatCompletionRequest.builder()
                .model("gpt-4")
                .messages(List.of(new ChatMessage("user", prompt)))
                .temperature(0.7)
                .build();

        return getOpenAIService().createChatCompletion(completionRequest)
                .getChoices()
                .get(0)
                .getMessage()
                .getContent();
    }
}
