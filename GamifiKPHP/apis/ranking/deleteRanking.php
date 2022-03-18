<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');


include_once('../../Controlers/bd.php');
include_once('../../Models/result.php');

$bd = new bd();
$con = $bd->getConnection();

$query = "SELECT * FROM rankings where id_ranking = '".$_GET['id_ranking']."' AND id_teacher = '".$_GET['id_teacher']."'";
$res = mysqli_query($con,$query);
if(mysqli_num_rows($res) > 0){
    
    $query = "DELETE FROM rankings WHERE id_ranking=".$_GET['id_ranking']." AND id_teacher =".$_GET['id_teacher'];
    $res = mysqli_query($con,$query);
    $response = new Result();
    if($res){
        $response->resultado = 'OK';
        $response->mensaje = 'SE HA ELIMINADO EL RANKING EXITOSAMENTE';
        $response->data = 3;
        echo json_encode($response);
    }else{
        $response->resultado = 'ERROR';
        $response->mensaje = 'NO SE HA MODIFICADO CORRECTAMENTE';
        $response->data = 1;
        echo json_encode($response);
    }


}


?>   