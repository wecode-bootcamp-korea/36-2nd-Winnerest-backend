-- migrate:up
ALTER TABLE `pin` DROP FOREIGN KEY `pin_fk_board`;

ALTER TABLE `review` DROP FOREIGN KEY `review_fk_pin`;

ALTER TABLE `like` DROP FOREIGN KEY `like_fk_review`;

ALTER TABLE `pin_tag` DROP FOREIGN KEY `pin_tag_fk_pin`;

ALTER TABLE `pin` ADD CONSTRAINT `pin_fk_board` FOREIGN KEY (`board_id`) REFERENCES `board` (`id`)
ON DELETE CASCADE;

ALTER TABLE `review` ADD CONSTRAINT `review_fk_pin` FOREIGN KEY (`pin_id`) REFERENCES `pin` (`id`)
ON DELETE CASCADE;

ALTER TABLE `like` ADD CONSTRAINT `like_fk_review` FOREIGN KEY (`review_id`) REFERENCES `review` (`id`)
ON DELETE CASCADE;

ALTER TABLE `pin_tag` ADD CONSTRAINT `pin_tag_fk_pin` FOREIGN KEY (`pin_id`) REFERENCES `pin` (`id`)
ON DELETE CASCADE;

-- migrate:down

