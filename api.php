<?php
session_start();
header('Content-Type: application/json');

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
        'type' => 'Earthen Tumbler',
        'price' => 249,
        'img' => 'https://5.imimg.com/data5/SELLER/Default/2021/6/MQ/NP/YI/131065961/traditional-clay-glass-500x500.jpg',
        'desc' => 'Tapered earthen glass that keeps water naturally cool with a rustic terracotta aroma.'
    ],
    'cp-03' => [
        'name' => 'Artisan Clay Cooking Pot',
        'type' => 'Traditional Clay Pot',
        'price' => 899,
        'img' => 'https://m.media-amazon.com/images/I/61SUnmFfR9L._SL1100_.jpg',
        'desc' => 'Hand-crafted clay pot for authentic slow cooking. Retains nutrients and adds an earthy flavor.'
    ],
    'bs-04' => [
        'name' => 'Royal Baishakhi Set',
        'type' => 'Full Dining Set (6pc)',
        'price' => 1899,
        'img' => 'https://m.media-amazon.com/images/I/71N8Y1p98LL._SL1500_.jpg',
        'desc' => 'A grand set for festivals: includes Thala, Glass, and 4 Bowls crafted by master artisans.'
    ]
];

if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];

$action = $_GET['action'] ?? 'get_data';

if ($action === 'add' && isset($_POST['product_id'])) {
    $id = $_POST['product_id'];
    if (isset($products[$id])) {
        $_SESSION['cart'][$id] = ($_SESSION['cart'][$id] ?? 0) + 1;
        echo json_encode(['success' => true, 'name' => $products[$id]['name']]);
    }
    exit;
}

if ($action === 'remove' && isset($_POST['product_id'])) {
    unset($_SESSION['cart'][$_POST['product_id']]);
    echo json_encode(['success' => true]);
    exit;
}

// Return store data
echo json_encode([
    'products' => $products,
    'cart' => $_SESSION['cart'],
    'cart_count' => array_sum($_SESSION['cart'])
]);
