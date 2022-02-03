<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include_once('../Controlers/bd.php');
$bd = new bd();
$con = $bd->getConnection();

//Coger los datos que se envian desde angular
$inputJSON = file_get_contents('php://input'); 
$decoded = json_decode($inputJSON, true);


$query = "SELECT * FROM users where id ='".$decoded['id']."'"; 
$res = mysqli_query($con, $query);

$row = $res->fetch_assoc();
if($row['password'] == $decoded['lastPassword']){
    if($decoded['newPassword'] == $decoded['repeatedNewPassword']){
        $query = "UPDATE users SET password='".$decoded['newPassword']."' where id = ".$decoded['id'];
    }
}


?>