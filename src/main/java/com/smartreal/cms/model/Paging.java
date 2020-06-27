package com.smartreal.cms.model;

import java.util.List;

public class Paging<T> {
    private long total;
    private List<T> contents;

    public long getTotal() {
        return total;
    }

    public List<T> getContents() {
        return contents;
    }

    public static <T>Builder<T> builder() {
        return new <T> Builder<T>();
    }

    public static final class Builder<T> {
        private long total;
        private List<T> contents;

        private Builder() {
        }

        public Builder<T> total(long total) {
            this.total = total;
            return this;
        }

        public Builder<T> contents(List<T> contents) {
            this.contents = contents;
            return this;
        }

        public Paging<T> build() {
            Paging<T> paging = new Paging<>();
            paging.contents = this.contents;
            paging.total = this.total;
            return paging;
        }
    }
}
