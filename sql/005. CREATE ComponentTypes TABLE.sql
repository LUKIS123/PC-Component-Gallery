CREATE TABLE [Gallery].[ComponentTypes] (
    ComponentTypeId INT PRIMARY KEY IDENTITY(1, 1),
    Name VARCHAR(255) NOT NULL,
    ImageUrl VARCHAR(255)
);

ALTER TABLE [Gallery].[Components]
ADD CONSTRAINT FK_Components_ComponentTypes
FOREIGN KEY ([Type]) REFERENCES [Gallery].[ComponentTypes](ComponentTypeId);
