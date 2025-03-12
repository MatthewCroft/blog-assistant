package com.blog.blogassistantapi.service;

import io.pinecone.clients.Index;
import io.pinecone.clients.Pinecone;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PineconeService {
    private final Index index;
    private static final String PINECONE_API_KEY = "pclocal"; // Replace with your Pinecone API Key
    private static final String PINECONE_INDEX_NAME = "blog-assistant-index";
    private static final String PINECONE_NAMESPACE = "blog-outlines";

    public PineconeService() {
        String host = "http://localhost:5080";
        Pinecone pinecone = new Pinecone.Builder("pclocal")
                .withHost(host)
                .withTlsEnabled(false)
                .build();
        // Get index connection object
        this.index = pinecone.getIndexConnection(PINECONE_INDEX_NAME);
    }

    public List<String> searchPinecone(List<Float> embedding) {
        var response = index.query(
                5,                 // Top-K: Get the 5 most relevant results
                embedding,         // Query vector
                null,              // Sparse indices (not used)
                null,              // Sparse values (not used)
                null,              // ID-based search (not needed here)
                PINECONE_NAMESPACE, // Namespace
                null,              // Metadata filtering (not used)
                false,             // Don't include full vector values
                true               // Include metadata (if available)
        );

        return response.getMatchesList().stream()
                .map(match -> match.getId()) // Extract IDs (which represent stored context)
                .collect(Collectors.toList());
    }

    public void saveEmbedding(String text, List<Float> embedding) {
        String id = String.valueOf(text.hashCode()); // Create a unique ID based on text

        index.upsert(id, embedding, PINECONE_NAMESPACE); // Corrected method usage
    }
}
