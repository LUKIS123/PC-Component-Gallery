SET IDENTITY_INSERT [Gallery].[ComponentTypes] ON;

INSERT INTO [Gallery].[ComponentTypes] (ComponentTypeId, Name, ImageUrl) VALUES
(1, 'CPUs', 'https://static.vecteezy.com/system/resources/previews/003/800/708/non_2x/quantum-computer-large-data-processing-database-concept-cpu-isometric-banner-central-computer-processors-cpu-concept-digital-chip-futuristic-microchip-processor-vector.jpg'),
(2, 'Motherboards', 'https://png.pngtree.com/thumb_back/fw800/background/20240525/pngtree-motherboard-background-design-image_15805164.jpg'),
(3, 'RAM', 'https://as1.ftcdn.net/v2/jpg/03/52/65/22/1000_F_352652202_gle5fJmbH5GXns32aosr5j8WeBpVLBUs.jpg'),
(4, 'GPUs', 'https://www.pcworld.com/wp-content/uploads/2024/01/best-graphics-cards-banner-100815257-orig.jpg?quality=50&strip=all'),
(5, 'Storage', 'https://image.semiconductor.samsung.com/image/samsung/p6/semiconductor/consumer-storage/kv/kv-product-internalssd-970-EVOPlus-pc.png?$ORIGIN_PNG$'),
(6, 'Power Supplies', 'https://example.com/images/power_supply.jpg'),
(7, 'Cases', 'https://example.com/images/case.jpg'),
(8, 'Cooling', 'https://example.com/images/cooling_system.jpg'),
(9, 'Networking', 'https://example.com/images/network_card.jpg');

SET IDENTITY_INSERT [Gallery].[ComponentTypes] OFF;


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
