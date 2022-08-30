-- migrate:up
CREATE TABLE `pin` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `board_id` int DEFAULT NULL,
    `title` varchar(300) NOT NULL,
    `contents` TEXT DEFAULT NULL,
    `img_url` varchar(1000) NOT NULL,
    `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` datetime DEFAULT NULL on UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT `pin_fk_board` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`)
);


-- migrate:down

