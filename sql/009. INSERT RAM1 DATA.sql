INSERT INTO [Gallery].[Components] ([Name], [Description], [Type], [Price])
VALUES (
    'HyperX Fury DDR4',
    '16 GB stick of DDR4 memory from HyperX (Kingston).',
    1,
    599.99
);

DECLARE @ComponentId INT = SCOPE_IDENTITY();

INSERT INTO [Gallery].[Specifications] ([Key], [Value], [ComponentId]) VALUES
('Memory Size', '16 GB', @ComponentId),
('Base Clock', '2133 MHz', @ComponentId),
('Max Boost Clock', '2666 MHz', @ComponentId),
('CAS Latency', 'CL16', @ComponentId),
('Voltage', '1.2V', @ComponentId),
('Memory Type', 'DDR4', @ComponentId);