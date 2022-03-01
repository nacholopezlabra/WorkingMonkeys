<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once('../../Controlers/bd.php');
include_once('../../Models/result.php');

$bd = new bd();
$con = $bd->getConnection();

$inputJSON = file_get_contents('php://input');
$decoded =json_decode($inputJSON,true);
$response = new Result();
$query = "SELECT * FROM scores where id_student = '".$decoded['id_student']."' AND id_task = '".$decoded['id_task']."'";
$res = mysqli_query($con, $query);

if(mysqli_num_rows($res)==0){

    $query = "INSERT INTO scores(id_student,id_task,score) values (".$decoded['id_student'].",".$decoded['id_task'].",".$decoded['score'].")"; 
    $res = mysqli_query($con,$query);
    
    $response->resultado='OK';
$response->mensaje ='SCORE CREADO EXITOSAMENTE';
$response->data=1;
echo json_encode($response);
} else if(mysqli_num_rows($res)==0){
    $response->resultado = 'ERROR';
    $response->mensaje = 'NO SE HAN CREADO SCORES';
    $response->data = 104;
    echo json_encode($response);

}

?>