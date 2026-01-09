let productData = {};
let cartData = {};

document.addEventListener('DOMContentLoaded', () => {
    initFeatures();
    loadStore();
});

function initFeatures() {
    const features = [
        ['Natural Clay', '100% Lead-Free'],
        ['Artisanal', 'Handcrafted in Bengal'],
        ['Eco-Friendly', 'Plastic-Free Shipping'],
        ['Seasoned', 'Ready for Dining']
    ];
    document.getElementById('features-container').innerHTML = features.map(f => `
        <div class="text-center">
            <h4 class="text-[10px] font-black uppercase tracking-widest text-stone-900 mb-1">${f[0]}</h4>
            <p class="text-xs text-stone-400">${f[1]}</p>
        </div>
    `).join('');
}

async function loadStore() {
    const res = await fetch('fetch.php');
    const data = await res.json();
    productData = data.products;
    cartData = data.cart;
    
    renderProducts(data.products);
    updateCartUI(data.cart_count, data.cart);
}

function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = Object.entries(products).map(([id, p]) => `
        <div class="product-card group bg-stone-50/50 rounded-[2.5rem] p-4 hover:bg-white hover:shadow-2xl hover:shadow-stone-200/50">
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
                    <span class="font-bold text-stone-900">₹${p.price.toLocaleString()}</span>
                </div>
                <p class="text-xs text-stone-500 line-clamp-2 mb-6 leading-relaxed">${p.desc}</p>
                <button onclick="addToCart('${id}')" class="w-full py-4 rounded-2xl bg-white border border-stone-200 shadow-sm font-bold text-[10px] uppercase tracking-widest group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 transition-all duration-300">
                    Add to Basket
                </button>
            </div>
        </div>
    `).join('');
}

async function addToCart(id) {
    const formData = new FormData();
    formData.append('action', 'add');
    formData.append('product_id', id);

    const res = await fetch('fetch.php', { method: 'POST', body: formData });
    const data = await res.json();
    if (data.success) {
        showToast(data.last_added);
        loadStore(); // Refresh data
    }
}

async function removeFromCart(id) {
    await fetch(`fetch.php?action=remove&product_id=${id}`);
    loadStore();
}

function updateCartUI(count, cart) {
    document.getElementById('cart-count-nav').innerText = count;
    document.getElementById('cart-count-drawer').innerText = `${count} Items Selected`;
    
    const container = document.getElementById('cart-items-container');
    const footer = document.getElementById('cart-footer');
    
    if (count === 0) {
        container.innerHTML = `
            <div class="text-center py-20">
                <div class="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-stone-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
                <p class="text-stone-400 italic">Your basket is empty.</p>
            </div>`;
        footer.classList.add('hidden');
    } else {
        let subtotal = 0;
        container.innerHTML = Object.entries(cart).map(([id, qty]) => {
            const item = productData[id];
            subtotal += item.price * qty;
            return `
            <div class="flex gap-6 items-start">
                <div class="w-24 h-24 bg-stone-50 rounded-2xl flex items-center justify-center p-3 flex-shrink-0">
                    <img src="${item.img}" class="w-full h-full object-contain">
                </div>
                <div class="flex-1">
                    <div class="flex justify-between">
                        <h4 class="font-bold text-stone-800 brand-font text-lg leading-tight">${item.name}</h4>
                        <button onclick="removeFromCart('${id}')" class="text-stone-300 hover:text-[#8B0000] transition-colors">✕</button>
                    </div>
                    <p class="text-[10px] text-stone-400 mt-1 uppercase font-bold tracking-widest">Quantity: ${qty}</p>
                    <div class="font-bold text-stone-900 text-sm mt-4 italic">₹${(item.price * qty).toLocaleString()}</div>
                </div>
            </div>`;
        }).join('');
        
        footer.classList.remove('hidden');
        footer.innerHTML = `
            <div class="flex justify-between items-end">
                <div>
                    <span class="font-bold text-stone-400 uppercase tracking-widest text-[9px] block mb-1">Estimated Total</span>
                    <span class="text-4xl font-black text-stone-900 brand-font">₹${subtotal.toLocaleString()}</span>
                </div>
                <div class="text-right text-[10px] text-stone-400 font-bold uppercase tracking-widest">Incl. all taxes</div>
            </div>
            <button onclick="alert('Proceeding to Secure Gateway...')" class="w-full py-6 bg-stone-900 text-white rounded-[2rem] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#8B0000] transition-all shadow-xl shadow-stone-200">
                Secure Checkout
            </button>`;
    }
}

function showToast(name) {
    const container = document.getElementById('toast-container');
    container.innerHTML = `
        <div id="toast" class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] bg-stone-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 animate-bounce">
            <span class="text-xs font-bold uppercase tracking-widest">Added: ${name}</span>
            <button onclick="this.parentElement.remove()" class="text-stone-400 hover:text-white">✕</button>
        </div>`;
    setTimeout(() => { if(document.getElementById('toast')) document.getElementById('toast').remove(); }, 4000);
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
        setTimeout(() => {
            drawer.classList.add('invisible');
            document.body.style.overflow = 'auto';
        }, 500);
    }
}
