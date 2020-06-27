package com.smartreal.cms.controller;

import com.smartreal.cms.model.Paging;
import com.smartreal.cms.model.Project;
import com.smartreal.cms.model.User;
import com.smartreal.cms.service.FavoriteService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favorite")
public class FavoriteController {
    private final FavoriteService favoriteService;

    public FavoriteController(FavoriteService favoriteService) {
        this.favoriteService = favoriteService;
    }

    @GetMapping("/project")
    public Paging<Project> getProjectFavoriteList(@RequestParam(defaultValue = "0") long offset,
                                                  @RequestParam(defaultValue = "20") int size,
                                                  @RequestParam(defaultValue = "") String subject) {
        return favoriteService.getProjectFavoriteList(offset, size, subject);
    }

    @GetMapping("/project/{projectId}")
    public Paging<User> getUserFavoriteListByProject(@PathVariable long projectId,
                                                     @RequestParam long offset,
                                                     @RequestParam int size) {
        return favoriteService.getUserFavoriteList(projectId, offset, size);
    }
}
