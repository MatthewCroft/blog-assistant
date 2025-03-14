package com.blog.blogassistantapi.model;

public class RefinementRequest {
    String userName;
    String blogName;
    String task;
    String selectedHtml;
    String context;
    String style;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getBlogName() {
        return blogName;
    }

    public void setBlogName(String blogName) {
        this.blogName = blogName;
    }

    public String getTask() {
        return task;
    }

    public String getSelectedHtml() {
        return selectedHtml;
    }
}
