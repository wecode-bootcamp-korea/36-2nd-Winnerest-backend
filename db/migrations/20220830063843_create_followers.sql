-- migrate:up
CREATE TABLE `follower` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `following_id` int NOT NULL,
    `follower_id` int NOT NULL,
    CONSTRAINT `following_fk_user` FOREIGN KEY (`following_id`) REFERENCES `user` (`id`),
    CONSTRAINT `follower_fk_user` FOREIGN KEY (`follower_id`) REFERENCES `user` (`id`),
    UNIQUE KEY `follower_unique` (`following_id`, `follower_id`)
);

-- migrate:down

