USE [EmployeeManager_DB] 
GO

INSERT INTO [role]
VALUES
('admin'), ('employee')
SELECT * FROM [role]
GO

INSERT INTO [employee]
VALUES 
('milica@gmail.com', 'Milica', 'https://www.bootdey.com/img/Content/avatar/avatar3.png', 'Krmpotić', '123123', '92840192754', 1),
('gojko@gmail.com', 'Gojko', 'https://www.bootdey.com/img/Content/avatar/avatar7.png', 'Mrnjačević', '123123', '02984312904', 2),
('pero@gmail.com', 'Pero', 'https://www.bootdey.com/img/Content/avatar/avatar1.png', 'Perić', '123123', '64341284891', 2)
SELECT * FROM [employee]
GO

INSERT INTO [working_hours]
VALUES 
('20210926 08:00:00 AM', '20210910 12:00:00 PM', 1),
('20210825 08:00:00 AM', '20210913 12:00:00 PM', 1),
('20210910 08:00:00 AM', '20210910 04:00:00 PM', 2),
('20210913 08:00:00 AM', '20210913 04:00:00 PM', 2),
('20210914 08:00:00 AM', '20210914 04:00:00 PM', 2),
('20210915 08:00:00 AM', '20210915 04:00:00 PM', 2),
('20210916 08:00:00 AM', '20210916 04:00:00 PM', 2),
('20210917 08:00:00 AM', '20210917 12:00:00 PM', 2)
SELECT * FROM [working_hours]
GO
