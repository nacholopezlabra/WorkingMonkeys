<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include_once('../../Controlers/bd.php');
include_once('../../Models/result.php');


$bd = new bd();
$con = $bd->getConnection();


$inputJSON =  file_get_contents('php://input');
$decoded = json_decode($inputJSON,true);

$response = new Result();

$query = "UPDATE rankings SET name = '".$decoded['name']."' , code= '".$decoded['code']."' WHERE id_ranking= '".$decoded['id_ranking']."'";
$res = mysqli_query($con,$query);

if($res){
    $response->resultado = 'OK';
    $response->mensaje = 'SE HA MODIFICADO EL RANKING EXITOSAMENTE';
    $query = "SELECT * FROM rankings where id_ranking = ".$decoded['id_ranking'];
    $res = mysqli_query($con,$query);
    $row = $res->fetch_assoc();

    $response->data = $row;
    echo json_encode($response);
}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'NO SE HA MODIFICADO CORRECTAMENTE';
    $response->data = 1;
    echo json_encode($response);
}






?>