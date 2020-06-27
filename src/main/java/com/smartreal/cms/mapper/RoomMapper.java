package com.smartreal.cms.mapper;

import com.smartreal.cms.model.Room;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface RoomMapper {
    long getRoomCountByProject(@Param("projectId") long id);

    List<Room> getRoomListByProject(@Param("projectId") long id,@Param("offset")  long offset,@Param("size")  int size);

    Room getRoomById(@Param("id") long id);

    void deleteRoomById(@Param("id") long id);

    void insertRoom(Room room);

    void updateRoom(Room room);
}
