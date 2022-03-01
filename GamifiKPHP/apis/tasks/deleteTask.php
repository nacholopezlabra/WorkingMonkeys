<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once('../../Controlers/bd.php');
include_once('../../Models/result.php');
include_once('../../Models/ranking.php');

$bd = new bd();
$con = $bd->getConnection();

$query = "SELECT * FROM tasks where name ='".$decoded['name']."' AND id_ranking = ".$decoded['id_ranking'];
$res = mysqli_query($con,$query);

if(mysqli_num_rows($res) > 0){
    
    $queRy = "DELETE FROM tasks WHERE id_task=".$_GET['id_task'];
    $res = mysqli_query($con,$query);
    $response = new Result();
    if($res){
        $response->resultado = 'OK';
        $response->mensaje = 'SE HA ELIMINADO LA TASCA EXITOSAMENTE';
        $response->data = 3;
        echo json_encode($response);
    }else{
        $response->resultado = 'ERROR';
        $response->mensaje = 'NO SE HA BORRADO CORRECTAMENTE';
        $response->data = 1;
        echo json_encode($response);
    }
}
?>