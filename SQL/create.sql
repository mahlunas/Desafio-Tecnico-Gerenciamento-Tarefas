CREATE DATABASE todo_manager

CREATE TABLE todos(
	id SERIAL PRIMARY KEY,
	title VARCHAR(255),
	status SMALLINT,
	end_date DATE,
	creation_date DATE
);

ALTER TABLE todos
ALTER COLUMN creation_date SET DEFAULT CURRENT_TIMESTAMP;