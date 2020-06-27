package com.smartreal.cms.service;

import com.smartreal.cms.mapper.FavoriteMapper;
import com.smartreal.cms.model.Paging;
import com.smartreal.cms.model.Project;
import com.smartreal.cms.model.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavoriteService {
    private final FavoriteMapper favoriteMapper;

    public FavoriteService(FavoriteMapper favoriteMapper) {
        this.favoriteMapper = favoriteMapper;
    }

    public Paging<Project> getProjectFavoriteList(long offset, int size, String subject) {
        long total = favoriteMapper.getProjectFavoriteCount(subject);
        List<Project> contents = favoriteMapper.getProjectFavoriteList(offset, size, subject);

        return Paging.<Project>builder().total(total).contents(contents).build();
    }

    public Paging<User> getUserFavoriteList(long projectId, long offset, int size) {
        long total = favoriteMapper.getUserFavoriteByProjectCount(projectId);
        List<User> contents = favoriteMapper.getUserFavoriteProjectList(projectId, offset, size);

        return Paging.<User>builder().total(total).contents(contents).build();
    }
}
