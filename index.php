<?php
session_start();

/**
 * PlateO - Heritage Bengal Edition (Premium E-Commerce)
 */

$brand_name = "PlateO";

$products = [
    'bt-01' => [
        'name' => 'Kumartuli Heritage Thala',
        'type' => 'Traditional Clay Plate',
        'price' => 599,
        'img' => 'https://m.media-amazon.com/images/I/51ZFsr-JbyL._SX679_.jpg',
        'desc' => 'Eco-friendly hand-pressed clay plate. Naturally seasoned for an authentic Bengali dining experience.'
    ],
    'kg-02' => [
        'name' => 'Classic Matir Glass',
        'type' => 'Earthen Tumbler (Set of 2)',
        'price' => 249,
        'img' => 'https://5.imimg.com/data5/SELLER/Default/2021/6/MQ/NP/YI/131065961/traditional-clay-glass-500x500.jpg',
        'desc' => 'Tapered earthen glass that keeps water naturally cool with a rustic terracotta aroma.'
    ],
    'as-03' => [
        'name' => 'Alpana Engraved Bowl',
        'type' => 'Hand-Painted Stoneware',
        'price' => 399,
        'img' => 'https://m.media-amazon.com/images/I/61MvS1PAn6L._SL1000_.jpg',
        'desc' => 'Deep bowl featuring hand-carved traditional folk motifs on a dark burnt clay base.'
    ],
    'bs-04' => [
        'name' => 'Royal Baishakhi Set',
        'type' => 'Full Dining Set (6pc)',
        'price' => 1899,
        'img' => 'https://m.media-amazon.com/images/I/71N8Y1p98LL._SL1500_.jpg',
        'desc' => 'A grand set for festivals: includes Thala, Glass, and 4 Bowls crafted by master artisans.'
    ]
];

// Logic: Cart Management
if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];

if (isset($_POST['action']) && $_POST['action'] == 'add') {
    $id = $_POST['product_id'];
    $_SESSION['cart'][$id] = ($_SESSION['cart'][$id] ?? 0) + 1;
    // Set a flag for the UI to show a success message
    $_SESSION['last_added'] = $products[$id]['name'];
    header("Location: " . $_SERVER['PHP_SELF'] . "#shop");
    exit;
}

if (isset($_GET['remove'])) {
    unset($_SESSION['cart'][$_GET['remove']]);
    header("Location: " . $_SERVER['PHP_SELF']);
    exit;
}

$cart_count = array_sum($_SESSION['cart']);
?>

