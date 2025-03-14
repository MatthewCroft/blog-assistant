package com.blog.blogassistantapi.service;

import com.blog.blogassistantapi.model.BlogOutlineRequest;
import com.blog.blogassistantapi.model.BlogOutlineResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.theokanning.openai.service.OpenAiService;
import com.theokanning.openai.completion.chat.ChatCompletionRequest;
import com.theokanning.openai.completion.chat.ChatMessage;
import com.theokanning.openai.embedding.EmbeddingRequest;
import com.theokanning.openai.embedding.EmbeddingResult;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class BlogGeneratorService {

    private Map<String, List<BlogOutlineResponse>> blogMemory = new HashMap<>();
    private final OpenAIService openAiService;
    private final PineconeService pineconeService;

    public BlogGeneratorService(PineconeService pineconeService, OpenAIService openAIService) {
        this.pineconeService = pineconeService;
        this.openAiService = openAIService;
   }

   public List<BlogOutlineResponse> getUserBlogs(String userName) {
        return blogMemory.getOrDefault(userName, new ArrayList<>());
   }

   public BlogOutlineResponse generateBlogOutline(BlogOutlineRequest request) {
        String prompt = generatePrompt(request);

        // Generate embeddings for the request
        List<Float> embedding = openAiService.generateEmbedding(prompt);

        // Search Pinecone for relevant stored embeddings
        List<String> relevantVectors = pineconeService.searchPinecone(embedding);

        // If relevant embeddings exist, enhance the prompt
        if (!relevantVectors.isEmpty()) {
            prompt = augmentPromptWithContext(prompt, relevantVectors);
        }

        String content = openAiService.chatCompletion(prompt);

        // Save the embedding in Pinecone for future use
        pineconeService.saveEmbedding(prompt, embedding);

        BlogOutlineResponse response = parseResponse(content);
        blogMemory.putIfAbsent(request.getUserName(), new ArrayList<>());
        blogMemory.get(request.getUserName()).add(response);
        return response;
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
