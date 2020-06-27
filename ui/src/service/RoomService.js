import {BaseService} from "./BaseService";

export class RoomService extends BaseService {
    getRoomListByProject = (projectId, params) => this.get("/api/project/" + projectId + "/room", params);

    getRoomById = (id) => this.get("/api/project/room/" + id);

    insertRoom = (room) => this.post("/api/project/room", room);

    updateRoom = (room) => this.put("/api/project/room", room);

    deleteRoomById = (id) => this.delete("/api/project/room/" + id);
}