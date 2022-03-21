<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: text/html; charset-UTF 8");
header('Content-Type: application/json');

include_once('../../Controlers/bd.php');
include_once('../../Models/ranking.php');
include_once('../../Models/result.php');
$bd = new bd();
$con = $bd->getConnection();


$query = "SELECT * from rankings where id_teacher=".$_GET['id'];
$res = mysqli_query($con, $query);




$response = new Result();
if(mysqli_num_rows($res)>0){
    $leaderboard = array();
    while ($row = $res->fetch_assoc()) {
    $rank = new ranking();
    $rank->id_ranking = $row['id_ranking'];
    $rank->name = $row['name'];
    $rank->id_teacher = $row['id_teacher'];
    $rank->code = $row['code'];
    
    $leaderboard[] = $rank;
    }
    
    $response->resultado='OK';
    $response->mensaje ='RANKING MOSTRADO EXITOSAMENTE';
    $response->data=$leaderboard;
    echo json_encode($response);
    
} else if(mysqli_num_rows($res)==0){
    $response->resultado = 'ERROR';
    $response->mensaje = 'NO SE HAN ENCONTRADO RANKINGS';
    $response->data = 104;
    echo json_encode($response);
}

?>