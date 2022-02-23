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
    $query = " DELETE FROM ranking_students WHERE id_student = ".$_GET['id_user']." AND id_ranking = ".$_GET['id_ranking'];
    //DELETE FROM rankings WHERE id_ranking=".$_GET['id_ranking']."AND id_teacher =".$_GET['id_teacher']
    $res = mysqli_query($con,$query);
    if($res){
        $response->resultado = 'OK';
        $response->mensaje = 'SE HA BORRADO EL USUARIO EXITOSAMENTE DEL RANKING';
        $response->data = 3;
        echo json_encode($response);
    }else{
        $response->resultado = 'ERROR';
        $response->mensaje = 'NO SE HA BORRADO EL USUARIO EXITOSAMENTE DEL RANKING';
        $response->data = 2;
        echo json_encode($response);
    }
    
}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'EL USUARIO NO EXISTE EN ESTE RANKING';
    $response->data = 1;
    echo json_encode($response);
}

?>