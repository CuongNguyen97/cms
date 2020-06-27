package com.smartreal.cms.mapper;

import com.smartreal.cms.model.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface CommentMapper {
    long getCommentCount(@Param("content") String content);

    List<Comment> getCommentList(@Param("offset") long offset, @Param("size") int size, @Param("content") String content);

    long getCommentCountByProject(@Param("projectId") long projectId);

    void deleteCommentById(@Param("id") long id);
}
