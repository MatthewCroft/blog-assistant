package com.blog.blogassistantapi.controller;

import com.blog.blogassistantapi.model.BlogOutlineRequest;
import com.blog.blogassistantapi.model.BlogOutlineResponse;
import com.blog.blogassistantapi.service.ChatGPTService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/blog")
@CrossOrigin("http://localhost:5173")
public class BlogGeneratorController {

    private final ChatGPTService chatGPTService;

    public BlogGeneratorController(ChatGPTService chatGPTService) {
        this.chatGPTService = chatGPTService;
    }

    @PostMapping("/generate-outline")
    public ResponseEntity<BlogOutlineResponse> generateBlogOutline(@RequestBody BlogOutlineRequest request) {
        BlogOutlineResponse response = chatGPTService.generateBlogOutline(request);
        return ResponseEntity.ok(response);
    }
}

