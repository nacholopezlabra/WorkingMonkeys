<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include_once('../Controlers/bd.php');
include_once('../Models/result.php');
$bd = new bd();
$con = $bd->getConnection();

$inputJSON = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR
$decoded = json_decode($inputJSON, true);
$response = new Result();

$query = "SELECT * FROM users where password = '".$decoded['oldPass']."'";
$res = mysqli_query($con,$query);

if($res){
    $query = "UPDATE users SET password = '".$decoded['newPass']."' WHERE password = '".$decoded['oldPass'];
    $res = mysqli_query($con,$query);
    if($res){
        $response->resultado = 'OK';
        $response->mensaje = 'SE HA MODIFICADO LA CONTRASEÑA EXITOSAMENTE';
        $response->data = 3;
        echo json_encode($response);        
    }else{
        $response->resultado = 'OK';
        $response->mensaje = 'NO SE HA PODIDO MODIFICAR LA CONTRASEÑA';
        $response->data = 3;
        echo json_encode($response);
    }
}



?>
