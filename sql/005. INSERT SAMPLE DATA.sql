INSERT INTO [Gallery].[Components] ([Name], [Description], [Type], [Price])
VALUES (
    'AMD Ryzen 9 5900X',
    '12-core, 24-thread unlocked desktop processor based on the Zen 3 architecture, socket AM4.',
    1,
    1899.99
);

DECLARE @ComponentId INT = SCOPE_IDENTITY();

INSERT INTO [Gallery].[Specifications] ([Key], [Value], [ComponentId]) VALUES
('Socket', 'AM4', @ComponentId),
('Cores', '12', @ComponentId),
('Threads', '24', @ComponentId),
('Base Clock', '3.7 GHz', @ComponentId),
('Max Boost Clock', '4.8 GHz', @ComponentId),
('TDP', '105W', @ComponentId),
('Architecture', 'Zen 3', @ComponentId),
('L3 Cache', '64 MB', @ComponentId),
('Integrated Graphics', 'No', @ComponentId),
('Unlocked', 'Yes', @ComponentId);
