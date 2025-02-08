import { groq } from "next-sanity";

export const eight = groq`
  *[_type == "products"][0...8]{
    _id,
    name,
    price,
    description,
    "slugCurrent": slug.current,
    "image": image.asset->url,
    category,
    discountPercent,
    colors,
    sizes
  }
`;

export const four = groq`
  *[_type == "products"][0...4]{
    _id,
    name,
    price,
    description,
    "slugCurrent": slug.current,
    "image": image.asset->url,
    category,
    discountPercent,
    colors,
    sizes
  }
`;

export const allProducts = groq`
  *[_type == "products"]{
    _id,
    name,
    price,
    description,
    "slugCurrent": slug.current,
    "image": image.asset->url,
    category,
    discountPercent,
    colors,
    sizes
  }
`;

export const allOrders = groq`
  *[_type == "order"]{
    _id,
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    zipCode,
    cartItems[]->{
      _id,
      name
    },
    total,
    status
  }
`;
