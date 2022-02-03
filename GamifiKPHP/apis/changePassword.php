<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include_once('../Controlers/bd.php');
$bd = new bd();
$con = $bd->getConnection();

//Coger los datos que se envian desde angular
$inputJSON = file_get_contents('php://input'); 
$decoded = json_decode($inputJSON, true);

class Result
{
  // $resultado;
  // $mensaje;
}
$response = new Result();


$query = "SELECT * FROM users where id ='".$decoded['id']."'"; 
$res = mysqli_query($con, $query);

$row = $res->fetch_assoc();
if($row['password'] == $decoded['lastPassword']){
    if($decoded['newPassword'] == $decoded['repeatNewPassword']){
        $query = "UPDATE users SET password='".$decoded['newPassword']."' where id = ".$decoded['id'];
        $res = mysqli_query($con,$query);
        if($res){
            $response->resultado = 'OK';
            $response->mensaje = 'SE HA CAMBIADO LA CONTRASEÑA EXITOSAMENTE';
            $response->data = 3;
            
        }else{
            $response->resultado = 'ERROR';
            $response->mensaje = 'NO SE HA CAMBIADO LA CONTRASEÑA EXITOSAMENTE';
            $response->data = $bd->getBDErrors();
        }
    }else{
        $response->resultado = 'ERROR';
        $response->mensaje = 'LAS CONTRASEÑAS NO CONCUERDAN';
        $response->data = 2;
    }
}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'LA CONTRASEÑA VIEJA NO CONCUERDA';
    $response->data = 1;
}

ECHO json_encode($response);

?>