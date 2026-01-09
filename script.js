let storeData = { products: {}, cart: {}, cart_count: 0 };

async function refreshStore() {
    try {
        const response = await fetch('api.php?action=get_data');
        storeData = await response.json();
        renderProducts();
        renderCart();
    } catch (e) { console.error("Data fetch failed"); }
}

function renderProducts() {
    const container = document.getElementById('product-grid');
    container.innerHTML = Object.entries(storeData.products).map(([id, p]) => `
        <div class="product-card bg-white border border-stone-100 rounded-[2rem] p-5 shadow-sm hover:shadow-xl">
            <div class="aspect-square bg-stone-50 rounded-[1.5rem] mb-6 flex items-center justify-center p-6 overflow-hidden">
                <img src="${p.img}" class="w-full h-full object-contain hover:scale-110 transition-transform duration-500" alt="${p.name}">
            </div>
            <p class="text-[10px] font-bold text-[#8B0000] uppercase tracking-widest mb-1">${p.type}</p>
            <h3 class="text-lg font-bold brand-font mb-2">${p.name}</h3>
            <p class="text-xs text-stone-500 line-clamp-2 mb-4">${p.desc}</p>
            <div class="flex justify-between items-center">
                <span class="font-bold text-lg">₹${p.price}</span>
                <button onclick="addToCart('${id}')" class="bg-stone-900 text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all">Add +</button>
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
        refreshStore();
    }
}

async function removeFromCart(id) {
    const body = new FormData();
    body.append('product_id', id);
    await fetch('api.php?action=remove', { method: 'POST', body });
    refreshStore();
}

function renderCart() {
    const list = document.getElementById('cart-items-list');
    document.querySelectorAll('.cart-count-val').forEach(el => el.innerText = storeData.cart_count);

    let subtotal = 0;
    let html = '';

    if (Object.keys(storeData.cart).length === 0) {
        html = `<div class="text-center py-20 text-stone-400 italic">Your basket is empty.</div>`;
    } else {
        Object.entries(storeData.cart).forEach(([id, qty]) => {
            const p = storeData.products[id];
            subtotal += (p.price * qty);
            html += `
                <div class="flex gap-4 items-center border-b border-stone-100 pb-4">
                    <img src="${p.img}" class="w-16 h-16 object-contain bg-stone-50 rounded-xl">
                    <div class="flex-1">
                        <h4 class="font-bold text-sm">${p.name}</h4>
                        <p class="text-[10px] text-stone-500">Qty: ${qty} • ₹${p.price * qty}</p>
                    </div>
                    <button onclick="removeFromCart('${id}')" class="text-stone-300 hover:text-red-500">✕</button>
                </div>`;
        });
    }
    list.innerHTML = html;
    document.getElementById('cart-subtotal').innerText = "₹" + subtotal;
}

function toggleCart() {
    const drawer = document.getElementById('cartDrawer');
    drawer.classList.toggle('invisible');
    drawer.querySelector('.cart-drawer').classList.toggle('translate-x-full');
}

function showToast(name) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-msg').innerText = "Added: " + name;
    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 3000);
}

window.onload = refreshStore;
