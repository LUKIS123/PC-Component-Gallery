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

variable "storage_account_ip_rules" {
  type        = list(string)
  default     = []
  description = "List of IP addresses to allow access to the storage account."
}
