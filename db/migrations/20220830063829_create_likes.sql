-- migrate:up
CREATE TABLE `like` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `user_id` int NOT NULL UNIQUE,
    `review_id` int NOT NULL UNIQUE,
    CONSTRAINT `like_fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `like_fk_review` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`)
);


-- migrate:down

