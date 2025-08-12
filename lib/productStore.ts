import { getFirebaseDb, isFirebaseAvailable } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Add Product
export const addProduct = async (productData: any) => {
  try {
    // Defensive check for Firebase availability
    if (!isFirebaseAvailable()) {
      throw new Error("Firestore is not initialized");
    }
    const db = getFirebaseDb();
    if (!db) {
      throw new Error("Firestore instance is not available");
    }
    const docRef = await addDoc(collection(db, "products"), productData);
    console.log("Product added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Get All Products
export const getAllProducts = async () => {
  try {
    // Defensive check for Firebase availability
    if (!isFirebaseAvailable()) {
      throw new Error("Firestore is not initialized");
    }
    const db = getFirebaseDb();
    if (!db) {
      throw new Error("Firestore instance is not available");
    }
    const querySnapshot = await getDocs(collection(db, "products"));
    const products: any[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
