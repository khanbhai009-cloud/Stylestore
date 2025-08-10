# StyleStore - Firebase E-commerce Platform

A modern, responsive e-commerce platform built with Next.js, Firebase, and Tailwind CSS.

## 🚀 Features

- **Product Management**: Full CRUD operations for products
- **Real-time Database**: Firebase Firestore for real-time data sync
- **Image Storage**: Firebase Storage for product images
- **Analytics**: Click tracking and site analytics
- **Admin Panel**: Comprehensive admin dashboard
- **Authentication**: Firebase Auth with custom user roles
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Authentication**: Firebase Auth
- **Styling**: Tailwind CSS, shadcn/ui
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd stylestore
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up Firebase**
   - Your Firebase configuration is already included in the project
   - Run the setup script to initialize your database:
   \`\`\`bash
   node scripts/firebase-setup.js
   \`\`\`

4. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Firebase Configuration

Your Firebase project is already configured with:
- **Project ID**: weby-44491
- **Authentication**: Email/Password
- **Firestore**: NoSQL database
- **Storage**: File storage for images

## 📊 Database Structure

### Collections:

1. **products**
   - Product information, pricing, categories
   - Real-time updates for inventory

2. **users**
   - User profiles and roles
   - Admin and customer accounts

3. **click_tracking**
   - Analytics for product clicks
   - User behavior tracking

4. **site_analytics**
   - Overall site statistics
   - Daily visitor counts

## 🔐 Admin Access

**Default Admin Credentials:**
- Email: `admin@gmail.com`
- Password: `admin123`

Access the admin panel at: `http://localhost:3000/admin`

## 🎨 Customization

### Adding New Products
1. Go to Admin Panel → Products
2. Click "Add Product"
3. Fill in product details
4. Upload images to Firebase Storage

### Modifying Categories
Update the categories array in:
- `app/components/ProductGrid.tsx`
- `lib/firebase.ts` (Product interface)

### Styling
- Tailwind classes in component files
- Global styles in `app/globals.css`
- shadcn/ui components in `components/ui/`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 📱 Features Overview

### Customer Features
- Browse products by category
- Search and filter products
- View product details and reviews
- Click tracking for analytics
- Responsive mobile design

### Admin Features
- Product management (CRUD)
- User management
- Analytics dashboard
- Order tracking
- Financial reports
- Data export capabilities

## 🔒 Security

- Firebase Security Rules configured
- Role-based access control
- Secure admin authentication
- Input validation and sanitization

## 📈 Analytics

- Real-time click tracking
- Product performance metrics
- User behavior analysis
- Revenue tracking
- Export capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review Firebase console for errors
- Check browser console for client-side issues

---

**Happy Selling! 🛍️**
