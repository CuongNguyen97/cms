package com.smartreal.cms.model;

import com.smartreal.cms.util.LanguageUtil;
import org.apache.commons.lang3.StringUtils;

import java.util.Objects;

public class Room extends Gallery {
    private Long id;
    private String subject;
    private Long projectId;
    private Integer length;
    private Integer width;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Integer getLength() {
        return length;
    }

    public void setLength(Integer length) {
        this.length = length;
    }

    public Integer getWidth() {
        return width;
    }

    public void setWidth(Integer width) {
        this.width = width;
    }

    @Override
    public String getImageRelatedUrl() {
        if (Objects.nonNull(this.getImage())) {
            return StringUtils.join("project/room/", projectId, "_", LanguageUtil.normalizer(this.getSubject()).replaceAll("\\s", "-"));
        }

        return this.getImageUrl();
    }
}
