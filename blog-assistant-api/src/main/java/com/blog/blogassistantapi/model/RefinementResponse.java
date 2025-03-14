package com.blog.blogassistantapi.model;

public class RefinementResponse {
    String refinement;

    String type;

    public RefinementResponse() {}

    public RefinementResponse(String refinement, String type) {
        this.refinement = refinement;
        this.type = type;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRefinement() {
        return refinement;
    }

    public void setRefinement(String refinement) {
        this.refinement = refinement;
    }
}
