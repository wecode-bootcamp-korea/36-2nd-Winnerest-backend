-- migrate:up
CREATE TABLE `board` (
  `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
  `user_id` int NOT NULL,
  `title` varchar(100) NOT NULL,
  CONSTRAINT `board_fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

-- migrate:down

