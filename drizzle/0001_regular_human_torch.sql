CREATE TABLE `connected_account` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`provider` text NOT NULL,
	`provider_account_id` text NOT NULL,
	`provider_email` text,
	`label` text,
	`access_token` text NOT NULL,
	`refresh_token` text,
	`token_expires_at` integer,
	`scopes` text,
	`connected_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `unique_user_provider_account` ON `connected_account` (`user_id`,`provider`,`provider_account_id`);--> statement-breakpoint
CREATE TABLE `pinned_file` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`connected_account_id` text NOT NULL,
	`provider` text NOT NULL,
	`file_id` text NOT NULL,
	`file_name` text NOT NULL,
	`mime_type` text,
	`pinned_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`connected_account_id`) REFERENCES `connected_account`(`id`) ON UPDATE no action ON DELETE cascade
);
