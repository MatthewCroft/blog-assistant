package com.blog.blogassistantapi.controller;

import com.blog.blogassistantapi.model.BlogOutlineRequest;
import com.blog.blogassistantapi.model.BlogOutlineResponse;
import com.blog.blogassistantapi.service.BlogGeneratorService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blog")
@CrossOrigin("*")
public class BlogGeneratorController {

    private final BlogGeneratorService blogGeneratorService;

    public BlogGeneratorController(BlogGeneratorService blogGeneratorService) {
        this.blogGeneratorService = blogGeneratorService;
    }

    @PostMapping("/generate-outline")
    public ResponseEntity<BlogOutlineResponse> generateBlogOutline(@RequestBody BlogOutlineRequest request) {
        BlogOutlineResponse response = blogGeneratorService.generateBlogOutline(request);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/generate-outline")
    public ResponseEntity<List<BlogOutlineResponse>> getBlogOutlines(@RequestParam String userName) {
        return ResponseEntity.ok(blogGeneratorService.getUserBlogs(userName));
    }
}

