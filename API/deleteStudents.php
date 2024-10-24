<?php
require_once 'connect.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTINS');
header('Access-Control-Allow-Headers: Origin,Content-Type,X-Auth-Token');
$data = json_decode(file_get_contents("php://input"));
$phone = $data->phone;

$output = 0;

$sql = "delete from creds where username='" . $phone . "'";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));

if ($result) {
    $output = 1;
}

$sql = "delete from users where phone='" . $phone . "'";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));

if ($result) {
    $output = 1;
}

$sql = "delete from requests where phone='" . $phone . "'";
$result = mysqli_query($con, $sql) or die(mysqli_error($con));

if ($result) {
    $output = 1;
}

if($result == 1)
{
    echo "Student Removed";
}
else
{
    echo "An error occured while deleting the student";
}

mysqli_close($con);
