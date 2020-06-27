package com.smartreal.cms.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import org.apache.commons.lang3.StringUtils;

import java.util.Objects;

@JsonPropertyOrder({"id", "projectId", "imageUrl"})
public class ProjectGallery extends Gallery {
    private Long projectId;

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    @Override
    public String getImageRelatedUrl() {
        if (Objects.nonNull(this.getImage())) {
            return StringUtils.join("project/gallery/", projectId, "_", System.currentTimeMillis());
        }

        return this.getImageUrl();
    }
}
