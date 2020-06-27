package com.smartreal.cms.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {
    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dbqgbletk",
                "api_key", "693511419456798",
                "api_secret", "QoGc_VEBFnyHbMktNIuJVT3uxWA"));
    }
}
