package com.blog.blogassistantapi;
import com.google.protobuf.Struct;
import com.google.protobuf.Value;
import io.pinecone.clients.Index;
import io.pinecone.clients.Pinecone;
import io.pinecone.proto.DescribeIndexStatsResponse;
import io.pinecone.proto.QueryResponse;
import org.openapitools.db_control.client.model.DeletionProtection;
import io.pinecone.unsigned_indices_model.QueryResponseWithUnsignedIndices;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class PineconeExample {
    public static void main(String[] args) {
        // Initialize a client.
        // API key is required, but the value does not matter.
        // When starting without indexes, disable TLS and
        // provide the host and port of the Pinecone Local instance.
        String host = "http://localhost:5080";


        Pinecone pc = new Pinecone.Builder("pclocal")
                .withHost(host)
                .withTlsEnabled(false)
                .build();

        String indexName = "blog-assistant-index";
        pc.createServerlessIndex(indexName, "cosine", 1536, "aws", "us-east-1", DeletionProtection.DISABLED, null);
//
        Index index = pc.getIndexConnection("blog-assistant-index");
        // Create an index
        // Define the index name

        // Vector to query (1536 dimensions, filled with example values)
        List<Float> queryVector = IntStream.range(0, 1536)
                .mapToObj(i -> 0.1f) // Replace with actual values
                .collect(Collectors.toList());

        // Perform query
        QueryResponseWithUnsignedIndices response = index.query(
                5,                 // Top-K: Get the 5 most relevant results
                queryVector,         // Query vector
                null,              // Sparse indices (not used)
                null,              // Sparse values (not used)
                null,              // ID-based search (not needed here)
                "blog-outlines", // Namespace
                null,              // Metadata filtering (not used)
                false,             // Don't include full vector values
                true               // Include metadata (if available)
        );

        // Print query results
        response.getMatchesList().forEach(match -> {
            System.out.println("ID: " + match.getId());
            System.out.println("Score: " + match.getScore());
            System.out.println("Metadata: " + match.getMetadata());
        });
    }
}