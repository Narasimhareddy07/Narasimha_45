<?php
session_start();
include 'connect.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTINS');
header('Access-Control-Allow-Headers: Origin,Content-Type,X-Auth-Token');
$data = json_decode(file_get_contents("php://input"));

$phone = $data->phone;

$sql = "select * from requests where phone='" . $phone . "'";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));

$output = array();

if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        $output[] = $row;
    }
} else {
    $output = [0];
}

echo json_encode($output);

mysqli_close($con);
