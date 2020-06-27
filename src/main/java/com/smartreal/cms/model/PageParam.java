package com.smartreal.cms.model;

public class PageParam {
    private long offset;
    private int size;

    public long getOffset() {
        return offset;
    }

    public int getSize() {
        return size;
    }

    public static PageParam withPageAndSize(int page, int size) {
        PageParam pageParam = new PageParam();
        if (page < 1) {
            throw new IllegalArgumentException("Wrong param");
        }
        pageParam.offset = (page - 1) * size;
        pageParam.size = size;

        return pageParam;
    }
}
