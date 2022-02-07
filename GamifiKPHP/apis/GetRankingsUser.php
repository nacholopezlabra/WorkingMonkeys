<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once('../Controlers/bd.php');
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
    while ($row = $res->fetch_assoc()) {  
        $response = new Result();
        $response->resultado = 'OK';
        $response->mensaje = 'RANKINGS RECOGIDOS CORRECTAMENTE';
        $response->data = 0;
        
        $query2 = "SELECT * from rankings where id_ranking=".$row['id_ranking'];
        $res2 = mysqli_query($con, $query);
        $rankingData = new Ranking();
        $rankingData->id = $row['id'];
        $rankingData->name = $row['name'];
        $rankingData->code = $row['code'];
        json_encode($rankingData);
        $response->data = $rankingData;
        echo json_encode($response);
               
    }
}

class Result
{
  // $resultado;
  // $mensaje;

}


?>