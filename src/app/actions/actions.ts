import { Products } from "../../../types/products";

const getValidatedCart = (): Products[] => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return Array.isArray(cart) ? cart : [];
};

export const addToCart = (product: Products) => {
    const cart: Products[] = getValidatedCart();

    const existingProductIndex = cart.findIndex(item => item._id === product._id);

    if (existingProductIndex > -1) {
        cart[existingProductIndex].quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1,
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (productId: string) => {
    let cart: Products[] = getValidatedCart();
    cart = cart.filter(item => item._id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateCartQuantity = (productId: string, quantity: number) => {
    const cart: Products[] = getValidatedCart();
    const productIndex = cart.findIndex(item => item._id === productId);

    if (productIndex > -1) {
        cart[productIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
    }
};

export const getCartItems = (): Products[] => {
    return getValidatedCart();
};
