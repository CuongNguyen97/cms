import {BaseService} from "./BaseService";

export class ProjectService extends BaseService {
    getProjectList = (params) => {
        return this.get("/api/project", params);
    }

    getProjectById = (id) => {
        return this.get("/api/project/" + id);
    }

    updateProject = (project) => {
        return this.put("/api/project", project)
    }

    insertProject = (project) => {
        return this.post("/api/project", project)
    }

    getProjectFavoriteList = (params) => this.get("/api/favorite/project", params)

    getUserFavoriteByProject = (projectId, params) => this.get("/api/favorite/project/" + projectId, params);

}