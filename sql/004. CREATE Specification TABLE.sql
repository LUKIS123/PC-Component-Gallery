CREATE TABLE [Gallery].[Specifications] (
    [Id] UNIQUEIDENTIFIER NOT NULL PRIMARY KEY DEFAULT NEWID(),
    [Key] NVARCHAR(255) NOT NULL,
    [Value] NVARCHAR(255) NOT NULL,
    [ComponentId] INT NOT NULL,
    FOREIGN KEY ([ComponentId]) REFERENCES [Gallery].[Components]([Id])
);