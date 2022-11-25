<?php
header('Content-Type: text/html; charset=utf-8');

$dbhost = "localhost";
$dbuser = "root";
$dbpass = "dance053508384";
$dbname = "hebrew_uni";


$conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
if (mysqli_connect_error()) {
  die("can't connect");
}
$conn->query("SET NAMES 'utf8'");
