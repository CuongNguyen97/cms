package com.smartreal.cms.util;

public class LanguageUtil {
    private LanguageUtil() {

    }

    public static String normalizer(String original) {
        return original.replaceAll("[ÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴ]", "A")
                .replaceAll("[àáạảãâầấậẩẫăằắặẳẵ]", "a")
                .replaceAll("[ÈÉẸẺẼÊỀẾỆỂỄ]", "E")
                .replaceAll("[èéẹẻẽêềếệểễ]", "e")
                .replaceAll("[ÌÍỊỈĨ]", "I")
                .replaceAll("[ìíịỉĩ]", "i")
                .replaceAll("[ÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠ]", "O")
                .replaceAll("[òóọỏõôồốộổỗơờớợởỡ]", "o")
                .replaceAll("[ÙÚỤỦŨƯỪỨỰỬỮ]", "U")
                .replaceAll("[ùúụủũưừứựửữ]", "u")
                .replaceAll("[ỲÝỴỶỸ]", "Y")
                .replaceAll("[ỳýỵỷỹ]", "y")
                .replaceAll("Đ", "D")
                .replaceAll("đ", "d");
    }
}
