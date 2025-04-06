resource "azurerm_resource_group" "rg" {
  name     = "pc-component-gallery-rg"
  location = "polandcentral"
}


# SQL Server
resource "azurerm_mssql_server" "pc_component_gallery_server" {
  name                          = "pc-component-gallery-sql-server"
  resource_group_name           = azurerm_resource_group.rg.name
  location                      = azurerm_resource_group.rg.location
  version                       = "12.0"
  administrator_login           = var.sql_admin_username
  administrator_login_password  = var.sql_admin_password
  public_network_access_enabled = true
}

# SQL Server Firewall Rule to allow Azure services access
resource "azurerm_mssql_firewall_rule" "allow_azure_services" {
  name             = "AllowAzureServices"
  server_id        = azurerm_mssql_server.pc_component_gallery_server.id
  start_ip_address = "0.0.0.0"
  end_ip_address   = "0.0.0.0"
}

# SQL Database
resource "azurerm_mssql_database" "pc_component_gallery_database" {
  name      = "pc-component-gallery-db"
  server_id = azurerm_mssql_server.pc_component_gallery_server.id

  sku_name    = "Basic"
  max_size_gb = 2
}


# Application Insights
resource "azurerm_application_insights" "pc_component_gallery_app_insights" {
  name                = "pc-component-gallery-insights"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  application_type    = "web"
}

# App Service Plan
resource "azurerm_service_plan" "pc_component_gallery_app_service_plan" {
  name                = "pc-component-gallery-free-plan"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "F1"
}

# App Service
resource "azurerm_linux_web_app" "pc_component_gallery_app_service" {
  name                = "pc-component-gallery"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.pc_component_gallery_app_service_plan.id

  site_config {
    always_on = false
  }

  app_settings = {
    "WEBSITE_RUN_FROM_PACKAGE"              = "1"
    "APPINSIGHTS_INSTRUMENTATIONKEY"        = azurerm_application_insights.pc_component_gallery_app_insights.instrumentation_key
    "APPLICATIONINSIGHTS_CONNECTION_STRING" = azurerm_application_insights.pc_component_gallery_app_insights.connection_string
  }
}


# Storage Account
resource "azurerm_storage_account" "pc_component_gallery_storage" {
  name                     = "pccomponentgallerystorage69420"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  min_tls_version          = "TLS1_2"

  network_rules {
    default_action = "Deny"
    bypass         = ["AzureServices"]
    ip_rules       = var.storage_account_allowed_ip_addresses
  }
}

# Blob container
resource "azurerm_storage_container" "pc_component_gallery_container" {
  name                  = "pc-component-models"
  storage_account_id    = azurerm_storage_account.pc_component_gallery_storage.id
  container_access_type = "private"
}
