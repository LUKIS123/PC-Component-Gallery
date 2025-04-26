INSERT INTO [Gallery].[Components] ([Name], [Description], [Type], [Price])
VALUES (
    'AMD Radeon RX 6900 XT',
    'A 16GB GPU based on the Navi 21 graphics processor.',
    4,
    2999.99
);

DECLARE @ComponentId INT = SCOPE_IDENTITY();

INSERT INTO [Gallery].[Specifications] ([Key], [Value], [ComponentId]) VALUES
('Cores', '5120', @ComponentId),
('TMUs', '320', @ComponentId),
('Base Clock', '1825 MHz', @ComponentId),
('Max Boost Clock', '2250 MHz', @ComponentId),
('Memory Clock', '2000 MHz', @ComponentId),
('TDP', '300W', @ComponentId),
('Memory Size', '16 GB', @ComponentId),
('Memory Type', 'GDDR6', @ComponentId),
('Memory Bus', '256 bit', @ComponentId);