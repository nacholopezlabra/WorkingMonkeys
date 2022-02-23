<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json');


include_once('../../Controlers/bd.php');
include_once('../../Models/result.php');


$bd = new bd();
$con = $bd->getConnection();

$query = "SELECT * FROM scores where id_student=".$_GET['id_student']."AND id_task=".$_GET['id_task'];
$res = mysqli_query($con,$query);

if(mysqli_num_rows($res) > 0){
    
    $queRy = "DELETE FROM scores WHERE id_student=".$_GET['id_student']."AND id_task =".$_GET['id_task'];
    $res = mysqli_query($con,$query);
    $response = new Result();
    if($res){
        $response->resultado = 'OK';
        $response->mensaje = 'SE HA ELIMINADO EL SCORE EXITOSAMENTE';
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