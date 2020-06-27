package com.smartreal.cms.client;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Service
public class CloudinaryClient {
    private final Cloudinary cloudinary;

    public CloudinaryClient(Cloudinary cloudinary) {
        this.cloudinary = cloudinary;
    }

    public String upload(MultipartFile file, String path) {
        try {
            Map<?, ?> upload = this.cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
                    "resource_type", "image",
                    "public_id", StringUtils.removeStart(path, "/"),
                    "eager_async", true));
            return (String) upload.get("secure_url");
        } catch (IOException e) {
            throw new RuntimeException("Error when upload file");
        }
    }
}
