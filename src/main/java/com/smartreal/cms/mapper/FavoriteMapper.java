package com.smartreal.cms.mapper;

import com.smartreal.cms.model.Project;
import com.smartreal.cms.model.User;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface FavoriteMapper {
    long getProjectFavoriteCount(@Param("subject") String subject);

    List<Project> getProjectFavoriteList(@Param("offset") long offset, @Param("size") int size, @Param("subject") String subject);

    long getUserFavoriteByProjectCount(@Param("projectId") long projectId);

    List<User> getUserFavoriteProjectList(@Param("projectId") long projectId, @Param("offset") long offset, @Param("size") int size);
}

