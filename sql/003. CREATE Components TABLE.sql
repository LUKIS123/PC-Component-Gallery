CREATE TABLE [Gallery].[Components] (
    [Id] INT NOT NULL PRIMARY KEY IDENTITY(1, 1),
    [Name] NVARCHAR(255) NOT NULL,
    [Description] NVARCHAR(MAX) NOT NULL,
    [Price] DECIMAL(18, 2) NOT NULL
);