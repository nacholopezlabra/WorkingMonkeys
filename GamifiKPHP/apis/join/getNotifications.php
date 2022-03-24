<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("../../Models/result.php");
include_once("../../Controlers/bd.php");
$bd = new bd();
$con = $bd->getConnection();
$response = new Result();

//$_GET['id_user']

class info{};
$query = "SELECT * from join_status where id_student = ".$_GET['id_user']." and status > 0 ORDER BY id desc";
$res = mysqli_query($con,$query);
$data = array();
if($res){
    while($row = $res->fetch_assoc()){
    
        $info = new info();
        $query = "SELECT * from rankings where code = ".$row['code'];
        $res2 = mysqli_query($con,$query);
        $row2 = $res2->fetch_assoc();
        $info->id = $row['id'];
        $info->rankingName = $row2['name'];
        $info->status = $row['status'];
        $data[] = $info;
    } 
    $response->resultado = 'OK';
    $response->mensaje = 'SE HAN CARGADO LAS NOTIFICACIONES EXITOSAMENTE';
    $response->data= $data;
    echo json_encode($response);
}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'NO SE HAN CARGADO LAS NOTIFICACIONES EXITOSAMENTE';
    $response->data = 1;
    echo json_encode($response);
}


?>