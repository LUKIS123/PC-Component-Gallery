INSERT INTO [Gallery].[Components] ([Name], [Description], [Type], [Price])
VALUES (
    'ROG Zenith Extreme Alpha',
    'E-ATX Motherboard from Asus, TR4 socket.',
    1,
    2999.99
);

DECLARE @ComponentId INT = SCOPE_IDENTITY();

INSERT INTO [Gallery].[Specifications] ([Key], [Value], [ComponentId]) VALUES
('Socket', 'TR4', @ComponentId),
('Format', 'E-ATX', @ComponentId),
('Chipset', 'AMD X399', @ComponentId),
('Memory', '8x max 256 GB', @ComponentId),
('Memory architecture', 'Quad channel', @ComponentId),
('Expansion slots', 'PCIe 3.0', @ComponentId),
('USB', '13x', @ComponentId),
('Storage', '8 x SATA', @ComponentId),
('Network', 'Wi-Fi 802.11', @ComponentId),
('Bluetooth', '5.0', @ComponentId),
('Audio', 'ROG SupremeFX CODEC S1220', @ComponentId);