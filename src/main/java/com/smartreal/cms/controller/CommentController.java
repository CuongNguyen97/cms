package com.smartreal.cms.controller;

import com.smartreal.cms.model.Comment;
import com.smartreal.cms.model.Paging;
import com.smartreal.cms.service.CommentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public Paging<Comment> getCommentList(@RequestParam long offset, @RequestParam int size, @RequestParam(defaultValue = "") String content) {
        return commentService.getCommentList(offset, size, content);
    }

    @DeleteMapping("/{id}")
    public boolean deleteCommentById(@PathVariable long id) {
        return commentService.deleteCommentById(id);
    }
}
