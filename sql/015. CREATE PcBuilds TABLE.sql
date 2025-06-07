CREATE TABLE [Gallery].[PcBuilds]
(
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(255) NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL,
    [Price] DECIMAL(18, 2) NOT NULL,
);

CREATE TABLE [Gallery].[PcBuildSwaps] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [PcBuildId] INT NOT NULL,
    [ComponentId] INT NOT NULL,
    [Type] INT NOT NULL,
    FOREIGN KEY ([PcBuildId]) REFERENCES [Gallery].[PcBuilds]([Id]),
    FOREIGN KEY ([ComponentId]) REFERENCES [Gallery].[Components]([Id]),
);

INSERT INTO [Gallery].[PcBuilds] ([Name], [Description], [Price])
VALUES (
    'High-End AMD Gaming Build',
    'This PC build features the powerful AMD Ryzen Threadripper 2920X processor paired with the AMD Radeon RX 6900 XT graphics card. It is built on the ROG Zenith Extreme Alpha motherboard and equipped with Corsair VENGEANCE RGB PRO memory modules. Ideal for gaming, content creation, and heavy multitasking.',
    3499.99
);

INSERT INTO [Gallery].[PcBuilds] ([Name], [Description], [Price])
VALUES (
    'Showcase Enthusiast AMD Build',
    'This PC build is designed for hardware enthusiasts and features a fully glass showcase case, allowing every component to shine with full RGB illumination. It includes the powerful AMD Ryzen Threadripper 2920X processor and the AMD Radeon RX 6900 XT GPU, all mounted on the premium ROG Zenith Extreme Alpha motherboard. With Corsair VENGEANCE RGB PRO memory and aesthetic-focused cable management, it''s perfect for both performance and presentation.',
    9499.99
);
