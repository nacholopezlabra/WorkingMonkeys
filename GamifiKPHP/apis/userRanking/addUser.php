<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//$_GET["id_ranking"];
//$_GET["id_user"];

include_once("../../Models/result.php");
include_once("../../Controlers/bd.php");
$bd = new bd();
$con = $bd->getConnection();

$response = new Result();

$query = "SELECT * FROM ranking_students WHERE id_student = ".$_GET['id_user']." AND id_ranking = ".$_GET['id_ranking'];
$res = mysqli_query($con,$query);

if(mysqli_num_rows($res) == 0){
    $query = "INSERT INTO ranking_students(id_ranking,id_student) VALUES (".$_GET['id_ranking'].",".$_GET['id_student'].")";
    $res = mysqli_query($con,$query);
    if($res){
        $response->resultado = 'OK';
        $response->mensaje = 'SE HA AÑADIDO EL USUARIO EXITOSAMENTE';
        $response->data = 3;
        echo json_encode($response);
    }else{
        $response->resultado = 'ERROR';
        $response->mensaje = 'NO SE HA AÑADIDO EL USUARIO EXITOSAMENTE';
        $response->data = 2;
        echo json_encode($response);
    }
    
}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'EL USUARIO YA EXISTE';
    $response->data = 1;
    echo json_encode($response);
}


?>