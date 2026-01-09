let storeData = { products: {}, cart: {} };

async function loadData() {
    const response = await fetch('api.php?action=get_data');
    storeData = await response.json();
    renderProducts();
    updateCartUI();
}

function renderProducts() {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = Object.entries(storeData.products).map(([id, p]) => `
        <div class="product-card group bg-stone-50/50 rounded-[2.5rem] p-4 hover:bg-white hover:shadow-2xl">
            <div class="relative aspect-square rounded-[2rem] overflow-hidden bg-[#f3f0ec] mb-6">
                <img src="${p.img}" class="w-full h-full object-contain p-8">
            </div>
            <div class="px-2 pb-4">
                <p class="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B0000] mb-1">${p.type}</p>
                <h3 class="text-xl font-bold text-stone-800 brand-font leading-tight">${p.name}</h3>
                <div class="flex justify-between items-center mt-4">
                    <span class="font-bold text-stone-900">₹${p.price.toLocaleString()}</span>
                    <button onclick="addToCart('${id}')" class="px-4 py-2 bg-stone-900 text-white text-[10px] rounded-full uppercase font-bold">Add</button>
                </div>
            </div>
        </div>
    `).join('');
}

async function addToCart(id) {
    const formData = new FormData();
    formData.append('id', id);
    await fetch('api.php?action=add', { method: 'POST', body: formData });
    showToast(`Added to Basket`);
    loadData();
}

async function removeFromCart(id) {
    const formData = new FormData();
    formData.append('id', id);
    await fetch('api.php?action=remove', { method: 'POST', body: formData });
    loadData();
}

function updateCartUI() {
    const cartList = document.getElementById('cart-items');
    const count = Object.values(storeData.cart).reduce((a, b) => a + b, 0);
    document.getElementById('cart-count').innerText = count;
    
    let subtotal = 0;
    cartList.innerHTML = Object.entries(storeData.cart).map(([id, qty]) => {
        const p = storeData.products[id];
        subtotal += (p.price * qty);
        return `<div class="flex justify-between items-center border-b pb-4">
            <div><h4 class="font-bold">${p.name}</h4><p class="text-xs">Qty: ${qty}</p></div>
            <button onclick="removeFromCart('${id}')" class="text-red-800">✕</button>
        </div>`;
    }).join('');
    
    document.getElementById('cart-total').innerText = '₹' + subtotal.toLocaleString();
}

function toggleCart() {
    const drawer = document.getElementById('cartDrawer');
    drawer.classList.toggle('invisible');
    drawer.querySelector('.cart-drawer').classList.toggle('translate-x-full');
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.classList.remove('hidden');
    t.querySelector('span').innerText = msg;
    setTimeout(() => t.classList.add('hidden'), 3000);
}

window.onload = loadData;
