<?php

$mysqli = new mysqli('localhost', 'root', '', 'data');
if ($mysqli->connect_errno != 0) {
    echo $mysqli->connect_error;
}

$json_data = file_get_contents("products.js");
$products = json_decode($json_data, JSON_OBJECT_AS_ARRAY);