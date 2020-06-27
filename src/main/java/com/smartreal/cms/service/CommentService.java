package com.smartreal.cms.service;

import com.smartreal.cms.mapper.CommentMapper;
import com.smartreal.cms.model.Comment;
import com.smartreal.cms.model.Paging;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CommentService {
    private final CommentMapper commentMapper;

    public CommentService(CommentMapper commentMapper) {
        this.commentMapper = commentMapper;
    }

    public Paging<Comment> getCommentList(long offset, int size, String content) {
        long total = commentMapper.getCommentCount(content);
        List<Comment> contents = commentMapper.getCommentList(offset, size, content);

        return Paging.<Comment>builder().total(total).contents(contents).build();
    }

    @Transactional
    public boolean deleteCommentById(long id) {
        commentMapper.deleteCommentById(id);

        return true;
    }
}