<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $brand_name; ?> | Artisan Bengali Earthenware</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Plus+Jakarta+Sans:wght@300;400;500;600;800&display=swap" rel="stylesheet">
    <style>
        :root { --sindoor: #8B0000; --clay: #A0522D; --soft-bg: #FDFBF9; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: var(--soft-bg); color: #1a1a1a; }
        .brand-font { font-family: 'Playfair Display', serif; }
        
        /* Premium Texture Overlay */
        body::before {
            content: "";
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-image: url('https://www.transparenttextures.com/patterns/natural-paper.png');
            opacity: 0.4; pointer-events: none; z-index: 99;
        }

        /* Hero Floating Animation */
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(2deg); }
            100% { transform: translateY(0px) rotate(0deg); }
        }
        .hero-float { animation: float 6s ease-in-out infinite; }

        .glass-nav { background: rgba(253, 251, 249, 0.9); backdrop-filter: blur(15px); }
        .cart-drawer { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        
        /* Product Card Glass Effect */
        .product-card { transition: all 0.4s ease; }
        .product-card:hover { transform: translateY(-8px); }
        .img-zoom { transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .product-card:hover .img-zoom { transform: scale(1.1); }
    </style>
</head>
<body class="overflow-x-hidden">

    <!-- SUCCESS TOAST -->
    <?php if(isset($_SESSION['last_added'])): ?>
    <div id="toast" class="fixed bottom-10 left-1/2 -translate-x-1/2 z-[110] bg-stone-900 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 animate-bounce">
        <span class="text-xs font-bold uppercase tracking-widest">Added: <?php echo $_SESSION['last_added']; ?></span>
        <button onclick="this.parentElement.remove()" class="text-stone-400 hover:text-white">✕</button>
    </div>
    <?php unset($_SESSION['last_added']); endif; ?>

    <!-- NAVIGATION -->
    <nav class="fixed w-full z-50 glass-nav border-b border-stone-200/60">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
            
            <!-- LOGO (UNTOUCHED PER INSTRUCTION) -->
            <a href="#" class="flex items-center gap-1 group">
                <span class="text-2xl font-extrabold tracking-tighter text-slate-800">Plate</span>
                <div class="relative w-8 h-8 flex items-center justify-center plate-o transition-transform duration-500 group-hover:rotate-12">
                    <svg viewBox="0 0 100 100" class="w-full h-full">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="8" class="text-slate-800" />
                        <circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="2" class="text-slate-400" stroke-dasharray="4 2" />
                        <circle cx="50" cy="50" r="6" class="fill-[#8B0000]" />
                    </svg>
                </div>
            </a>

            <div class="flex items-center space-x-10">
                <nav class="hidden md:flex space-x-8 text-[11px] font-bold uppercase tracking-[0.2em] text-stone-500">
                    <a href="#shop" class="hover:text-[#8B0000] transition-colors">The Collection</a>
                    <a href="#about" class="hover:text-[#8B0000] transition-colors">Heritage</a>
                </nav>
                
                <button onclick="toggleCart()" class="relative group flex items-center gap-3 bg-stone-900 text-white px-6 py-3 rounded-full hover:bg-[#8B0000] transition-all duration-300 shadow-xl shadow-stone-200">
                    <span class="text-[10px] font-bold uppercase tracking-widest">Basket</span>
                    <div class="w-px h-3 bg-stone-700"></div>
                    <span class="text-xs font-bold"><?php echo $cart_count; ?></span>
                </button>
            </div>
        </div>
    </nav>

    <!-- HERO SECTION -->
    <section class="relative pt-32 pb-20 px-6 overflow-hidden">
        <div class="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div class="relative z-10">
                <div class="flex items-center gap-3 mb-6">
                    <span class="h-px w-8 bg-[#8B0000]"></span>
                    <span class="text-[#8B0000] text-[10px] font-bold uppercase tracking-[0.3em]">Established 1924 • West Bengal</span>
                </div>
                <h1 class="text-7xl lg:text-9xl font-black text-stone-900 leading-[0.85] mb-8 brand-font">
                    Earthly <br><span class="italic font-light text-[#8B0000]">Elegance.</span>
                </h1>
                <p class="text-lg text-stone-500 max-w-sm leading-relaxed mb-10">
                    Sustainably sourced from the Ganges, handcrafted by national award-winning artisans.
                </p>
                <div class="flex flex-wrap gap-4">
                    <a href="#shop" class="px-10 py-5 bg-stone-900 text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl hover:bg-[#8B0000] transition-all transform hover:-translate-y-1">Explore Studio</a>
                    <a href="#about" class="px-10 py-5 border border-stone-200 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-stone-50 transition-all">Our Process</a>
                </div>
            </div>
            
            <div class="relative">
                <!-- Abstract vector background shape -->
                <div class="absolute inset-0 bg-[#A0522D]/5 rounded-full blur-3xl transform scale-110"></div>
                <div class="relative hero-float">
                    <img src="https://m.media-amazon.com/images/I/51ZFsr-JbyL._SX679_.jpg" 
                         class="w-full h-auto object-contain drop-shadow-[0_50px_50px_rgba(0,0,0,0.15)]" alt="Hero Clayware">
                </div>
            </div>
        </div>
    </section>

    <!-- FEATURES STRIP -->
    <section id="about" class="py-16 border-y border-stone-100 bg-white/50">
        <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
            <?php 
                $features = [
                    ['Natural Clay', '100% Lead-Free'],
                    ['Artisanal', 'Handcrafted in Bengal'],
                    ['Eco-Friendly', 'Plastic-Free Shipping'],
                    ['Seasoned', 'Ready for Dining']
                ];
                foreach($features as $f):
            ?>
            <div class="text-center">
                <h4 class="text-[10px] font-black uppercase tracking-widest text-stone-900 mb-1"><?php echo $f[0]; ?></h4>
                <p class="text-xs text-stone-400"><?php echo $f[1]; ?></p>
            </div>
            <?php endforeach; ?>
        </div>
    </section>

    <!-- PRODUCT CATALOG -->
    <section id="shop" class="py-32 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                    <h2 class="text-5xl font-bold text-stone-900 brand-font">The Studio Collection</h2>
                    <p class="text-stone-400 mt-4 max-w-sm">Every piece tells a story of the soil. Pick your heritage vessel below.</p>
                </div>
                <div class="flex gap-4">
                    <button class="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all">←</button>
                    <button class="w-12 h-12 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-900 hover:text-white transition-all">→</button>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <?php foreach($products as $id => $product): ?>
                <div class="product-card group bg-stone-50/50 rounded-[2.5rem] p-4 hover:bg-white hover:shadow-2xl hover:shadow-stone-200/50">
                    <div class="relative aspect-square rounded-[2rem] overflow-hidden bg-[#f3f0ec] mb-6">
                        <img src="<?php echo $product['img']; ?>" 
                             class="w-full h-full object-contain p-8 img-zoom" alt="<?php echo $product['name']; ?>">
                        
                        <div class="absolute top-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                             <span class="bg-white/90 backdrop-blur-md text-[9px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-tighter">Handmade</span>
                        </div>
                    </div>
                    
                    <div class="px-2 pb-4">
                        <div class="flex justify-between items-start mb-2">
                            <div>
                                <p class="text-[9px] font-bold uppercase tracking-[0.2em] text-[#8B0000] mb-1"><?php echo $product['type']; ?></p>
                                <h3 class="text-xl font-bold text-stone-800 brand-font leading-tight"><?php echo $product['name']; ?></h3>
                            </div>
                            <span class="font-bold text-stone-900">₹<?php echo number_format($product['price']); ?></span>
                        </div>
                        
                        <p class="text-xs text-stone-500 line-clamp-2 mb-6 leading-relaxed"><?php echo $product['desc']; ?></p>
                        
                        <form method="POST">
                            <input type="hidden" name="product_id" value="<?php echo $id; ?>">
                            <input type="hidden" name="action" value="add">
                            <button type="submit" class="w-full py-4 rounded-2xl bg-white border border-stone-200 shadow-sm font-bold text-[10px] uppercase tracking-widest group-hover:bg-stone-900 group-hover:text-white group-hover:border-stone-900 transition-all duration-300">
                                Add to Basket
                            </button>
                        </form>
                    </div>
                </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- FOOTER (LOGO UNTOUCHED) -->
    <footer class="bg-stone-950 py-24 px-6 text-stone-500 overflow-hidden relative">
        <div class="absolute top-0 right-0 w-96 h-96 bg-[#8B0000]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 relative z-10">
            <div class="max-w-sm">
                <a href="#" class="flex items-center gap-1 mb-8">
                    <span class="text-2xl font-extrabold tracking-tighter text-white">Plate</span>
                    <svg viewBox="0 0 100 100" class="w-8 h-8">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="white" stroke-width="8" />
                        <circle cx="50" cy="50" r="15" fill="#8B0000" />
                    </svg>
                </a>
                <p class="text-sm leading-relaxed mb-10 text-stone-400">Preserving the terracotta heritage of Bishnupur and Kumartuli. We bring the soul of Bengal to your table.</p>
                <div class="flex gap-8 text-white text-[10px] font-bold uppercase tracking-[0.3em]">
                    <a href="#" class="hover:text-[#8B0000] transition-colors">Instagram</a>
                    <a href="#" class="hover:text-[#8B0000] transition-colors">Journal</a>
                    <a href="#" class="hover:text-[#8B0000] transition-colors">Contact</a>
                </div>
            </div>
            
            <div class="flex flex-col items-end gap-4">
                <div class="text-[10px] uppercase tracking-[0.4em] font-black text-white">© 2026 PlateO Bengal Edition.</div>
                <p class="text-[9px] uppercase tracking-widest">Designed for Heritage Enthusiasts.</p>
            </div>
        </div>
    </footer>

    <!-- CART SIDEBAR (DRAWER) -->
    <div id="cartDrawer" class="fixed inset-0 z-[100] invisible">
        <div onclick="toggleCart()" class="absolute inset-0 bg-stone-950/60 backdrop-blur-md transition-opacity duration-500"></div>
        <div class="absolute right-0 top-0 h-full w-full max-w-md bg-white cart-drawer translate-x-full flex flex-col shadow-[-20px_0_50px_rgba(0,0,0,0.1)]">
            <div class="p-8 border-b flex justify-between items-center">
                <div>
                    <h2 class="text-2xl font-bold brand-font">Your Basket</h2>
                    <p class="text-[10px] font-bold text-stone-400 uppercase tracking-widest mt-1"><?php echo $cart_count; ?> Items Selected</p>
                </div>
                <button onclick="toggleCart()" class="w-10 h-10 rounded-full border border-stone-100 flex items-center justify-center text-stone-400 hover:text-stone-900 transition">✕</button>
            </div>

            <div class="flex-1 overflow-y-auto p-8 space-y-10">
                <?php 
                $subtotal = 0;
                if(empty($_SESSION['cart'])): ?>
                    <div class="text-center py-20">
                        <div class="w-20 h-20 bg-stone-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg class="w-8 h-8 text-stone-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        </div>
                        <p class="text-stone-400 italic">Your basket is empty.</p>
                        <button onclick="toggleCart()" class="mt-6 text-[10px] font-bold uppercase tracking-widest text-[#8B0000]">Back to Shop</button>
                    </div>
                <?php else: 
                    foreach($_SESSION['cart'] as $id => $qty): 
                        $item = $products[$id];
                        $line_total = $item['price'] * $qty;
                        $subtotal += $line_total;
                ?>
                    <div class="flex gap-6 items-start">
                        <div class="w-24 h-24 bg-stone-50 rounded-2xl flex items-center justify-center p-3 flex-shrink-0">
                            <img src="<?php echo $item['img']; ?>" class="w-full h-full object-contain">
                        </div>
                        <div class="flex-1">
                            <div class="flex justify-between">
                                <h4 class="font-bold text-stone-800 brand-font text-lg leading-tight"><?php echo $item['name']; ?></h4>
                                <a href="?remove=<?php echo $id; ?>" class="text-stone-300 hover:text-[#8B0000] transition-colors">
                                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" /></svg>
                                </a>
                            </div>
                            <p class="text-[10px] text-stone-400 mt-1 uppercase font-bold tracking-widest">Quantity: <?php echo $qty; ?></p>
                            <div class="font-bold text-stone-900 text-sm mt-4 italic">₹<?php echo number_format($line_total); ?></div>
                        </div>
                    </div>
                <?php endforeach; endif; ?>
            </div>

            <?php if(!empty($_SESSION['cart'])): ?>
            <div class="p-8 bg-stone-50 border-t space-y-6">
                <div class="flex justify-between items-end">
                    <div>
                        <span class="font-bold text-stone-400 uppercase tracking-widest text-[9px] block mb-1">Estimated Total</span>
                        <span class="text-4xl font-black text-stone-900 brand-font">₹<?php echo number_format($subtotal); ?></span>
                    </div>
                    <div class="text-right text-[10px] text-stone-400 font-bold uppercase tracking-widest">
                        Incl. all taxes
                    </div>
                </div>
                <button onclick="alert('Proceeding to Secure Gateway...')" class="w-full py-6 bg-stone-900 text-white rounded-[2rem] font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-[#8B0000] transition-all shadow-xl shadow-stone-200">
                    Secure Checkout
                </button>
            </div>
            <?php endif; ?>
        </div>
    </div>

    <script>
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

        // Handle toast disappearance
        setTimeout(() => {
            const toast = document.getElementById('toast');
            if(toast) toast.style.display = 'none';
        }, 4000);
    </script>
</body>
</html>
