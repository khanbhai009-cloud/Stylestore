import type { Product } from "@/lib/firebase"

export interface ExportData {
  products: Product[]
  analytics: {
    totalUsers: number
    totalClicks: number
    totalProducts: number
    topProducts: Product[]
  }
}

export class DataExporter {
  static exportToCSV(data: any[], filename: string, headers: string[]) {
    const csvContent = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            if (Array.isArray(value)) {
              return `"${value.join(";")}"`
            }
            if (typeof value === "string" && (value.includes(",") || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value !== null && value !== undefined ? value : ""
          })
          .join(","),
      ),
    ].join("\n")

    this.downloadFile(csvContent, filename, "text/csv")
  }

  static exportToJSON(data: any, filename: string) {
    const jsonContent = JSON.stringify(data, null, 2)
    this.downloadFile(jsonContent, filename, "application/json")
  }

  static generateSQLInserts(products: Product[], analytics: any) {
    const sqlStatements = [
      "-- StyleStore Data Export - SQL Insert Statements",
      "-- Generated on: " + new Date().toISOString(),
      "-- Instructions: Run these statements in your Supabase SQL editor",
      "",
      "-- Clear existing data (optional)",
      "-- DELETE FROM products;",
      "-- DELETE FROM site_analytics;",
      "",
      "-- Products Table Inserts",
      ...products.map((product) => {
        const tags = product.tags.map((tag) => `"${tag}"`).join(",")
        return `INSERT INTO products (name, description, price, original_price, image_url, category, tags, affiliate_link, clicks, is_active) VALUES ('${product.name.replace(/'/g, "''")}', '${product.description.replace(/'/g, "''")}', ${product.price}, ${product.original_price || "NULL"}, '${product.image_url}', '${product.category}', ARRAY[${tags}], '${product.affiliate_link}', ${product.clicks}, ${product.is_active});`
      }),
      "",
      "-- Site Analytics Insert",
      `INSERT INTO site_analytics (total_visitors, total_clicks, date) VALUES (${analytics.totalUsers}, ${analytics.totalClicks}, CURRENT_DATE);`,
      "",
      "-- Create admin user (password: admin123)",
      `INSERT INTO users (email, password_hash, role) VALUES ('admin@stylestore.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQqQqQqQqOzJqQqQqQqQqQ', 'admin') ON CONFLICT (email) DO NOTHING;`,
    ].join("\n")

    return sqlStatements
  }

  static exportCompleteBackup(exportData: ExportData) {
    const backup = {
      exportDate: new Date().toISOString(),
      version: "1.0",
      data: {
        products: exportData.products,
        analytics: exportData.analytics,
        metadata: {
          totalProducts: exportData.products.length,
          totalClicks: exportData.analytics.totalClicks,
          exportedBy: "StyleStore Admin Panel",
        },
      },
    }

    const filename = `stylestore-complete-backup-${new Date().toISOString().split("T")[0]}.json`
    this.exportToJSON(backup, filename)
  }

  private static downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = filename
    link.click()
    window.URL.revokeObjectURL(url)
  }

  static generateMigrationGuide() {
    const guide = `
# StyleStore Data Migration Guide

## Overview
This guide helps you migrate your demo data to a live Supabase database.

## Files Exported
1. **products.csv** - Complete product catalog
2. **analytics.csv** - Site statistics
3. **top-products.csv** - Performance rankings
4. **data.sql** - SQL insert statements
5. **complete-backup.json** - Full data backup

## Migration Steps

### Option 1: Using SQL File (Recommended)
1. Open your Supabase project dashboard
2. Go to SQL Editor
3. Copy and paste the contents of the .sql file
4. Execute the statements
5. Verify data in Table Editor

### Option 2: Using CSV Import
1. Go to Supabase Table Editor
2. Select the products table
3. Click "Insert" > "Import from CSV"
4. Upload the products.csv file
5. Map columns correctly
6. Import data

### Option 3: Manual Entry
1. Use the exported CSV files as reference
2. Add products through the admin panel
3. Verify all data is correctly imported

## Post-Migration Checklist
- [ ] All products imported correctly
- [ ] Images are displaying properly
- [ ] Categories and tags are correct
- [ ] Affiliate links are working
- [ ] Admin user can login
- [ ] Click tracking is functional

## Support
If you encounter issues during migration:
1. Check Supabase logs for errors
2. Verify table structure matches schema
3. Ensure RLS policies are properly configured
4. Test with a small subset of data first

Generated on: ${new Date().toISOString()}
    `.trim()

    this.downloadFile(guide, `stylestore-migration-guide-${new Date().toISOString().split("T")[0]}.md`, "text/markdown")
  }
}
