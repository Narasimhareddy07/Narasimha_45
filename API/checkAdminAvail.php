<?php
session_start();
include 'connect.php';
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTINS');
header('Access-Control-Allow-Headers: Origin,Content-Type,X-Auth-Token');
$data=json_decode(file_get_contents("php://input"));

$user=$data->user;

$sql="select * from creds where username='".$user."' and type='admin'";
$result=mysqli_query($con,$sql) or die(mysqli_error($con));

$output = [0];

if(mysqli_num_rows($result) > 0){
    $output = [1];
}else{
    $output = [0];   
}

echo json_encode($output);

mysqli_close($con);

?>