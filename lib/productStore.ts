// product.ts
import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Add Product
export const addProduct = async (productData: any) => {
  try {
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