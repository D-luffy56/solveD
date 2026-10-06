CREATE TABLE `project_submissions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`reference_code` text NOT NULL,
	`company_name` text NOT NULL,
	`contact_name` text NOT NULL,
	`work_email` text NOT NULL,
	`phone` text DEFAULT '' NOT NULL,
	`country` text NOT NULL,
	`company_website` text DEFAULT '' NOT NULL,
	`service_interest` text NOT NULL,
	`configuration` text NOT NULL,
	`development_stage` text NOT NULL,
	`mission_summary` text NOT NULL,
	`technical_payload` text NOT NULL,
	`timeline` text NOT NULL,
	`budget_range` text NOT NULL,
	`available_data` text NOT NULL,
	`constraints` text DEFAULT '' NOT NULL,
	`confidentiality` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_project_submissions_reference` ON `project_submissions` (`reference_code`);--> statement-breakpoint
CREATE INDEX `idx_project_submissions_created_at` ON `project_submissions` (`created_at`);--> statement-breakpoint
CREATE INDEX `idx_project_submissions_status` ON `project_submissions` (`status`);