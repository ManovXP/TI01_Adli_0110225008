<?php
function esc($s){return htmlspecialchars($s ?? '', ENT_QUOTES);}
$title = $_POST['title'] ?? '';
$description = $_POST['description'] ?? '';
$account_no = $_POST['account_no'] ?? '';
$bank = $_POST['bank'] ?? '';
$holder = $_POST['holder'] ?? '';
$quantity = $_POST['quantity'] ?? '';
$phones = $_POST['phones'] ?? '';
$emails = $_POST['emails'] ?? '';

$variant = $_POST['variant'] ?? '';
$size = $_POST['size'] ?? '';
$payment = $_POST['payment'] ?? '';
$address = $_POST['address'] ?? '';
$priceMap = ['20' => 50000, '50' => 120000, '100' => 200000];
$unitPrice = isset($priceMap[$size]) ? $priceMap[$size] : 0;
$quantity = isset($_POST['quantity']) ? (int)$_POST['quantity'] : 0;
$totalAmount = $unitPrice * $quantity;
$imgPath = '../Praktikum 2/Produk/assets/images/1.png';
if(isset($_FILES['photo']) && $_FILES['photo']['error']===UPLOAD_ERR_OK){
    $tmp = $_FILES['photo']['tmp_name'];
    $name = basename($_FILES['photo']['name']);
    $outDir = __DIR__ . '/uploads';
    if(!is_dir($outDir)) mkdir($outDir,0755,true);
    $target = $outDir . '/' . time() . '_' . $name;
    if(move_uploaded_file($tmp,$target)){
        $imgPath = 'uploads/' . basename($target);
    }
}

?>
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Hasil Pemesanan Parfum</title>
  <link rel="stylesheet" href="assets/style.css">
  <link rel="stylesheet" href="assets/output.css">
</head>
<body>
  <div class="page">
    <header class="topnav"><nav>Home | Register | Policy | About</nav></header>

    <main>
      <div class="result">
        <div class="photo"><img src="<?php echo esc($imgPath); ?>" alt="product"></div>
        <div class="info">
          <h2><?php echo esc($title ?: 'Parfum Bloom'); ?></h2>
          <div class="row"><strong>Varian :</strong> <?php echo esc($variant); ?></div>
          <div class="row"><strong>Ukuran :</strong> <?php echo esc($size); ?></div>
          <div class="row"><strong>Jumlah :</strong> <?php echo esc($quantity); ?></div>
          <div class="row"><strong>Unit Price :</strong> Rp <?php echo number_format($unitPrice,0,',','.'); ?></div>
          <div class="row"><strong>Total Amount :</strong> Rp <?php echo number_format($totalAmount,0,',','.'); ?></div>
          <div class="row"><strong>Opsi Pembayaran :</strong> <?php echo esc($payment); ?></div>
          <div class="row"><strong>Alamat :</strong> <?php echo nl2br(esc($address)); ?></div>

          <div class="pay"><button class="primary">Bayar</button></div>
        </div>
      </div>
    </main>

    <footer class="footer">&copy; 2025 Adli Abdurrahman Syah</footer>
  </div>
</body>
</html>
