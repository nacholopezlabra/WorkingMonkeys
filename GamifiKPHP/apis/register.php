<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: text/html; charset-UTF 8");
header('Content-Type: application/json');

require('../Controlers/bd.php');
$bd = new bd();
$con = $bd->getConnection();
class Result
{
  // $resultado;
  // $mensaje;
}

$query = "INSERT INTO users(id, nickname, mail, password, name, surname, center, birthday, userType, image) VALUES (null,".$_GET['nickname'].",".$_GET['mail'].",".$_GET['password'].",".$_GET['name'].",".$_GET['surname'].",".$_GET['center'].",".$_GET['birthday'].",".$_GET['userType'].",".$_GET['image'].")";
$res = mysqli_query($con,$query);
$response = new Result();
if($res){
    $response->resultado = 'OK';
    $response->mensaje = 'SE HA REGISTRADO EXITOSAMENTE EL USUARIO';
    
}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'NO SE HA REGISTRADO EXITOSAMENTE EL USUARIO';
    $response->data = $bd->getBDErrors();
}
    ECHO json_encode($response);


?>