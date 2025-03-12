package com.blog.blogassistantapi.service;

import com.blog.blogassistantapi.model.BlogOutlineRequest;
import com.blog.blogassistantapi.model.BlogOutlineResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.theokanning.openai.service.OpenAiService;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.embedding.EmbeddingRequest;
import com.theokanning.openai.embedding.EmbeddingResult;
import io.pinecone.clients.Index;
import io.pinecone.clients.Pinecone;
import io.pinecone.proto.*;
import org.openapitools.db_control.client.model.DeletionProtection;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ChatGPTService {

    private static final String OPENAI_API_KEY = ""; // Replace with your API Key
    private final OpenAiService openAiService;
    private final PineconeService pineconeService;

    public ChatGPTService(PineconeService pineconeService) {
        this.openAiService = new OpenAiService(OPENAI_API_KEY, Duration.ofSeconds(30));
        this.pineconeService = pineconeService;
   }

    public BlogOutlineResponse generateBlogOutline(BlogOutlineRequest request) {
        String prompt = generatePrompt(request);

        // Generate embeddings for the request
        List<Float> embedding = generateEmbedding(prompt);

        // Search Pinecone for relevant stored embeddings
        List<String> relevantVectors = pineconeService.searchPinecone(embedding);

        // If relevant embeddings exist, enhance the prompt
        if (!relevantVectors.isEmpty()) {
            prompt = augmentPromptWithContext(prompt, relevantVectors);
        }

        // Call ChatGPT with the enhanced prompt
        ChatCompletionRequest completionRequest = ChatCompletionRequest.builder()
                .model("gpt-4")
                .messages(List.of(new ChatMessage("user", prompt)))
                .temperature(0.7)
                .build();

        String content = openAiService.createChatCompletion(completionRequest)
                .getChoices()
                .get(0)
                .getMessage()
                .getContent();

        // Save the embedding in Pinecone for future use
        pineconeService.saveEmbedding(prompt, embedding);

        return parseResponse(content);
    }

    private List<Float> generateEmbedding(String text) {
        EmbeddingRequest embeddingRequest = EmbeddingRequest.builder()
                .model("text-embedding-ada-002")
                .input(List.of(text))
                .build();

        EmbeddingResult embeddingResult = openAiService.createEmbeddings(embeddingRequest);

        // Convert List<Double> to List<Float>
        return embeddingResult.getData().get(0).getEmbedding().stream()
                .map(Double::floatValue)
                .collect(Collectors.toList());
    }



    private String augmentPromptWithContext(String prompt, List<String> vectors) {
        StringBuilder context = new StringBuilder("Relevant context from previous blog outlines:\n\n");
        for (String vector : vectors) {
            context.append(vector).append("\n");
        }
        return context.append("\n\n").append(prompt).toString();
    }

    private String generatePrompt(BlogOutlineRequest request) {
        return String.format("""
            I want to create a structured blog post with well-defined headers, subheaders, and bullet points.
            
            Title: %s
            Category: %s
            Tone: %s
            Audience: %s
            Sources: %s
            Description: %s
            Keywords: %s
            Word Count: %s
            Call to Action: %s
            Content Format: %s
            Target Proficiency: %s
            Pain Points: %s
            Unique Angle: %s
            
            Based on this information, generate a structured JSON response in this format:
            {
              "title": "Your Blog Title",
              "outline": [
                {
                  "heading": "Main Heading 1",
                  "subheadings": [
                    {
                      "subheading": "Subheading 1.1",
                      "bulletPoints": [
                        "Bullet point 1",
                        "Bullet point 2",
                        "Bullet point 3"
                      ]
                    }
                  ]
                }
              ]
            }
            """,
                request.getTitle(),
                request.getCategory(),
                request.getTone(),
                request.getAudience(),
                request.getSources(),
                request.getDescription(),
                request.getKeywords(),
                request.getWordCount(),
                request.getCallToAction(),
                request.getContentFormat(),
                request.getTargetProficiency(),
                request.getPainPoints(),
                request.getUniqueAngle()
        );
    }

    private BlogOutlineResponse parseResponse(String jsonResponse) {
        try {
            return new ObjectMapper().readValue(jsonResponse, BlogOutlineResponse.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
