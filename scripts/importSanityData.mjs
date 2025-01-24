import { createClient } from '@sanity/client';
import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
dotenv.config({ path: path.resolve(_dirname, '../.env.local') });

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: '2025-01-13',
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});

// Function to upload an image to Sanity
async function uploadImageToSanity(imageUrl) {
  try {
    console.log(`Uploading image: ${imageUrl}`);

    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data);

    const asset = await client.assets.upload('image', buffer, {
      filename: path.basename(imageUrl),
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`Failed to upload image: ${imageUrl}`, error.message);
    return null;
  }
}

// Function to upload a product to Sanity
async function uploadProduct(product) {
  try {
    console.log(`Processing product: ${product.name}`);

    const imageId = await uploadImageToSanity(product.imageUrl);

    if (!imageId) {
      console.warn(`Skipping product ${product.name} due to image upload failure.`);
      return;
    }

    const document = {
      _type: 'products',
      name: product.name,
      description: product.description,
      price: product.price,
      image: {
        _type: 'image',
        asset: {
          _ref: imageId,
        },
      },
      category: product.category,
      discountPercent: product.discountPercent,
      isNew: product.isNew,
      colors: product.colors,
      sizes: product.sizes,
    };

    const createdProduct = await client.create(document);
    console.log(`Product uploaded successfully: ${product.name}`, createdProduct);
  } catch (error) {
    console.error(`Error uploading product: ${product.name}`, error.message);
  }
}

// Main function to import products
async function importProducts() {
  try {
    console.log('Fetching products from API...');
    const response = await axios.get('https://template1-neon-nu.vercel.app/api/products');

    if (response.status !== 200 || !Array.isArray(response.data)) {
      throw new Error(`Invalid API response. Status: ${response.status}`);
    }

    const products = response.data;
    console.log(`Fetched ${products.length} products.`);

    for (const product of products) {
      await uploadProduct(product);
    }

    console.log('All products imported successfully!');
  } catch (error) {
    console.error('Error during product import:', error.message);
  }
}

// Start the import process
importProducts();
