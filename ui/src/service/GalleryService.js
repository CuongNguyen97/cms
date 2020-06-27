import {BaseService} from "./BaseService";

export class GalleryService extends BaseService {
    getGalleryListByProject = (projectId, params) => {
        return this.get("/api/project/" + projectId + "/gallery", params);
    }

    getGalleryById = (id) => {
        return this.get("/api/project/gallery/" + id)
    }

    insertGallery = (gallery) => {
        return this.post("/api/project/gallery", gallery);
    }

    updateGallery = (gallery) => {
        return this.put("/api/project/gallery", gallery)
    }

    deleteGalleryById = (id) => {
        return this.delete("/api/project/gallery/" + id)
    }
}