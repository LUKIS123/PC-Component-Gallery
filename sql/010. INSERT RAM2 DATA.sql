INSERT INTO [Gallery].[Components] ([Name], [Description], [Type], [Price])
VALUES (
    'Corsair VENGEANCE RGB PRO',
    '8GB stick of DDR4 memory from Corsair.',
    3,
    299.99
);

DECLARE @ComponentId INT = SCOPE_IDENTITY();

INSERT INTO [Gallery].[Specifications] ([Key], [Value], [ComponentId]) VALUES
('Memory Size', '8 GB', @ComponentId),
('Base Clock', '2133 MHz', @ComponentId),
('Max Boost Clock', '3200 MHz', @ComponentId),
('CAS Latency', 'CL15', @ComponentId),
('Voltage', '1.2V', @ComponentId),
('Memory Type', 'DDR4', @ComponentId);