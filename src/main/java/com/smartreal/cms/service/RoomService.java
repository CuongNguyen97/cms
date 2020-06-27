package com.smartreal.cms.service;

import com.smartreal.cms.client.CloudinaryClient;
import com.smartreal.cms.mapper.RoomMapper;
import com.smartreal.cms.model.Paging;
import com.smartreal.cms.model.Room;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
public class RoomService {
    private final RoomMapper roomMapper;
    private final CloudinaryClient cloudinaryClient;

    public RoomService(RoomMapper roomMapper, CloudinaryClient cloudinaryClient) {
        this.roomMapper = roomMapper;
        this.cloudinaryClient = cloudinaryClient;
    }

    public Paging<Room> getRoomListByProject(long id, long offset, int size) {
        long total = roomMapper.getRoomCountByProject(id);
        List<Room> contents = roomMapper.getRoomListByProject(id, offset, size);

        return Paging.<Room>builder().total(total).contents(contents).build();
    }

    public Room getRoomById(long id) {
        return roomMapper.getRoomById(id);
    }

    @Transactional
    public Room insertRoom(Room room) {
        String imageUrl = cloudinaryClient.upload(room.getImage(), room.getImageRelatedUrl());
        room.setImageUrl(imageUrl);

        roomMapper.insertRoom(room);

        return roomMapper.getRoomById(room.getId());
    }

    @Transactional
    public Room updateRoom(Room room) {
        if (Objects.nonNull(room.getImage())) {
            String imageUrl = cloudinaryClient.upload(room.getImage(), room.getImageRelatedUrl());
            room.setImageUrl(imageUrl);
        }
        roomMapper.updateRoom(room);

        return roomMapper.getRoomById(room.getId());
    }

    @Transactional
    public boolean deleteRoomById(long id) {
        roomMapper.deleteRoomById(id);

        return true;
    }
}
