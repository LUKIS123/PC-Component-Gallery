INSERT INTO [Gallery].[Components] ([Name], [Description], [Type], [Price])
VALUES (
    'ROG STRIX X470-I GAMING',
    'ITX Motherboard from Asus, AM4 socket.',
    1,
    899.99
);

DECLARE @ComponentId INT = SCOPE_IDENTITY();

INSERT INTO [Gallery].[Specifications] ([Key], [Value], [ComponentId]) VALUES
('Socket', 'AM4', @ComponentId),
('Format', 'ITX', @ComponentId),
('Chipset', 'AMD X470', @ComponentId),
('Memory', '2x max 32 GB', @ComponentId),
('Memory architecture', 'Dual channel', @ComponentId),
('Expansion slots', 'PCIe 3.0', @ComponentId),
('USB', '6x', @ComponentId),
('Storage', '4 x SATA', @ComponentId),
('Network', 'Wi-Fi 802.11', @ComponentId),
('Bluetooth', '4.2', @ComponentId),
('Audio', 'ROG SupremeFX CODEC S1220', @ComponentId);