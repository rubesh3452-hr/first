

const addCartButtons = document.querySelectorAll('.add-cart');
const cartCount = document.getElementById('cartCount');
const toast = document.getElementById('toast');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
let count = 0;
let total = 0;
// ADD TO CART
addCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const card = button.parentElement;
        const productName = card.querySelector('h3').innerText;
        const priceText = card.querySelector('p').innerText;
        const price = parseInt(priceText.replace('$', ''));
        count++;
        total += price;
        cartCount.innerText = count;
        totalPrice.innerText = total;
        const item = document.createElement('div');
        item.classList.add('cart-item');
        item.innerHTML = `
 <p>${productName}</p>
 <span>${priceText}</span>
11
 `;
        cartItems.appendChild(item);
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 2000);
        saveCart();
    });
});
// CART SIDEBAR
const cartBtn = document.getElementById('cartBtn');
const cartSidebar = document.getElementById('cartSidebar');
const closeCart = document.getElementById('closeCart');
cartBtn.addEventListener('click', () => {
    cartSidebar.classList.add('active');
});
closeCart.addEventListener('click', () => {
    cartSidebar.classList.remove('active');
});
// WISHLIST
const wishlistButtons = document.querySelectorAll('.wishlist');
wishlistButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('active');
    });
});
// MOBILE MENU
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
// DARK MODE
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light');
    if (document.body.classList.contains('light')) {
        12
        themeToggle.innerText = '☀';
    } else {
        themeToggle.innerText = ' ';
    }
});
// FILTERS
const filters = document.querySelectorAll('.filter');
const products = document.querySelectorAll('.product-card');
filters.forEach(filter => {
    filter.addEventListener('click', () => {
        document.querySelector('.filter.active').classList.remove('active');
        filter.classList.add('active');
        const value = filter.dataset.filter;
        products.forEach(product => {
            if (value === 'all') {
                product.style.display = 'block';
            }
            else if (product.classList.contains(value)) {
                product.style.display = 'block';
            }
            else {
                product.style.display = 'none';
            }
        });
    });
});
// CONTACT FORM
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message Sent Successfully ');
    contactForm.reset();
});
// LOCAL STORAGE
function saveCart() {
    localStorage.setItem('cartCount', count);
    localStorage.setItem('cartTotal', total);
    localStorage.setItem('cartHTML', cartItems.innerHTML);
    13
}
function loadCart() {
    const savedCount = localStorage.getItem('cartCount');
    const savedTotal = localStorage.getItem('cartTotal');
    const savedHTML = localStorage.getItem('cartHTML');
    if (savedCount) {
        count = savedCount;
        cartCount.innerText = count;
    }
    if (savedTotal) {
        total = savedTotal;
        totalPrice.innerText = total;
    }
    if (savedHTML) {
        cartItems.innerHTML = savedHTML;
    }
}
loadCart();