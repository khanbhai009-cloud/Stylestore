'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Database, FileText, Calendar } from 'lucide-react';
import type { Product } from '@/lib/supabase';

interface DataExporterProps {
  products: Product[];
  analytics: {
    totalUsers: number;
    totalClicks: number;
    totalProducts: number;
    topProducts: Product[];
  };
}

export default function DataExporter({
  products,
  analytics,
}: DataExporterProps) {
  const [exporting, setExporting] = useState(false);

  const exportToCSV = (data: any[], filename: string, headers: string[]) => {
    const csvContent = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header];
            if (Array.isArray(value)) {
              return `"${value.join(';')}"`;
            }
            if (
              typeof value === 'string' &&
              (value.includes(',') || value.includes('"'))
            ) {
              return `"${value.replace(/"/g, '""')}"`;
            }
            return value !== null && value !== undefined ? value : '';
          })
          .join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const exportProductsCSV = () => {
    const headers = [
      'name',
      'description',
      'price',
      'original_price',
      'category',
      'tags',
      'clicks',
      'is_active',
    ];
    const filename = `stylestore-products-${new Date().toISOString().split('T')[0]}.csv`;
    exportToCSV(products, filename, headers);
  };

  const exportAnalyticsCSV = () => {
    const analyticsData = [
      { metric: 'total_users', value: analytics.totalUsers },
      { metric: 'total_clicks', value: analytics.totalClicks },
      { metric: 'total_products', value: analytics.totalProducts },
      {
        metric: 'avg_clicks_per_product',
        value:
          analytics.totalProducts > 0
            ? Math.round(analytics.totalClicks / analytics.totalProducts)
            : 0,
      },
    ];
    const headers = ['metric', 'value'];
    const filename = `stylestore-analytics-${new Date().toISOString().split('T')[0]}.csv`;
    exportToCSV(analyticsData, filename, headers);
  };

  const generateSQLInserts = () => {
    const sqlStatements = [
      '-- StyleStore Data Export - SQL Insert Statements',
      '-- Generated on: ' + new Date().toISOString(),
      '-- Instructions: Run these statements in your Supabase SQL editor',
      '',
      '-- Clear existing data (optional)',
      '-- DELETE FROM products;',
      '-- DELETE FROM site_analytics;',
      '',
      '-- Products Table Inserts',
      ...products.map((product) => {
        const tags = product.tags.map((tag) => `"${tag}"`).join(',');
        return `INSERT INTO products (name, description, price, original_price, image_url, category, tags, affiliate_link, clicks, is_active) VALUES ('${product.name.replace(/'/g, "''")}', '${product.description.replace(/'/g, "''")}', ${product.price}, ${product.original_price || 'NULL'}, '${product.image_url}', '${product.category}', ARRAY[${tags}], '${product.affiliate_link}', ${product.clicks}, ${product.is_active});`;
      }),
      '',
      '-- Site Analytics Insert',
      `INSERT INTO site_analytics (total_visitors, total_clicks, date) VALUES (${analytics.totalUsers}, ${analytics.totalClicks}, CURRENT_DATE);`,
      '',
      '-- Create admin user (password: admin123)',
      `INSERT INTO users (email, password_hash, role) VALUES ('admin@gmail.com', '$2b$10$rOzJqQqQqQqQgQgQgQgOzJqQqQgQgQgQgQgQgQgOzJqQgQgQgQgQ', 'admin') ON CONFLICT (email) DO NOTHING;`,
    ].join('\n');

    const blob = new Blob([sqlStatements], { type: 'text/sql' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `stylestore-data-${new Date().toISOString().split('T')[0]}.sql`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  const generateMigrationGuide = () => {
    const guide = `
# StyleStore Data Migration Guide

## Overview
This guide helps you migrate your demo data to a live Supabase database.

## Files Exported
1. **products.csv** - Complete product catalog
2. **analytics.csv** - Site statistics
3. **data.sql** - SQL insert statements

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

## Post-Migration Checklist
- [ ] All products imported correctly
- [ ] Images are displaying properly
- [ ] Categories and tags are correct
- [ ] Affiliate links are working
- [ ] Admin user can login
- [ ] Click tracking is functional

Generated on: ${new Date().toISOString()}
    `.trim();

    const blob = new Blob([guide], { type: 'text/markdown' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `stylestore-migration-guide-${new Date().toISOString().split('T')[0]}.md`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Download className="h-5 w-5" />
          <span>Data Export & Migration</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            onClick={exportProductsCSV}
            variant="outline"
            className="flex items-center space-x-2 bg-transparent"
            disabled={exporting}
          >
            <FileText className="h-4 w-4" />
            <span>Export Products CSV</span>
          </Button>

          <Button
            onClick={exportAnalyticsCSV}
            variant="outline"
            className="flex items-center space-x-2 bg-transparent"
            disabled={exporting}
          >
            <Calendar className="h-4 w-4" />
            <span>Export Analytics CSV</span>
          </Button>

          <Button
            onClick={generateSQLInserts}
            variant="outline"
            className="flex items-center space-x-2 bg-transparent"
            disabled={exporting}
          >
            <Database className="h-4 w-4" />
            <span>Generate SQL</span>
          </Button>

          <Button
            onClick={generateMigrationGuide}
            variant="outline"
            className="flex items-center space-x-2 bg-transparent"
            disabled={exporting}
          >
            <FileText className="h-4 w-4" />
            <span>Migration Guide</span>
          </Button>
        </div>

        <div className="mt-6 pt-4 border-t">
          <div className="text-sm text-gray-600">
            <p className="mb-2">
              <strong>Export Options:</strong>
            </p>
            <ul className="space-y-1 list-disc list-inside">
              <li>CSV files for spreadsheet analysis and data import</li>
              <li>SQL statements for direct database migration</li>
              <li>Migration guide with step-by-step instructions</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
