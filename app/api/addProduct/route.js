// pages/api/addProduct.js
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    title,
    description,
    original_price,
    current_price,
    discount,
    image_url,
    affiliate_link,
    tag
  } = req.body;

  // Validation
  if (!title || !description || !original_price || !current_price || !discount || !image_url || !affiliate_link || !tag) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const docRef = await addDoc(collection(db, 'products'), {
      title,
      description,
      original_price: Number(original_price),
      current_price: Number(current_price),
      discount: Number(discount),
      image_url,
      affiliate_link,
      tag,
      createdAt: new Date() // Adding timestamp which is common in Firebase
    });

    res.status(200).json({ 
      message: 'Product added successfully', 
      data: { id: docRef.id } 
    });
  } catch (error) {
    console.error('Error adding document: ', error);
    return res.status(500).json({ error: error.message });
  }
}