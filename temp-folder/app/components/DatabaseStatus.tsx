'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, ExternalLink, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function DatabaseStatus() {
  return (
    <Card className="mb-6 bg-green-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <span className="text-green-800 font-medium">
                Demo Mode - Fully Functional!
              </span>
              <p className="text-sm text-green-700">
                8 products loaded • Admin panel ready • All features active
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link href="/setup">
              <Button size="sm" variant="outline" className="bg-transparent">
                <ExternalLink className="h-4 w-4 mr-2" />
                Optional Firebase
              </Button>
            </Link>
            <Link href="/admin">
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                <Database className="h-4 w-4 mr-2" />
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
