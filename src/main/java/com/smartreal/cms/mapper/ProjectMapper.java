package com.smartreal.cms.mapper;

import com.smartreal.cms.model.Project;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface ProjectMapper {
    long getProjectCount(@Param("subject") String subject);

    List<Project> getProjectList(@Param("offset") long offset, @Param("size") int size, @Param("subject") String subject);

    void updateProject(Project project);

    Project getProjectById(@Param("id") Long id);

    void insertProject(Project project);
}
