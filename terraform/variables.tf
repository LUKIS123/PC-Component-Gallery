variable "subscription_id" {}

# SQL Server Variables
variable "sql_admin_username" {
  type        = string
  description = "The administrator username for the SQL Server."
}

variable "sql_admin_password" {
  type        = string
  description = "The administrator password for the SQL Server."
  sensitive   = true
}

# Allowed IPs for storage account
variable "storage_account_allowed_ip_addresses" {
  description = "List of allowed public IP addresses for accessing the storage account"
  type        = list(string)
  default     = []
}
