<?php
session_start();
header('Content-Type: application/json');

$products = [
    'bt-01' => ['name' => 'Kumartuli Heritage Thala', 'type' => 'Traditional Clay Plate', 'price' => 599, 'img' => 'https://m.media-amazon.com/images/I/51ZFsr-JbyL._SX679_.jpg', 'desc' => 'Eco-friendly hand-pressed clay plate.'],
    'kg-02' => ['name' => 'Classic Matir Glass', 'type' => 'Earthen Tumbler (Set of 2)', 'price' => 249, 'img' => 'https://5.imimg.com/data5/SELLER/Default/2021/6/MQ/NP/YI/131065961/traditional-clay-glass-500x500.jpg', 'desc' => 'Tapered earthen glass that keeps water cool.'],
    'as-03' => ['name' => 'Alpana Engraved Bowl', 'type' => 'Hand-Painted Stoneware', 'price' => 399, 'img' => 'https://m.media-amazon.com/images/I/61MvS1PAn6L._SL1000_.jpg', 'desc' => 'Deep bowl featuring hand-carved folk motifs.'],
    'bs-04' => ['name' => 'Royal Baishakhi Set', 'type' => 'Full Dining Set (6pc)', 'price' => 1899, 'img' => 'https://m.media-amazon.com/images/I/71N8Y1p98LL._SL1500_.jpg', 'desc' => 'A grand set for festivals including 4 bowls.']
];

if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];

$action = $_GET['action'] ?? '';

if ($action === 'get_data') {
    echo json_encode(['products' => $products, 'cart' => $_SESSION['cart']]);
} 

elseif ($action === 'add' && isset($_POST['id'])) {
    $id = $_POST['id'];
    $_SESSION['cart'][$id] = ($_SESSION['cart'][$id] ?? 0) + 1;
    echo json_encode(['success' => true, 'added' => $products[$id]['name']]);
} 

elseif ($action === 'remove' && isset($_POST['id'])) {
    unset($_SESSION['cart'][$_POST['id']]);
    echo json_encode(['success' => true]);
}
?>
