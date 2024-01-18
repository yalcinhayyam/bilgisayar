<?php

/**
 * Önemli yerleri !!!! ile işaretledim
 */


// 3. soru ->  fopen , w

// 4. soru yazma önceki datayı tamamen siler, ekleme modu var olanın devamına ekleme yapar


// dat dosyasını okuma ve içindeki 'kalem' kelimesi sayısını bulma 
$dosya_adi = 'data.dat';
$dosya = fopen($dosya_adi, 'r');
$metin = fread($dosya, filesize($dosya_adi));

// RegEx kodu
$kelime_sayisi = preg_match_all("/kalem/i",  $metin); // !!!!!! 
echo $kelime_sayisi;



// Sql ilk kaydı silme 
$sql = "DELETE FROM items ORDER BY id LIMIT 1"; // !!!!!!

$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_dbname";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


if ($conn->query($sql) === TRUE) {
    echo "Record deleted successfully";
} else {
    echo "Error deleting record: " . $conn->error;
}


// veriler adlı tablodan istenilen alanları listeleme işlemi

$sql = "SELECT id, zaman, personel_adi, personel_no FROM veriler"; // !!!!!!!!!

$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_dbname";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // !!!!!!!!!!!!!!!!!!!!!!
    while ($row = $result->fetch_assoc()) {
        echo "ID: " . $row["id"] . " | Zaman: " . $row["zaman"] . " | Personel Adı: " . $row["personel_adi"] . " | Personel No: " . $row["personel_no"] . "<br>";
    }
    // !!!!!!!!!!!!!!!!!!!!!!
} else {
    echo "0 results";
}

$conn->close();



// Form Get metodundan eklme işlemi
$servername = "your_servername";
$username = "your_username";
$password = "your_password";
$dbname = "your_dbname";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_GET['zaman']) && isset($_GET['personel_adi']) && isset($_GET['personel_no'])) {
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    $zaman = $conn->$_GET['zaman'];
    $personel_adi = $conn->$_GET['personel_adi'];
    $personel_no = $conn->$_GET['personel_no'];
    $sql = "INSERT INTO veriler (zaman, personel_adi, personel_no) VALUES ('$zaman', '$personel_adi', '$personel_no')";
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    
    
    if ($conn->query($sql) === TRUE) {
        echo "New record added successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Incomplete data in the GET request";
}

$conn->close();



