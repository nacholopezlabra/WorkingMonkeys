<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: text/html; charset-UTF 8");

include_once('../Controlers/bd.php'); 
include_once('../Models/result.php');
$bd = new bd();
$con = $bd->getConnection();

$query = "SELECT * from scores";
$res = mysqli_query($con, $query);

$response = new Result();
if(mysqli_num_rows($res)>0){
$scored = array();
while ($row = $res->fetch_assoc()) {
   $scores = new score();
   $scores->id_student=$row['id_student'];
   $scores->id_task=$row['id_task'];
   $scores->score=$row['score'];

   $scored[]= json_encode($scores);
}
$response->resultado='OK';
$response->mensaje ='SCORE MOSTRADO EXITOSAMENTE';
$response->data=json_encode($scored);
echo json_encode($response);
} else if(mysqli_num_rows($res)==0){
    $response->resultado = 'ERROR';
    $response->mensaje = 'NO SE HAN ENCONTRADO RANKINGS';
    $response->data = 104;
    echo json_encode($response);

}





?>