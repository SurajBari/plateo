<?php
session_start();

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

if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];

// Handle Actions
$action = $_REQUEST['action'] ?? 'get_all';

if ($action == 'add') {
    $id = $_POST['product_id'];
    $_SESSION['cart'][$id] = ($_SESSION['cart'][$id] ?? 0) + 1;
    echo json_encode(['success' => true, 'last_added' => $products[$id]['name']]);
    exit;
}

if ($action == 'remove') {
    $id = $_GET['product_id'];
    unset($_SESSION['cart'][$id]);
    echo json_encode(['success' => true]);
    exit;
}

// Default: Return Products and Cart State
echo json_encode([
    'products' => $products,
    'cart' => $_SESSION['cart'],
    'cart_count' => array_sum($_SESSION['cart'])
]);
