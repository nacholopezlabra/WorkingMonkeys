<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: text/html; charset-UTF 8");
header('Content-Type: application/json');

include_once('../../Controlers/bd.php');
include_once('../../Models/result.php');
$bd = new bd();
$con = $bd->getConnection();
$inputJSON = file_get_contents('php://input'); 
$decoded = json_decode($inputJSON, true);


$query = "SELECT * FROM users where mail = '".$decoded['mail']."'";
$res = mysqli_query($con,$query);
$response = new Result();
if($res){
    $query = "UPDATE users SET mail = '".$decoded['mail']."', name = '".$decoded['name']."',surname = '".$decoded['surname']."' ,image = '".$decoded['image']."' where ID = '".$decoded['id']."'";
    $res = mysqli_query($con,$query);
    
    if($res){
        $response->resultado = 'OK';
        $response->mensaje = 'SE HA REGISTRADO EXITOSAMENTE EL USUARIO';
        $response->data = 1;
    }else{
        $response->resultado = 'ERROR';
        $response->mensaje = 'NO SE HA REGISTRADO EXITOSAMENTE EL USUARIO';
        $response->data = 2;     
    }
}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'EL CORREO YA ESTA EN USO';
    $response->data = 3;
}

    ECHO json_encode($response);



?>