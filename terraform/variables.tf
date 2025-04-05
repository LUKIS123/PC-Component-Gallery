variable "subscription_id" {}

variable "resource_group_name" {
  type        = string
  description = "The name of the resource group to use."
}

variable "resource_group_location" {
  type        = string
  description = "The location of the resource group to use."
}

# SQL Server Variables
variable "sql_server_name" {
  type        = string
  description = "The unique name for the Azure SQL Server instance."
}

variable "sql_admin_username" {
  type        = string
  description = "The administrator username for the SQL Server."
}

variable "sql_admin_password" {
  type        = string
  description = "The administrator password for the SQL Server."
  sensitive   = true
}

# SQL Database Variables
variable "sql_database_name" {
  type        = string
  description = "The name of the Azure SQL Database."
}

variable "sql_database_sku" {
  type        = string
  description = "The SKU (pricing tier) for the Azure SQL Database. Options include Basic, S0, S1, etc."
  default     = "Basic"
}

variable "sql_database_max_size_gb" {
  type        = number
  description = "The maximum storage size in GB for the Azure SQL Database."
  default     = 2
}
