package com.blog.blogassistantapi.model;

import java.util.List;

public class BlogOutlineRequest {
    private String title;
    private String category;
    private String tone;
    private String audience;
    private String sources;
    private String description;
    private String keywords;
    private String wordCount;
    private String callToAction;
    private String contentFormat;
    private String targetProficiency;
    private String painPoints;
    private String uniqueAngle;

    public String getKeywords() {
        return keywords;
    }

    public String getPainPoints() {
        return painPoints;
    }

    public void setKeywords(String keywords) {
        this.keywords = keywords;
    }

    public void setPainPoints(String painPoints) {
        this.painPoints = painPoints;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTone() {
        return tone;
    }

    public void setTone(String tone) {
        this.tone = tone;
    }

    public String getAudience() {
        return audience;
    }

    public void setAudience(String audience) {
        this.audience = audience;
    }

    public String getSources() {
        return sources;
    }

    public void setSources(String sources) {
        this.sources = sources;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWordCount() {
        return wordCount;
    }

    public void setWordCount(String wordCount) {
        this.wordCount = wordCount;
    }

    public String getCallToAction() {
        return callToAction;
    }

    public void setCallToAction(String callToAction) {
        this.callToAction = callToAction;
    }

    public String getContentFormat() {
        return contentFormat;
    }

    public void setContentFormat(String contentFormat) {
        this.contentFormat = contentFormat;
    }

    public String getTargetProficiency() {
        return targetProficiency;
    }

    public void setTargetProficiency(String targetProficiency) {
        this.targetProficiency = targetProficiency;
    }

    public String getUniqueAngle() {
        return uniqueAngle;
    }

    public void setUniqueAngle(String uniqueAngle) {
        this.uniqueAngle = uniqueAngle;
    }
}