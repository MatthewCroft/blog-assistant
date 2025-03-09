package com.blog.blogassistantapi.service;
import com.blog.blogassistantapi.model.BlogOutlineRequest;
import com.blog.blogassistantapi.model.BlogOutlineResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatGPTService {

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    private static final String OPENAI_API_KEY = ""; // Replace with your API Key
    private final RestTemplate restTemplate;

    public ChatGPTService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public BlogOutlineResponse generateBlogOutline(BlogOutlineRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(OPENAI_API_KEY);

        // Construct ChatGPT prompt
        String prompt = generatePrompt(request);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-4"); // Use the latest available model
        requestBody.put("messages", Collections.singletonList(
                Map.of("role", "user", "content", prompt)
        ));
        requestBody.put("temperature", 0.7);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);
        Map<String, Object> response = restTemplate.postForObject(OPENAI_API_URL, entity, Map.class);

        if (response != null && response.containsKey("choices")) {
            // Extract the first choice
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");

            Map<String, Object> firstChoice = choices.get(0);

            // Extract the "message" map
            Map<String, Object> message = (Map<String, Object>) firstChoice.get("message");

            // Extract the "content" string
            String content = (String) message.get("content");
            return parseResponse(content);
        }

        return null;
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
        // Convert JSON to Java object using Jackson
        try {
            return new ObjectMapper().readValue(jsonResponse, BlogOutlineResponse.class);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}