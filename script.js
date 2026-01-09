let storeData = { products: {}, cart: {}, cart_count: 0 };

async function loadStore() {
    const response = await fetch('api.php?action=get_data');
    storeData = await response.json();
    renderProducts();
    renderCart();
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = Object.entries(storeData.products).map(([id, p]) => `
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

async function addToCart(id) {
    const body = new FormData();
    body.append('product_id', id);
    const response = await fetch('api.php?action=add', { method: 'POST', body });
    const res = await response.json();
    if (res.success) {
        showToast(res.name);
        loadStore();
    }
}

async function removeFromCart(id) {
    const body = new FormData();
    body.append('product_id', id);
    await fetch('api.php?action=remove', { method: 'POST', body });
    loadStore();
}

function renderCart() {
    document.getElementById('cart-count-nav').innerText = storeData.cart_count;
    document.getElementById('cart-count-drawer').innerText = `${storeData.cart_count} Items Selected`;
    const list = document.getElementById('cart-items-list');
    
    let subtotal = 0;
    if (Object.keys(storeData.cart).length === 0) {
        list.innerHTML = `<div class="text-center py-20 text-stone-400 italic">Your basket is empty.</div>`;
        document.getElementById('cart-footer').classList.add('hidden');
    } else {
        list.innerHTML = Object.entries(storeData.cart).map(([id, qty]) => {
            const p = storeData.products[id];
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
    setTimeout(() => toast.classList.add('hidden'), 4000);
}

window.onload = loadStore;
