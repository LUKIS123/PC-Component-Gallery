CREATE TABLE ComponentTypes (
    ComponentTypeId INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    ImageUrl VARCHAR(255)
);

ALTER TABLE Gallery.Components
ADD CONSTRAINT FK_Components_ComponentTypes
FOREIGN KEY (Type) REFERENCES ComponentTypes(ComponentTypeId);
