package com.smartreal.cms.service;

import com.smartreal.cms.client.CloudinaryClient;
import com.smartreal.cms.mapper.ProjectMapper;
import com.smartreal.cms.model.Paging;
import com.smartreal.cms.model.Project;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class ProjectService {
    private final ProjectMapper projectMapper;
    private final CloudinaryClient cloudinaryClient;

    public ProjectService(ProjectMapper projectMapper, CloudinaryClient cloudinaryClient) {
        this.projectMapper = projectMapper;
        this.cloudinaryClient = cloudinaryClient;
    }

    public Project getProjectById(long id) {
        return projectMapper.getProjectById(id);
    }

    public Paging<Project> getProjectList(long offset, int size, String subject) {
        long total = projectMapper.getProjectCount(subject);
        List<Project> contents = projectMapper.getProjectList(offset, size, subject);

        return Paging.<Project>builder().total(total).contents(contents).build();
    }

    @Transactional
    public Project insertProject(Project project) {
        String thumbnailUrl = cloudinaryClient.upload(project.getThumbnail(), project.getThumbnailRelatedUrl());
        project.setThumbnailUrl(thumbnailUrl);

        projectMapper.insertProject(project);

        return projectMapper.getProjectById(project.getId());
    }

    @Transactional
    public Project updateProject(Project project) {
        if (Objects.nonNull(project.getThumbnail())) {
            String thumbnailUrl = cloudinaryClient.upload(project.getThumbnail(), project.getThumbnailRelatedUrl());

            project.setThumbnailUrl(thumbnailUrl);
        }

        projectMapper.updateProject(project);

        return projectMapper.getProjectById(project.getId());
    }

    @Transactional
    public boolean deleteProjectById(long id) {
        return false;
    }
}
