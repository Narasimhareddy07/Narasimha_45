<?php
session_start();
include 'connect.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTINS');
header('Access-Control-Allow-Headers: Origin,Content-Type,X-Auth-Token');

$sql = "select * from users";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));

$output = array();
$c=0;

$output[$c] = mysqli_num_rows($result);
$c++;

$sql = "select * from requests where status='1'";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));

$output[$c] = mysqli_num_rows($result);
$c++;

$sql = "select * from requests where status='0'";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));

$output[$c] = mysqli_num_rows($result);
$c++;

$sql = "select * from requests where status='-1'";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));

$output[$c] = mysqli_num_rows($result);
$c++;

echo json_encode($output);

mysqli_close($con);
