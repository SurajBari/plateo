let products = {};
let cart = JSON.parse(localStorage.getItem('plateo_cart')) || {};

async function loadStore() {
    try {
        // Fetch products from api.php
        const response = await fetch('api.php');
        products = await response.json();
        
        renderProducts();
        renderCart();
    } catch (error) {
        console.error("Vercel API Error:", error);
    }
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    if (!grid) return;

    grid.innerHTML = Object.entries(products).map(([id, p]) => `
        <div class="product-card group bg-stone-50/50 rounded-[2.5rem] p-4 hover:bg-white hover:shadow-2xl">
            <div class="relative aspect-square rounded-[2rem] overflow-hidden bg-[#f3f0ec] mb-6">
                <img src="${p.img}" class="w-full h-full object-contain p-8 img-zoom" alt="${p.name}">
                <div class="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                     <span class="bg-white/90 backdrop-blur-md text-[9px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-tighter">Handmade</span>
                </div>
            </div>
            <div class="px-2 pb-4">
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <p class="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B0000] mb-1">${p.type}</p>
                        <h3 class="text-xl font-bold text-stone-800 brand-font leading-tight">${p.name}</h3>
                    </div>
                    <span class="font-bold text-stone-900">₹${p.price}</span>
                </div>
                <p class="text-xs text-stone-500 line-clamp-2 mb-6 leading-relaxed">${p.desc}</p>
                <button onclick="addToCart('${id}')" class="w-full py-4 rounded-2xl bg-white border border-stone-200 shadow-sm font-bold text-[10px] uppercase tracking-widest group-hover:bg-stone-900 group-hover:text-white transition-all duration-300">
                    Add to Basket
                </button>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    cart[id] = (cart[id] || 0) + 1;
    saveCart();
    showToast(products[id].name);
}

function removeFromCart(id) {
    delete cart[id];
    saveCart();
}

function saveCart() {
    localStorage.setItem('plateo_cart', JSON.stringify(cart));
    renderCart();
}

function renderCart() {
    const count = Object.values(cart).reduce((a, b) => a + b, 0);
    document.getElementById('cart-count-nav').innerText = count;
    document.getElementById('cart-count-drawer').innerText = `${count} Items Selected`;

    const list = document.getElementById('cart-items-list');
    let subtotal = 0;

    if (count === 0) {
        list.innerHTML = `<div class="text-center py-20 text-stone-400 italic">Your basket is empty.</div>`;
        document.getElementById('cart-footer').classList.add('hidden');
    } else {
        list.innerHTML = Object.entries(cart).map(([id, qty]) => {
            const p = products[id];
            subtotal += (p.price * qty);
            return `
                <div class="flex gap-6 items-start">
                    <img src="${p.img}" class="w-24 h-24 bg-stone-50 rounded-2xl object-contain p-3">
                    <div class="flex-1">
                        <div class="flex justify-between">
                            <h4 class="font-bold text-stone-800 brand-font text-lg">${p.name}</h4>
                            <button onclick="removeFromCart('${id}')" class="text-stone-300 hover:text-red-800">✕</button>
                        </div>
                        <p class="text-[10px] text-stone-400 uppercase font-bold">Qty: ${qty}</p>
                        <div class="font-bold text-stone-900 text-sm mt-4 italic">₹${p.price * qty}</div>
                    </div>
                </div>`;
        }).join('');
        document.getElementById('cart-footer').classList.remove('hidden');
        document.getElementById('cart-total-amount').innerText = `₹${subtotal.toLocaleString()}`;
    }
}

function toggleCart() {
    const drawer = document.getElementById('cartDrawer');
    const inner = drawer.querySelector('.cart-drawer');
    if (drawer.classList.contains('invisible')) {
        drawer.classList.remove('invisible');
        setTimeout(() => inner.classList.remove('translate-x-full'), 10);
        document.body.style.overflow = 'hidden';
    } else {
        inner.classList.add('translate-x-full');
        setTimeout(() => { drawer.classList.add('invisible'); document.body.style.overflow = 'auto'; }, 500);
    }
}

function showToast(name) {
    const toast = document.getElementById('toast');
    toast.querySelector('#toast-name').innerText = name;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

window.onload = loadStore;
