import {BaseService} from "./BaseService";

export class CommentService extends BaseService {
    getCommentList = (params) => this.get("/api/comment", params);

    deleteComment = (id) => this.delete("/api/comment/" + id);
}