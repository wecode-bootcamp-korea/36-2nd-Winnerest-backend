-- migrate:up
CREATE TABLE `pin_tag` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `pin_id` int NOT NULL,
    `tag_id` int NOT NULL,
    CONSTRAINT `pin_tag_fk_pin` FOREIGN KEY (`pin_id`) REFERENCES `pin` (`id`) ON DELETE CASCADE,
    CONSTRAINT `pin_tag_fk_tag` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`)
);


-- migrate:down

