-- insert into users(id,cohort_start_date, username, [password]) values(1,'2023-01-01', 'hoviet','$2a$10$4htGX3s4.9UGjbuD3uY8qOvRcTzyyt68oOnl4AatNJJV2lSNuIpo6')
-- insert into authority(authority,user_id) VALUES ('ROLE_STUDENT',1)

-- delete from authority where id = 5

-- select * from users
-- select * from authority

-- Update rows in table '[TableName]' in schema '[dbo]'
-- UPDATE [dbo].[assignment]
-- SET
--     [number] = 12
-- WHERE id =12
-- GO

select * from assignment

-- ALTER TABLE assignment
-- DROP COLUMN name;
-- update assignment set status='Need to be Submitted'  where [status] ='Dev mode'
--  update assignment set name='assignment name'  where id = (4)
