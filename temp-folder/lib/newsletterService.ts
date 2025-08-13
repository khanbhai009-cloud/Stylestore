// Newsletter service for managing subscribers
export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed';
  source: string;
}

class NewsletterService {
  private subscribers: NewsletterSubscriber[] = [
    {
      id: '1',
      email: 'john.doe@example.com',
      subscribed_at: '2024-01-10T10:30:00Z',
      status: 'active',
      source: 'homepage',
    },
    {
      id: '2',
      email: 'sarah.smith@gmail.com',
      subscribed_at: '2024-01-12T14:20:00Z',
      status: 'active',
      source: 'homepage',
    },
    {
      id: '3',
      email: 'mike.johnson@yahoo.com',
      subscribed_at: '2024-01-14T09:15:00Z',
      status: 'active',
      source: 'homepage',
    },
    {
      id: '4',
      email: 'emma.wilson@hotmail.com',
      subscribed_at: '2024-01-15T16:45:00Z',
      status: 'active',
      source: 'homepage',
    },
    {
      id: '5',
      email: 'alex.brown@outlook.com',
      subscribed_at: '2024-01-16T11:30:00Z',
      status: 'active',
      source: 'homepage',
    },
  ];

  private listeners: Array<(subscribers: NewsletterSubscriber[]) => void> = [];

  // Get all subscribers
  getSubscribers(): NewsletterSubscriber[] {
    return [...this.subscribers].sort(
      (a, b) =>
        new Date(b.subscribed_at).getTime() -
        new Date(a.subscribed_at).getTime()
    );
  }

  // Add new subscriber
  addSubscriber(email: string, source = 'homepage'): string {
    // Check if email already exists
    const existingSubscriber = this.subscribers.find(
      (s) => s.email.toLowerCase() === email.toLowerCase()
    );

    if (existingSubscriber) {
      if (existingSubscriber.status === 'unsubscribed') {
        // Reactivate if previously unsubscribed
        existingSubscriber.status = 'active';
        existingSubscriber.subscribed_at = new Date().toISOString();
        this.notifyListeners();
        console.log(`✅ Reactivated subscriber: ${email}`);
        return existingSubscriber.id;
      } else {
        console.log(`⚠️ Email already subscribed: ${email}`);
        return existingSubscriber.id;
      }
    }

    const newSubscriber: NewsletterSubscriber = {
      id: `subscriber-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      email: email.toLowerCase().trim(),
      subscribed_at: new Date().toISOString(),
      status: 'active',
      source,
    };

    this.subscribers.unshift(newSubscriber); // Add to beginning for latest first
    this.notifyListeners();

    console.log(`✅ New subscriber added: ${email}`);
    return newSubscriber.id;
  }

  // Unsubscribe user
  unsubscribeUser(id: string): boolean {
    const subscriber = this.subscribers.find((s) => s.id === id);
    if (subscriber) {
      subscriber.status = 'unsubscribed';
      this.notifyListeners();
      console.log(`✅ User unsubscribed: ${subscriber.email}`);
      return true;
    }
    return false;
  }

  // Delete subscriber
  deleteSubscriber(id: string): boolean {
    const index = this.subscribers.findIndex((s) => s.id === id);
    if (index !== -1) {
      const deletedSubscriber = this.subscribers[index];
      this.subscribers.splice(index, 1);
      this.notifyListeners();
      console.log(`✅ Subscriber deleted: ${deletedSubscriber.email}`);
      return true;
    }
    return false;
  }

  // Get subscriber stats
  getStats() {
    const active = this.subscribers.filter((s) => s.status === 'active').length;
    const unsubscribed = this.subscribers.filter(
      (s) => s.status === 'unsubscribed'
    ).length;
    const today = new Date().toISOString().split('T')[0];
    const todaySubscribers = this.subscribers.filter(
      (s) => s.subscribed_at.split('T')[0] === today && s.status === 'active'
    ).length;

    return {
      total: this.subscribers.length,
      active,
      unsubscribed,
      todaySubscribers,
      conversionRate:
        active > 0
          ? ((active / (active + unsubscribed)) * 100).toFixed(1)
          : '0',
    };
  }

  // Export subscribers to CSV
  exportToCSV(): string {
    const headers = ['Email', 'Status', 'Subscribed Date', 'Source'];
    const csvContent = [
      headers.join(','),
      ...this.subscribers.map((sub) =>
        [
          sub.email,
          sub.status,
          new Date(sub.subscribed_at).toLocaleDateString(),
          sub.source,
        ].join(',')
      ),
    ].join('\n');

    return csvContent;
  }

  // Subscribe to changes
  subscribe(
    listener: (subscribers: NewsletterSubscriber[]) => void
  ): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify listeners
  private notifyListeners() {
    const subscribers = this.getSubscribers();
    this.listeners.forEach((listener) => {
      try {
        listener(subscribers);
      } catch (error) {
        console.error('Error notifying newsletter listener:', error);
      }
    });
  }
}

// Create singleton instance
export const newsletterService = new NewsletterService();
export default newsletterService;
