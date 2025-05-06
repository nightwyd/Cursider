// DOM Elements
const productsContainer = document.getElementById('products-container');
const productTemplate = document.getElementById('product-template');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartCountElement = document.querySelector('.cart-count');

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Initialize the store
document.addEventListener('DOMContentLoaded', () => {
    // Display all products initially
    displayProducts('all');
    
    // Add event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Display products for the selected category
            displayProducts(button.dataset.category);
        });
    });
    
    // Add event listener to hero CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            // Scroll to products section
            document.querySelector('.featured-products').scrollIntoView({ 
                behavior: 'smooth' 
            });
        });
    }
});

// Function to display products based on category
function displayProducts(category) {
    // Clear products container
    productsContainer.innerHTML = '';
    
    // Filter products by category
    const filteredProducts = category === 'all' 
        ? products 
        : products.filter(product => product.category === category);
    
    // Display products
    filteredProducts.forEach(product => {
        const productElement = createProductElement(product);
        productsContainer.appendChild(productElement);
    });
    
    // If no products found
    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = `
            <div class="no-products">
                <p>No products found in this category.</p>
            </div>
        `;
    }
}

// Function to create product element from template
function createProductElement(product) {
    // Clone the template
    const template = productTemplate.content.cloneNode(true);
    
    // Replace template placeholders with actual data
    let productHtml = template.innerHTML;
    productHtml = productHtml.replace(/\{id\}/g, product.id);
    productHtml = productHtml.replace(/\{name\}/g, product.name);
    productHtml = productHtml.replace(/\{imageUrl\}/g, product.imageUrl);
    productHtml = productHtml.replace(/\{shortDescription\}/g, product.shortDescription);
    productHtml = productHtml.replace(/\{price\}/g, product.price.toFixed(2));
    productHtml = productHtml.replace(/\{reviewCount\}/g, product.reviewCount);
    
    // Generate stars based on rating
    const starsHtml = generateStars(product.rating);
    productHtml = productHtml.replace(/\{stars\}/g, starsHtml);
    
    // Create a temporary container
    const container = document.createElement('div');
    container.innerHTML = productHtml;
    
    // Get the product element
    const productElement = container.firstElementChild;
    
    // Add event listener to "Add to Cart" button
    const addToCartBtn = productElement.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
    });
    
    return productElement;
}

// Function to generate star rating HTML
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (halfStar) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="far fa-star"></i>';
    }
    
    return stars;
}

// Function to add product to cart
function addToCart(product) {
    // Check if product is already in cart
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        // Increase quantity if product is already in cart
        existingProduct.quantity += 1;
    } else {
        // Add new product to cart
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            imageUrl: product.imageUrl,
            quantity: 1
        });
    }
    
    // Update cart in localStorage
    saveCart();
    
    // Update cart count
    updateCartCount();
    
    // Show notification
    showNotification(`${product.name} added to cart!`);
}

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = totalItems;
}

// Function to show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        </div>
    `;
    
    // Add notification to document
    document.body.appendChild(notification);
    
    // Add visible class after a small delay (for animation)
    setTimeout(() => {
        notification.classList.add('visible');
    }, 10);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('visible');
        
        // Remove from DOM after animation completes
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add notification styles
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    .notification {
        position: fixed;
        bottom: -100px;
        left: 50%;
        transform: translateX(-50%);
        background-color: white;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        transition: bottom 0.3s ease;
    }
    
    .notification.visible {
        bottom: 20px;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-content i {
        color: var(--success-color);
        font-size: 1.2rem;
    }
`;
document.head.appendChild(notificationStyles);
