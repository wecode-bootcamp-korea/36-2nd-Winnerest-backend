-- migrate:up
CREATE TABLE `tag` (
    `id` int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    `name` varchar(100) not NULL
);

-- migrate:down

