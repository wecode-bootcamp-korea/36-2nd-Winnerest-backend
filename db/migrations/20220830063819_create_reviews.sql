-- migrate:up
CREATE TABLE `review` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `user_id` int NOT NULL,
    `pin_id` int NOT NULL,
    `contents` text NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT NULL on UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `review_fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
    CONSTRAINT `review_fk_pin` FOREIGN KEY (`pin_id`) REFERENCES `pin` (`id`)
);



-- migrate:down

