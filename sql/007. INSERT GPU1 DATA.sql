INSERT INTO [Gallery].[Components] ([Name], [Description], [Type], [Price])
VALUES (
    'NVIDIA GeForce RTX 2080 Ti',
    'An 11GB GPU based on the TU102 graphics processor.',
    4,
    1999.99
);

DECLARE @ComponentId INT = SCOPE_IDENTITY();

INSERT INTO [Gallery].[Specifications] ([Key], [Value], [ComponentId]) VALUES
('Cores', '4352', @ComponentId),
('TMUs', '272', @ComponentId),
('Base Clock', '1350 MHz', @ComponentId),
('Max Boost Clock', '1545 MHz', @ComponentId),
('Memory Clock', '1750 MHz', @ComponentId),
('TDP', '250W', @ComponentId),
('Memory Size', '11 GB', @ComponentId),
('Memory Type', 'GDDR6', @ComponentId),
('Memory Bus', '352 bit', @ComponentId);