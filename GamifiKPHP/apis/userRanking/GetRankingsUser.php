<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once('../Controlers/bd.php');
include_once('../Models/result.php');
include_once('../Models/ranking.php');

$bd = new bd();
$con = $bd->getConnection();

$query = "SELECT * from ranking_students where id_student='".$_GET['id']."'";
$res = mysqli_query($con, $query);

if (mysqli_num_rows($res) == 0) {
    $response = new Result();
    $response->resultado = 'ERROR';
    $response->mensaje = 'RANKINGS NO ENCONTRADOS O EL USUARIO NO TIENE';
    $response->data = 1;
    echo json_encode($response);
}
else {
    $array =  array();
    while ($row = $res->fetch_assoc()) {          
        $query = "SELECT * from rankings where id_ranking=".$row['id_ranking'];
        $res = mysqli_query($con, $query);
        while ($row = $res->fetch_assoc()) {  
            $rankingData = new ranking();
            $rankingData->id_ranking = $row['id_ranking'];
            $rankingData->name = $row['name'];
            $rankingData->code = $row['code'];
            $array[] = $rankingData;
        }
    }  
        $response = new Result();
        $response->resultado = 'OK';
        $response->mensaje = 'RANKINGS RECOGIDOS CORRECTAMENTE'; 
        $response->data = $array;
        echo json_encode($response);
    }
?>
      