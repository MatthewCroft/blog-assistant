package com.blog.blogassistantapi.controller;

import com.blog.blogassistantapi.model.RefinementRequest;
import com.blog.blogassistantapi.model.RefinementResponse;
import com.blog.blogassistantapi.service.RefinementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/refinement")
@CrossOrigin("*")
public class SelectionRefinementController {

    private final RefinementService refinementService; // Injected service to call OpenAI API

    public SelectionRefinementController(RefinementService refinementService) {
        this.refinementService = refinementService;
    }

    @PostMapping("/refine")
    public ResponseEntity<RefinementResponse> refineText(@RequestBody RefinementRequest request) {
        return ResponseEntity.ok(refinementService.refineText(request)); // Calls OpenAI API
    }

    @GetMapping("/refine")
    public ResponseEntity<List<RefinementResponse>> getBlogRefinements(@RequestParam String blogRefinements) {
        return ResponseEntity.ok(refinementService.getRefinements(blogRefinements));
    }
}
