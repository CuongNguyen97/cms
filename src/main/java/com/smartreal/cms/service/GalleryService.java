package com.smartreal.cms.service;

import com.smartreal.cms.client.CloudinaryClient;
import com.smartreal.cms.mapper.GalleryMapper;
import com.smartreal.cms.model.Paging;
import com.smartreal.cms.model.ProjectGallery;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class GalleryService {
    private final GalleryMapper galleryMapper;
    private final CloudinaryClient cloudinaryClient;

    public GalleryService(GalleryMapper galleryMapper, CloudinaryClient cloudinaryClient) {
        this.galleryMapper = galleryMapper;
        this.cloudinaryClient = cloudinaryClient;
    }

    public Paging<ProjectGallery> getGalleryByProject(long id, long offset, int size) {
        long total = galleryMapper.getGalleryCountByProject(id);
        List<ProjectGallery> contents = galleryMapper.getGalleryListByProject(id, offset, size);

        return Paging.<ProjectGallery>builder().total(total).contents(contents).build();
    }

    public ProjectGallery getGalleryById(long id) {
        return galleryMapper.getGalleryById(id);
    }

    @Transactional
    public ProjectGallery insertGallery(ProjectGallery projectGallery) {
        String imageUrl = cloudinaryClient.upload(projectGallery.getImage(), projectGallery.getImageRelatedUrl());
        projectGallery.setImageUrl(imageUrl);

        galleryMapper.insertGallery(projectGallery);

        return galleryMapper.getGalleryById(projectGallery.getId());
    }

    @Transactional
    public ProjectGallery updateGallery(ProjectGallery projectGallery) {
        if (Objects.nonNull(projectGallery)) {
            String imageUrl = cloudinaryClient.upload(projectGallery.getImage(), projectGallery.getImageRelatedUrl());

            projectGallery.setImageUrl(imageUrl);
        }

        galleryMapper.updateGallery(projectGallery);

        return galleryMapper.getGalleryById(projectGallery.getId());
    }

    @Transactional
    public boolean deleteGalleryById(long id) {
        galleryMapper.deleteGalleryById(id);

        return true;
    }

}
