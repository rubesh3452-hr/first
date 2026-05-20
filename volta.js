/**
 * ═══════════════════════════════════════════════════════════════
 *  VOLTA E-Commerce — Main JavaScript
 *  Covers: Products, Cart, Wishlist, Filters, Search, Cursor,
 *          Toast, Newsletter, Nav, Scroll Animations, Quick View
 * ═══════════════════════════════════════════════════════════════
 */

'use strict';

// ─────────────────────────────────────────────────────────────────
// 1. PRODUCT DATA
// ─────────────────────────────────────────────────────────────────

const PRODUCTS = [
    { id: 1, name: 'Velvet Midi Dress', category: 'women', tag: 'new', price: 189, oldPrice: null, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&q=80', cat: 'Women', rating: 4.9, reviews: 124, sizes: ['XS', 'S', 'M', 'L'], colors: ['#2C2C2C', '#8B3A3A', '#4A6741'] },
    { id: 2, name: 'Linen Blazer Set', category: 'women', tag: 'sale', price: 245, oldPrice: 310, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&q=80', cat: 'Women', rating: 4.7, reviews: 86, sizes: ['S', 'M', 'L', 'XL'], colors: ['#E8DCC8', '#1A1A1A'] },
    { id: 3, name: 'Oxford Leather Shoe', category: 'men', tag: 'new', price: 320, oldPrice: null, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', cat: 'Men', rating: 4.8, reviews: 203, sizes: ['7', '8', '9', '10', '11'], colors: ['#2C1810', '#1A1A1A', '#8B7355'] },
    { id: 4, name: 'Structured Tote Bag', category: 'accessories', tag: 'sale', price: 145, oldPrice: 195, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80', cat: 'Accessories', rating: 4.6, reviews: 67, sizes: ['One Size'], colors: ['#2C1810', '#E8DCC8', '#1A1A1A'] },
    { id: 5, name: 'Cashmere Knit Top', category: 'women', tag: '', price: 175, oldPrice: 220, image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=400&q=80', cat: 'Women', rating: 4.9, reviews: 151, sizes: ['XS', 'S', 'M', 'L'], colors: ['#C8B8A2', '#1A1A1A', '#8B3A3A'] },
    { id: 6, name: 'Tailored Trousers', category: 'men', tag: 'new', price: 195, oldPrice: null, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&q=80', cat: 'Men', rating: 4.5, reviews: 44, sizes: ['S', 'M', 'L', 'XL'], colors: ['#1A1A1A', '#4A4A4A', '#8B7355'] },
    { id: 7, name: 'Gold Hoop Earrings', category: 'accessories', tag: 'sale', price: 68, oldPrice: 95, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&q=80', cat: 'Accessories', rating: 4.8, reviews: 178, sizes: ['One Size'], colors: ['#C8A96E', '#C0C0C0'] },
    { id: 8, name: 'Silk Wrap Blouse', category: 'women', tag: 'new', price: 158, oldPrice: null, image: 'https://images.unsplash.com/photo-1551163943-3f7fb855de6e?w=400&q=80', cat: 'Women', rating: 4.7, reviews: 92, sizes: ['XS', 'S', 'M', 'L'], colors: ['#F5E6D3', '#2C2C2C', '#8B3A3A'] },
    { id: 9, name: 'Merino Wool Coat', category: 'men', tag: '', price: 420, oldPrice: 580, image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&q=80', cat: 'Men', rating: 4.9, reviews: 61, sizes: ['S', 'M', 'L', 'XL'], colors: ['#2C2C2C', '#8B7355', '#1A1A1A'] },
    { id: 10, name: 'Leather Belt', category: 'accessories', tag: '', price: 85, oldPrice: null, image: 'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=400&q=80', cat: 'Accessories', rating: 4.6, reviews: 39, sizes: ['S', 'M', 'L'], colors: ['#2C1810', '#1A1A1A', '#8B7355'] },
    { id: 11, name: 'Floral Print Skirt', category: 'women', tag: 'new', price: 128, oldPrice: null, image: 'https://images.unsplash.com/photo-1583496661160-fb5974ca5d0f?w=400&q=80', cat: 'Women', rating: 4.7, reviews: 55, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: ['#F5E6D3', '#2C2C2C'] },
    { id: 12, name: 'Chelsea Boots', category: 'men', tag: 'sale', price: 265, oldPrice: 340, image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&q=80', cat: 'Men', rating: 4.8, reviews: 112, sizes: ['7', '8', '9', '10', '11'], colors: ['#2C1810', '#1A1A1A'] },
];

// ─────────────────────────────────────────────────────────────────
// 2. STATE
// ─────────────────────────────────────────────────────────────────

const State = {
    cart: [],        // [{ ...product, qty, selectedSize, selectedColor }]
    wishlist: new Set(), // Set of product ids
    cartOpen: false,
    searchOpen: false,
    activeFilter: 'all',
    toastTimer: null,
    quickViewProduct: null,
};

// ─────────────────────────────────────────────────────────────────
// 3. UTILITY HELPERS
// ─────────────────────────────────────────────────────────────────

/** Generate star string from numeric rating */
function starsHTML(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
}

/** Format price as currency string */
function formatPrice(n) {
    return `$${Number(n).toFixed(2)}`;
}

/** Calculate discount percentage */
function discountPct(price, oldPrice) {
    return Math.round((1 - price / oldPrice) * 100);
}

/** Throttle a function call */
function throttle(fn, ms) {
    let last = 0;
    return (...args) => {
        const now = Date.now();
        if (now - last >= ms) { last = now; fn(...args); }
    };
}

/** Debounce a function call */
function debounce(fn, ms) {
    let timer;
    return (...args) => { clearTimeout(timer); timer = setTimeout(() => fn(...args), ms); };
}

// ─────────────────────────────────────────────────────────────────
// 4. PRODUCT CARD TEMPLATE
// ─────────────────────────────────────────────────────────────────

function productCardHTML(p, delay = 0) {
    const isWishlisted = State.wishlist.has(p.id);
    const badgeHTML = p.tag
        ? `<div class="product-badge badge-${p.tag === 'new' ? 'new' : 'sale'}">${p.tag === 'new' ? 'New' : 'Sale'}</div>`
        : '';
    const priceHTML = p.oldPrice
        ? `<span class="price-now">${formatPrice(p.price)}</span>
       <span class="price-old">${formatPrice(p.oldPrice)}</span>
       <span class="price-discount">-${discountPct(p.price, p.oldPrice)}%</span>`
        : `<span class="price-now">${formatPrice(p.price)}</span>`;

    return `
    <div class="product-card" data-id="${p.id}" style="animation-delay:${delay}s">
      <div class="product-image-wrap">
        ${badgeHTML}
        <img src="${p.image}" alt="${p.name}" loading="lazy">
        <div class="product-actions">
          <button class="btn-cart" data-action="add-cart" data-id="${p.id}">Add to Cart</button>
          <button class="btn-wish ${isWishlisted ? 'wishlisted' : ''}"
                  data-action="toggle-wish" data-id="${p.id}"
                  title="${isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}">
            ${isWishlisted ? '♥' : '♡'}
          </button>
        </div>
        <button class="btn-quick-view" data-action="quick-view" data-id="${p.id}">Quick View</button>
      </div>
      <div class="product-info">
        <div class="product-cat">${p.cat}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-price-row">${priceHTML}</div>
        <div class="product-rating">
          <span class="stars">${starsHTML(p.rating)}</span>
          <span class="rating-count">(${p.reviews})</span>
        </div>
      </div>
    </div>`;
}

// ─────────────────────────────────────────────────────────────────
// 5. RENDER PRODUCTS
// ─────────────────────────────────────────────────────────────────

function renderProducts(data) {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;

    if (data.length === 0) {
        grid.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:60px 0;color:var(--warm-gray)">
        <div style="font-size:32px;margin-bottom:12px">🔍</div>
        <div style="font-size:13px;letter-spacing:0.1em;text-transform:uppercase">No products found</div>
      </div>`;
        return;
    }

    grid.innerHTML = data.map((p, i) => productCardHTML(p, i * 0.07)).join('');

    // Re-attach hover listeners for cursor effect on new cards
    attachCursorHoverTargets();
}

// ─────────────────────────────────────────────────────────────────
// 6. FILTER
// ─────────────────────────────────────────────────────────────────

function filterProducts(btn, filter) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    State.activeFilter = filter;

    let filtered;
    switch (filter) {
        case 'new': filtered = PRODUCTS.filter(p => p.tag === 'new'); break;
        case 'sale': filtered = PRODUCTS.filter(p => p.tag === 'sale'); break;
        case 'women': filtered = PRODUCTS.filter(p => p.category === 'women'); break;
        case 'men': filtered = PRODUCTS.filter(p => p.category === 'men'); break;
        case 'accessories': filtered = PRODUCTS.filter(p => p.category === 'accessories'); break;
        default: filtered = PRODUCTS;
    }

    renderProducts(filtered);
}

// ─────────────────────────────────────────────────────────────────
// 7. SEARCH
// ─────────────────────────────────────────────────────────────────

function initSearch() {
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    if (!overlay || !input) return;

    const doSearch = debounce((query) => {
        const q = query.trim().toLowerCase();
        if (!q) { results.innerHTML = ''; return; }

        const hits = PRODUCTS.filter(p =>
            p.name.toLowerCase().includes(q) ||
            p.cat.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q)
        );

        results.innerHTML = hits.length
            ? hits.map(p => `
          <div class="search-result-item" data-action="search-pick" data-id="${p.id}">
            <img src="${p.image}" alt="${p.name}">
            <div>
              <div class="sr-name">${p.name}</div>
              <div class="sr-price">${formatPrice(p.price)}</div>
            </div>
          </div>`).join('')
            : `<p class="search-empty">No results for "${query}"</p>`;
    }, 220);

    input.addEventListener('input', e => doSearch(e.target.value));
}

function openSearch() {
    const overlay = document.getElementById('searchOverlay');
    if (!overlay) return;
    overlay.classList.add('open');
    State.searchOpen = true;
    setTimeout(() => document.getElementById('searchInput')?.focus(), 100);
}

function closeSearch() {
    document.getElementById('searchOverlay')?.classList.remove('open');
    State.searchOpen = false;
}

// ─────────────────────────────────────────────────────────────────
// 8. CART
// ─────────────────────────────────────────────────────────────────

function addToCart(id, selectedSize = null, selectedColor = null) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    // Pick default size/color if not provided
    const size = selectedSize || product.sizes[0];
    const color = selectedColor || product.colors[0];

    // Match by id + size + color as a unique key
    const key = `${id}-${size}-${color}`;
    const existing = State.cart.find(i => i._key === key);

    if (existing) {
        existing.qty++;
    } else {
        State.cart.push({ ...product, qty: 1, selectedSize: size, selectedColor: color, _key: key });
    }

    updateCartUI();
    showToast(`✔ ${product.name} added to cart`);
}

function changeQty(key, delta) {
    const item = State.cart.find(i => i._key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) State.cart = State.cart.filter(i => i._key !== key);
    updateCartUI();
}

function removeFromCart(key) {
    State.cart = State.cart.filter(i => i._key !== key);
    updateCartUI();
    showToast('Item removed from cart');
}

function toggleCart(forceOpen) {
    if (typeof forceOpen === 'boolean') {
        State.cartOpen = forceOpen;
    } else {
        State.cartOpen = !State.cartOpen;
    }
    document.getElementById('cartDrawer')?.classList.toggle('open', State.cartOpen);
    document.getElementById('cartOverlay')?.classList.toggle('open', State.cartOpen);
    document.body.style.overflow = State.cartOpen ? 'hidden' : '';
}

function updateCartUI() {
    const totalCost = State.cart.reduce((s, i) => s + i.price * i.qty, 0);
    const totalCount = State.cart.reduce((s, i) => s + i.qty, 0);

    // Badge & header count
    const badge = document.getElementById('cartBadge');
    const countEl = document.getElementById('cart-count-drawer');
    if (badge) badge.textContent = totalCount;
    if (countEl) countEl.textContent = totalCount > 0 ? `(${totalCount})` : '';

    // Total
    const totalEl = document.getElementById('cart-total');
    if (totalEl) totalEl.textContent = formatPrice(totalCost);

    // Item list
    const list = document.getElementById('cartItemsList');
    if (!list) return;

    if (State.cart.length === 0) {
        list.innerHTML = `
      <div style="text-align:center;padding:60px 0;color:var(--warm-gray)">
        <div style="font-size:32px;margin-bottom:12px">🛍</div>
        <div style="font-size:13px;letter-spacing:0.1em;text-transform:uppercase">Your cart is empty</div>
      </div>`;
        return;
    }

    list.innerHTML = State.cart.map(item => `
    <div class="cart-item">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-variant">
          ${item.cat} · ${item.selectedSize}
          <span class="cart-color-swatch"
                style="background:${item.selectedColor};display:inline-block;
                       width:10px;height:10px;border-radius:50%;
                       margin-left:6px;vertical-align:middle;
                       border:1px solid rgba(0,0,0,.2)"></span>
        </div>
        <div class="cart-item-row">
          <span class="cart-item-price">${formatPrice(item.price * item.qty)}</span>
          <div class="cart-item-qty">
            <button class="qty-btn" data-action="qty-minus" data-key="${item._key}">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" data-action="qty-plus"  data-key="${item._key}">+</button>
          </div>
        </div>
        <button class="btn-remove-item" data-action="remove-item" data-key="${item._key}">Remove</button>
      </div>
    </div>`).join('');
}

// ─────────────────────────────────────────────────────────────────
// 9. WISHLIST
// ─────────────────────────────────────────────────────────────────

function toggleWishlist(id) {
    const product = PRODUCTS.find(p => p.id === id);
    if (!product) return;

    if (State.wishlist.has(id)) {
        State.wishlist.delete(id);
        showToast(`♡ Removed from wishlist`);
    } else {
        State.wishlist.add(id);
        showToast(`♥ ${product.name} added to wishlist`);
    }

    // Update all wish buttons for this product on the page
    document.querySelectorAll(`[data-action="toggle-wish"][data-id="${id}"]`).forEach(btn => {
        btn.textContent = State.wishlist.has(id) ? '♥' : '♡';
        btn.classList.toggle('wishlisted', State.wishlist.has(id));
    });
}

// ─────────────────────────────────────────────────────────────────
// 10. QUICK VIEW MODAL
// ─────────────────────────────────────────────────────────────────

function openQuickView(id) {
    const p = PRODUCTS.find(prod => prod.id === id);
    if (!p) return;
    State.quickViewProduct = p;

    const modal = document.getElementById('quickViewModal');
    if (!modal) return;

    modal.querySelector('.qv-image').src = p.image;
    modal.querySelector('.qv-cat').textContent = p.cat;
    modal.querySelector('.qv-name').textContent = p.name;
    modal.querySelector('.qv-stars').textContent = starsHTML(p.rating);
    modal.querySelector('.qv-reviews').textContent = `(${p.reviews} reviews)`;
    modal.querySelector('.qv-price-now').textContent = formatPrice(p.price);

    const oldPriceEl = modal.querySelector('.qv-price-old');
    if (p.oldPrice) {
        oldPriceEl.textContent = formatPrice(p.oldPrice);
        oldPriceEl.style.display = 'inline';
    } else {
        oldPriceEl.style.display = 'none';
    }

    // Sizes
    const sizesEl = modal.querySelector('.qv-sizes');
    if (sizesEl) {
        sizesEl.innerHTML = p.sizes.map((s, i) =>
            `<button class="size-btn ${i === 0 ? 'selected' : ''}" data-size="${s}">${s}</button>`
        ).join('');
        sizesEl.querySelectorAll('.size-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                sizesEl.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });
    }

    // Colors
    const colorsEl = modal.querySelector('.qv-colors');
    if (colorsEl) {
        colorsEl.innerHTML = p.colors.map((c, i) =>
            `<button class="color-btn ${i === 0 ? 'selected' : ''}"
               data-color="${c}"
               style="background:${c}"
               title="${c}"></button>`
        ).join('');
        colorsEl.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                colorsEl.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
            });
        });
    }

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeQuickView() {
    document.getElementById('quickViewModal')?.classList.remove('open');
    document.body.style.overflow = '';
    State.quickViewProduct = null;
}

function quickViewAddToCart() {
    if (!State.quickViewProduct) return;
    const modal = document.getElementById('quickViewModal');
    const size = modal?.querySelector('.size-btn.selected')?.dataset.size || null;
    const color = modal?.querySelector('.color-btn.selected')?.dataset.color || null;
    addToCart(State.quickViewProduct.id, size, color);
    closeQuickView();
    setTimeout(() => toggleCart(true), 600);
}

// ─────────────────────────────────────────────────────────────────
// 11. TOAST NOTIFICATIONS
// ─────────────────────────────────────────────────────────────────

function showToast(msg) {
    const toast = document.getElementById('toast');
    const msgEl = document.getElementById('toast-msg');
    if (!toast || !msgEl) return;

    msgEl.textContent = msg;
    toast.classList.add('show');

    clearTimeout(State.toastTimer);
    State.toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// ─────────────────────────────────────────────────────────────────
// 12. NEWSLETTER SUBSCRIPTION
// ─────────────────────────────────────────────────────────────────

function subscribe() {
    const input = document.getElementById('nlEmail');
    if (!input) return;

    const val = input.value.trim();
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRe.test(val)) {
        showToast('⚠ Please enter a valid email address');
        input.focus();
        return;
    }

    input.value = '';
    showToast("🎉 You're subscribed! Welcome to VOLTA");
}

// ─────────────────────────────────────────────────────────────────
// 13. NAVIGATION SCROLL BEHAVIOUR
// ─────────────────────────────────────────────────────────────────

function initNavScroll() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const onScroll = throttle(() => {
        navbar.classList.toggle('scrolled', window.scrollY > 60);
    }, 80);

    window.addEventListener('scroll', onScroll, { passive: true });
}

// ─────────────────────────────────────────────────────────────────
// 14. SCROLL-REVEAL ANIMATIONS
// ─────────────────────────────────────────────────────────────────

function initScrollReveal() {
    const targets = document.querySelectorAll(
        '.cat-card, .product-card, .testi-card, .section-header, .featured-banner'
    );

    if (!window.IntersectionObserver) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    targets.forEach(el => {
        el.classList.add('reveal-ready');
        observer.observe(el);
    });
}

// ─────────────────────────────────────────────────────────────────
// 15. CUSTOM CURSOR
// ─────────────────────────────────────────────────────────────────

function initCursor() {
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursorRing');
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
        mx = e.clientX;
        my = e.clientY;
        cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
    });

    (function animateRing() {
        rx += (mx - rx - 18) * 0.12;
        ry += (my - ry - 18) * 0.12;
        ring.style.transform = `translate(${rx}px, ${ry}px)`;
        requestAnimationFrame(animateRing);
    })();

    attachCursorHoverTargets();
}

function attachCursorHoverTargets() {
    const ring = document.getElementById('cursorRing');
    if (!ring) return;

    document.querySelectorAll('a, button, .cat-card, .product-card, input').forEach(el => {
        if (el.dataset.cursorBound) return;      // don't double-bind
        el.dataset.cursorBound = '1';
        el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
        el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
    });
}

// ─────────────────────────────────────────────────────────────────
// 16. GLOBAL EVENT DELEGATION
//     All dynamic-content clicks are handled here via data-action
// ─────────────────────────────────────────────────────────────────

function initEventDelegation() {
    document.addEventListener('click', e => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;

        const action = btn.dataset.action;
        const id = parseInt(btn.dataset.id, 10) || null;
        const key = btn.dataset.key || null;

        switch (action) {
            case 'add-cart':
                addToCart(id);
                setTimeout(() => toggleCart(true), 600);
                break;

            case 'toggle-wish':
                toggleWishlist(id);
                break;

            case 'quick-view':
                openQuickView(id);
                break;

            case 'qty-minus':
                changeQty(key, -1);
                break;

            case 'qty-plus':
                changeQty(key, +1);
                break;

            case 'remove-item':
                removeFromCart(key);
                break;

            case 'search-pick':
                closeSearch();
                // Scroll to product or open quick view
                openQuickView(id);
                break;
        }
    });

    // Close modals on ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (State.cartOpen) toggleCart(false);
            if (State.searchOpen) closeSearch();
            if (State.quickViewProduct) closeQuickView();
        }
    });
}

// ─────────────────────────────────────────────────────────────────
// 17. MARQUEE PAUSE ON HOVER
// ─────────────────────────────────────────────────────────────────

function initMarquee() {
    const inner = document.querySelector('.marquee-inner');
    if (!inner) return;
    inner.addEventListener('mouseenter', () => inner.style.animationPlayState = 'paused');
    inner.addEventListener('mouseleave', () => inner.style.animationPlayState = 'running');
}

// ─────────────────────────────────────────────────────────────────
// 18. HERO COUNTER ANIMATION
// ─────────────────────────────────────────────────────────────────

function initCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const target = parseFloat(el.dataset.counter);
            const suffix = el.dataset.suffix || '';
            const duration = 1400;
            const start = performance.now();

            (function update(now) {
                const progress = Math.min((now - start) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
                el.textContent = (Number.isInteger(target)
                    ? Math.floor(eased * target)
                    : (eased * target).toFixed(1)) + suffix;
                if (progress < 1) requestAnimationFrame(update);
            })(start);

            observer.unobserve(el);
        });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
}

// ─────────────────────────────────────────────────────────────────
// 19. KEYBOARD ACCESSIBILITY
// ─────────────────────────────────────────────────────────────────

function initA11y() {
    // Allow Enter/Space to activate non-button clickable elements
    document.querySelectorAll('[role="button"]:not(button)').forEach(el => {
        el.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                el.click();
            }
        });
    });
}

// ─────────────────────────────────────────────────────────────────
// 20. LAZY IMAGE OBSERVER (fallback for older browsers)
// ─────────────────────────────────────────────────────────────────

function initLazyImages() {
    if ('loading' in HTMLImageElement.prototype) return; // native lazy load supported

    const images = document.querySelectorAll('img[loading="lazy"]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => observer.observe(img));
}

// ─────────────────────────────────────────────────────────────────
// 21. CHECKOUT (stub — connect to your payment gateway)
// ─────────────────────────────────────────────────────────────────

function initiateCheckout() {
    if (State.cart.length === 0) {
        showToast('⚠ Your cart is empty');
        return;
    }

    // Example payload for a payment API
    const order = {
        items: State.cart.map(i => ({
            id: i.id,
            name: i.name,
            price: i.price,
            qty: i.qty,
            size: i.selectedSize,
            color: i.selectedColor,
        })),
        total: State.cart.reduce((s, i) => s + i.price * i.qty, 0),
    };

    console.info('[VOLTA] Checkout payload:', order);
    showToast('🔒 Redirecting to checkout…');

    // Replace with real redirect:
    // window.location.href = `/checkout?token=${encodeURIComponent(JSON.stringify(order))}`;
}

// ─────────────────────────────────────────────────────────────────
// 22. INIT — bootstrap everything on DOMContentLoaded
// ─────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(PRODUCTS);
    initNavScroll();
    initCursor();
    initMarquee();
    initScrollReveal();
    initCounters();
    initSearch();
    initEventDelegation();
    initLazyImages();
    initA11y();
    updateCartUI();   // initialise cart display from any restored state
});

// ─────────────────────────────────────────────────────────────────
// 23. PUBLIC API  (attach to window so inline HTML handlers work)
// ─────────────────────────────────────────────────────────────────

Object.assign(window, {
    // Called by filter buttons: onclick="filterProducts(this,'women')"
    filterProducts,
    // Called by nav cart icon: onclick="toggleCart()"
    toggleCart,
    // Called by search icon: onclick="openSearch()"
    openSearch,
    closeSearch,
    // Called by newsletter button: onclick="subscribe()"
    subscribe,
    // Called by quick-view add-to-cart button
    quickViewAddToCart,
    closeQuickView,
    // Called by checkout button
    initiateCheckout,
    // Expose utilities for console debugging
    _volta: { State, PRODUCTS, addToCart, removeFromCart, showToast },
});