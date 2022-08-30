-- migrate:up
CREATE TABLE `user` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `kakao_id` varchar(100) NOT NULL UNIQUE,
    `nickname` varchar(500) NOT NULL,
    `profile_img_url` varchar(1000) DEFAULT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT NULL on UPDATE CURRENT_TIMESTAMP
);

-- migrate:down

