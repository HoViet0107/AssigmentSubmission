-- insert into users(cohort_start_date, username, [password]) values('2023-01-01', 'hoviet','$2a$10$4htGX3s4.9UGjbuD3uY8qOvRcTzyyt68oOnl4AatNJJV2lSNuIpo6')
-- insert into authority(authority,user_id) VALUES ('ROLE_STUDENT',1)

-- delete from authority where id = 5

-- select *
-- from users
-- select * from authority
-- Delete rows from table '[authority]' in schema '[dbo]'
-- insert into users values('2023-01-02', '$2a$10$4htGX3s4.9UGjbuD3uY8qOvRcTzyyt68oOnl4AatNJJV2lSNuIpo6', 'code');
-- insert into authority(authority,user_id)  values('ROLE_CODE_REVIEWER',2)
-- select * from authority

-- Update rows in table '[TableName]' in schema '[dbo]'
-- UPDATE [dbo].[assignment]
-- SET
--     [number] = 4
-- WHERE id =4
-- GO

-- Update rows in table '[assignment]' in schema '[dbo]'

-- UPDATE [dbo].[assignment]
-- SET
--     [status] = 'Submitted'
-- WHERE status = 'In Review'
-- Go

select *
from assignment


-- IF OBJECT_ID('[dbo].[assignment]', 'U') IS NOT NULL
-- DROP TABLE [dbo].[assignment]
-- GO

-- IF OBJECT_ID('[dbo].[authority]', 'U') IS NOT NULL
-- DROP TABLE [dbo].[authority]
-- GO

-- IF OBJECT_ID('[dbo].[hibernate_sequence]', 'U') IS NOT NULL
-- DROP TABLE [dbo].[hibernate_sequence]
-- GO

-- CREATE TABLE users (
--   id INT IDENTITY NOT NULL,
--   cohort_start_date DATETIME,
--   password VARCHAR(255),
--   username VARCHAR(255) UNIQUE,
--   PRIMARY KEY (id)
-- );


-- ALTER TABLE authority
-- DROP COLUMN name;
-- update assignment set status='Need to be Submitted'  where [status] ='Dev mode'
--  update assignment set name='assignment name'  where id = (4)
