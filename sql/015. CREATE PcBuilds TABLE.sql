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
