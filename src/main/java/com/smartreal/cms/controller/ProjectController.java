package com.smartreal.cms.controller;

import com.smartreal.cms.model.Paging;
import com.smartreal.cms.model.Project;
import com.smartreal.cms.model.ProjectGallery;
import com.smartreal.cms.model.Room;
import com.smartreal.cms.service.GalleryService;
import com.smartreal.cms.service.ProjectService;
import com.smartreal.cms.service.RoomService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/project")
public class ProjectController {
    private final ProjectService projectService;
    private final GalleryService galleryService;
    private final RoomService roomService;

    public ProjectController(ProjectService projectService, GalleryService galleryService, RoomService roomService) {
        this.projectService = projectService;
        this.galleryService = galleryService;
        this.roomService = roomService;
    }

    @GetMapping
    public Paging<Project> getListProject(@RequestParam long offset, @RequestParam int size, @RequestParam String subject) {
        return projectService.getProjectList(offset, size, subject);
    }

    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable long id) {
        return projectService.getProjectById(id);
    }

    @PostMapping
    public Project insertProject(@ModelAttribute Project project) {
        return projectService.insertProject(project);
    }

    @PutMapping
    public Project updateProject(@ModelAttribute Project project) {
        return projectService.updateProject(project);
    }

    @DeleteMapping("/{id}")
    public boolean deleteProjectById(@PathVariable long id) {
        return projectService.deleteProjectById(id);
    }

    @GetMapping("/{id}/gallery")
    public Paging<ProjectGallery> getProjectGalleryListByProject(@PathVariable long id, @RequestParam long offset, @RequestParam int size) {
        return galleryService.getGalleryByProject(id, offset, size);
    }

    @PostMapping("/gallery")
    public ProjectGallery insertGallery(@ModelAttribute ProjectGallery projectGallery) {
        return galleryService.insertGallery(projectGallery);
    }

    @PutMapping("/gallery")
    public ProjectGallery updateGallery(@ModelAttribute ProjectGallery projectGallery) {
        return galleryService.updateGallery(projectGallery);
    }

    @GetMapping("/gallery/{id}")
    public ProjectGallery getGalleryById(@PathVariable long id) {
        return galleryService.getGalleryById(id);
    }

    @DeleteMapping("/gallery/{id}")
    public boolean deleteGalleryById(@PathVariable long id) {
        return galleryService.deleteGalleryById(id);
    }

    @GetMapping("/{id}/room")
    public Paging<Room> getRoomListByProject(@PathVariable long id, @RequestParam long offset, @RequestParam int size) {
        return roomService.getRoomListByProject(id, offset, size);
    }

    @GetMapping("/room/{id}")
    public Room getRoomById(@PathVariable long id) {
        return roomService.getRoomById(id);
    }

    @PostMapping("/room")
    public Room insertRoom(@ModelAttribute Room room) {
        return roomService.insertRoom(room);
    }

    @PutMapping("/room")
    public Room updateRoom(@ModelAttribute Room room) {
        return roomService.updateRoom(room);
    }

    @DeleteMapping("/room/{id}")
    public boolean deleteRoomById(@PathVariable long id) {
        return roomService.deleteRoomById(id);
    }
}
