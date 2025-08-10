// Enhanced storage service with better error handling
export class StorageService {
  // Upload product image with multiple fallback strategies
  static async uploadProductImage(file: File): Promise<string | null> {
    console.log("🔄 Starting image upload process for:", file.name)

    try {
      // Validate file
      if (!file) {
        throw new Error("No file provided")
      }

      if (!file.type.startsWith("image/")) {
        throw new Error("File is not an image")
      }

      if (file.size > 5 * 1024 * 1024) {
        throw new Error("File size exceeds 5MB limit")
      }

      // Strategy 1: Try Firebase Storage if available
      if (typeof window !== "undefined") {
        try {
          const { initializeFirebaseServices, getFirebaseStorage, isFirebaseAvailable } = await import("./firebase")

          // Initialize Firebase if not already done
          if (!isFirebaseAvailable()) {
            console.log("🔥 Initializing Firebase for image upload...")
            const result = await initializeFirebaseServices()
            if (!result.success) {
              throw new Error("Firebase initialization failed")
            }
          }

          const storage = getFirebaseStorage()
          if (storage) {
            console.log("📤 Uploading to Firebase Storage...")
            const { ref, uploadBytes, getDownloadURL } = await import("firebase/storage")

            const fileName = `products/${Date.now()}-${Math.random().toString(36).substring(2)}-${file.name}`
            const storageRef = ref(storage, fileName)

            const snapshot = await uploadBytes(storageRef, file)
            const downloadURL = await getDownloadURL(snapshot.ref)

            console.log("✅ Firebase upload successful:", downloadURL)
            return downloadURL
          }
        } catch (firebaseError) {
          console.warn("❌ Firebase upload failed:", firebaseError)
        }
      }

      // Strategy 2: Convert to base64 data URL (fallback)
      console.log("🔄 Using base64 fallback for image...")
      return new Promise((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (e) => {
          const result = e.target?.result as string
          if (result) {
            console.log("✅ Base64 conversion successful")
            resolve(result)
          } else {
            reject(new Error("Failed to convert image to base64"))
          }
        }

        reader.onerror = () => {
          reject(new Error("FileReader error"))
        }

        reader.readAsDataURL(file)
      })
    } catch (error) {
      console.error("❌ All upload strategies failed:", error)

      // Strategy 3: Generate placeholder URL (final fallback)
      const placeholderUrl = `/placeholder.svg?height=400&width=400&text=${encodeURIComponent(file.name.split(".")[0])}`
      console.log("🔄 Using placeholder URL:", placeholderUrl)
      return placeholderUrl
    }
  }

  // Delete image (Firebase only)
  static async deleteImage(imageUrl: string): Promise<boolean> {
    try {
      // Skip deletion for base64 and placeholder URLs
      if (imageUrl.startsWith("data:") || imageUrl.includes("placeholder.svg")) {
        return true
      }

      const { getFirebaseStorage, isFirebaseAvailable } = await import("./firebase")

      if (!isFirebaseAvailable()) {
        console.warn("Firebase not available for image deletion")
        return false
      }

      const storage = getFirebaseStorage()
      if (!storage) return false

      const { ref, deleteObject } = await import("firebase/storage")

      // Extract path from Firebase URL
      const urlParts = imageUrl.split("/o/")
      if (urlParts.length < 2) return false

      const pathPart = urlParts[1].split("?")[0]
      const imagePath = decodeURIComponent(pathPart)

      const imageRef = ref(storage, imagePath)
      await deleteObject(imageRef)

      console.log("✅ Image deleted from Firebase Storage")
      return true
    } catch (error) {
      console.error("❌ Error deleting image:", error)
      return false
    }
  }

  // Validate image file
  static validateImageFile(file: File): { valid: boolean; error?: string } {
    if (!file) {
      return { valid: false, error: "No file selected" }
    }

    if (!file.type.startsWith("image/")) {
      return { valid: false, error: "Please select a valid image file" }
    }

    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, error: "Image file size must be less than 5MB" }
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: "Supported formats: JPG, PNG, GIF, WebP" }
    }

    return { valid: true }
  }

  // Compress image if needed
  static async compressImage(file: File, maxSizeMB = 1): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")
      const img = new Image()

      img.onload = () => {
        // Calculate new dimensions
        const maxWidth = 800
        const maxHeight = 800
        let { width, height } = img

        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height
            height = maxHeight
          }
        }

        canvas.width = width
        canvas.height = height

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height)

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now(),
              })
              resolve(compressedFile.size < file.size ? compressedFile : file)
            } else {
              resolve(file)
            }
          },
          file.type,
          0.8, // Quality
        )
      }

      img.onerror = () => resolve(file)
      img.src = URL.createObjectURL(file)
    })
  }
}

// Export for backward compatibility
export const storageService = {
  uploadProductImage: StorageService.uploadProductImage,
  deleteImage: StorageService.deleteImage,
  validateImageFile: StorageService.validateImageFile,
  compressImage: StorageService.compressImage,
}
