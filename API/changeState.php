<?php
include "connect.php";
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,POST,PATCH,PUT,DELETE,OPTINS');
header('Access-Control-Allow-Headers: Origin,Content-Type,X-Auth-Token');
$data = json_decode(file_get_contents("php://input"));
$state = $data->state;
$id = $data->id;

$sql = "update requests set status='" . $state . "' where id='" . $id . "'";
$res = mysqli_query($con, $sql) or die(mysqli_error($con));
if ($res) {
    if ($state > 0) {
        echo "Request Approved";
    } elseif ($state < 0) {
        echo "Request Declined";
    }
} else {
    echo "There was a problem in sending the request. Try again Later";
}
mysqli_close($con);
