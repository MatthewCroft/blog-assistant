package com.blog.blogassistantapi.model;

import java.util.List;

public class BlogOutlineResponse {
    private String title;
    private List<Heading> outline;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Heading> getOutline() {
        return outline;
    }

    public void setOutline(List<Heading> outline) {
        this.outline = outline;
    }

    public static class Heading {
        private String heading;
        private List<Subheading> subheadings;

        public String getHeading() {
            return heading;
        }

        public void setHeading(String heading) {
            this.heading = heading;
        }

        public List<Subheading> getSubheadings() {
            return subheadings;
        }

        public void setSubheadings(List<Subheading> subheadings) {
            this.subheadings = subheadings;
        }
    }

    public static class Subheading {
        private String subheading;
        private List<String> bulletPoints;

        public String getSubheading() {
            return subheading;
        }

        public void setSubheading(String subheading) {
            this.subheading = subheading;
        }

        public List<String> getBulletPoints() {
            return bulletPoints;
        }

        public void setBulletPoints(List<String> bulletPoints) {
            this.bulletPoints = bulletPoints;
        }
    }
}
