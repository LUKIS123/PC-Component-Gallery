INSERT INTO [Gallery].[Components] ([Name], [Description], [Type], [Price])
VALUES (
    'AMD Ryzen Threadripper 2920X',
    '12-core, 24-thread desktop processor based on the Zen+ (Colfax) architecture, Socket SP3r2.',
    1,
    1999.99
);

DECLARE @ComponentId INT = SCOPE_IDENTITY();

INSERT INTO [Gallery].[Specifications] ([Key], [Value], [ComponentId]) VALUES
('Socket', 'SP3r2', @ComponentId),
('Cores', '12', @ComponentId),
('Threads', '24', @ComponentId),
('Base Clock', '3.5 GHz', @ComponentId),
('Max Boost Clock', '4.3 GHz', @ComponentId),
('TDP', '180W', @ComponentId),
('Architecture', 'Zen+ (Colfax)', @ComponentId),
('L3 Cache', '32 MB', @ComponentId),
('Integrated Graphics', 'No', @ComponentId),
('Unlocked', 'Yes', @ComponentId);