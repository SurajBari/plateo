<?php
session_start();
header('Content-Type: application/json');

$products = [
    'plate-01' => [
        'name' => 'Artisan Terracotta Thala',
        'type' => 'Hand-Pressed Clay Plate',
        'price' => 599,
        'img' => 'https://i.ibb.co/v4m8YmC/clay-plate-vector.png', // Vector-style representation
        'desc' => 'Eco-friendly, naturally seasoned clay plate for an authentic dining experience.'
    ],
    'glass-02' => [
        'name' => 'Vedic Clay Tumbler',
        'type' => 'Earthen Water Glass',
        'price' => 249,
        'img' => 'https://i.ibb.co/L6xMh9V/clay-glass-vector.png', // Vector-style representation
        'desc' => 'Porous earthen glass that keeps water naturally cool with a rustic aroma.'
    ],
    'pot-03' => [
        'name' => 'Heritage Handi Pot',
        'type' => 'Traditional Clay Pot',
        'price' => 899,
        'img' => 'https://i.ibb.co/mS79z7Y/clay-pot-vector.png', // Vector-style representation
        'desc' => 'Slow-cooking clay pot designed to retain nutrients and add earthy flavor.'
    ],
    'set-04' => [
        'name' => 'Bengal Craft Set',
        'type' => 'Complete Dining Set',
        'price' => 1699,
        'img' => 'https://i.ibb.co/v4m8YmC/clay-plate-vector.png',
        'desc' => 'A curated collection of our finest plate, glass, and cooking pot.'
    ]
];

if (!isset($_SESSION['cart'])) $_SESSION['cart'] = [];

$action = $_GET['action'] ?? 'get_data';

if ($action === 'add' && isset($_POST['product_id'])) {
    $id = $_POST['product_id'];
    $_SESSION['cart'][$id] = ($_SESSION['cart'][$id] ?? 0) + 1;
    echo json_encode(['success' => true, 'name' => $products[$id]['name']]);
    exit;
}

if ($action === 'remove' && isset($_POST['product_id'])) {
    $id = $_POST['product_id'];
    unset($_SESSION['cart'][$id]);
    echo json_encode(['success' => true]);
    exit;
}

echo json_encode([
    'products' => $products,
    'cart' => $_SESSION['cart'],
    'cart_count' => array_sum($_SESSION['cart'])
]);
