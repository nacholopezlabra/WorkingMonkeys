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



$query = "UPDATE users SET nickname=".$_GET['nickname'].", mail=".$_GET['mail'].", name=".$_GET['name'].",surname=".$_GET['surname'].",center=".$_GET['center'].",birthday=".$_GET['birthday'].",image=".$_GET['image']." where ID='".$_GET['id']."'";
$res = mysqli_query($con,$query);
$response = new Result();
if($res){
    $response->resultado = 'OK';
    $response->mensaje = 'SE HA REGISTRADO EXITOSAMENTE EL USUARIO';
    
}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'NO SE HA REGISTRADO EXITOSAMENTE EL USUARIO';
     
}
    ECHO json_encode($response);



?>