<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once('../../Controlers/bd.php');
include_once('../../Models/result.php');
include_once('../../Models/ranking.php');

$bd = new bd();
$con = $bd->getConnection();

$inputJSON =  file_get_contents('php://input');
$decoded = json_decode($inputJSON,true);

$response = new Result();

$query = "SELECT * FROM tasks where name = '".$decoded['name']."' AND id_ranking = '".$decoded['id_ranking']."'";
$res = mysqli_query($con,$query);

if(mysqli_num_rows($res) == 0){
    $query = "UPDATE `task` SET name= '".$decoded['name']."', id_ranking='".$decoded['id_ranking']."' WHERE id_task='".$decoded['id_task']."'";
    $res = mysqli_query($con,$query);
    $response->resultado = 'OK';
    $response->mensaje = 'SE HA MODIFICADO LA TASCA EXITOSAMENTE';
    $response->data = 3;
    echo json_encode($response);
}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'NO SE HA MODIFICADO CORRECTAMENTE';
    $response->data = 1;
    echo json_encode($response);
}


?>