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
echo $decoded['id_teacher'];
$response = new Result();

$query = "SELECT * FROM tasks where name = '".$decoded['name']."' AND id_ranking = '".$decoded['id_ranking']."'";
$res = mysqli_query($con,$query);

if(mysqli_num_rows($res) == 0){
    $query = "UPDATE `tasks` SET name= '".$decoded['name']."' WHERE id_task = '".$decoded['id_task']."'";
    $res = mysqli_query($con,$query);
    if($res){
        $response->resultado = 'OK';
        $response->mensaje = 'SE HA MODIFICADO LA TASCA EXITOSAMENTE';
        $response->data = 3;
        echo json_encode($response);
    }
    
}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'NO SE HA MODIFICADO CORRECTAMENTE';
    $response->data = 1;
    echo json_encode($response);
}


?>