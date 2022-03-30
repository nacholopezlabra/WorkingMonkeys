<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("../../Models/result.php");
include_once("../../Controlers/bd.php");
$bd = new bd();
$con = $bd->getConnection();
$response = new Result();

// $_GET['id'];

$query = "SELECT * FROM join_status where id = ".$_GET['id'];
$res = mysqli_query($con,$query);

if(!is_bool($res) && mysqli_num_rows($res) == 1){
    $query = "DELETE FROM join_status where id = ".$_GET['id'];
    $res = mysqli_query($con,$query);
    if($res){
        $response->resultado = 'OK';
        $response->mensaje = 'SE HA ELIMINADO LA NOTIFICACION EXITOSAMENTE';
        $response->data = 3;
    }else{
        $response->resultado = 'ERROR';
        $response->mensaje = 'NO SE HA ELIMINADO LA NOTIFICACION CORRECTAMENTE';
        $response->data = 1;
    }
}
echo json_encode($response);

?>