package com.smartreal.cms.mapper;

import com.smartreal.cms.model.ProjectGallery;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface GalleryMapper {
    long getGalleryCountByProject(@Param("projectId") long projectId);

    List<ProjectGallery> getGalleryListByProject(@Param("projectId") long projectId, @Param("offset") long offset, @Param("size") int size);

    ProjectGallery getGalleryById(@Param("id") long id);

    void insertGallery(ProjectGallery projectGallery);

    void updateGallery(ProjectGallery projectGallery);

    void deleteGalleryById(@Param("id") long id);
}
