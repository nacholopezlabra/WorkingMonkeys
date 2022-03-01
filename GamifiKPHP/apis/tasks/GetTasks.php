<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once('../../Controlers/bd.php');
include_once('../../Models/result.php');
include_once('../../Models/task.php');

$bd = new bd();
$con = $bd->getConnection();

$query = "SELECT * from tasks where id_ranking='".$_GET['id_ranking']."'";
$res = mysqli_query($con, $query);

if (mysqli_num_rows($res) == 0) {
    $response = new Result();
    $response->resultado = 'ERROR';
    $response->mensaje = 'TAREAS NO ENCONTRADOS O EL RANKING NO TIENE';
    $response->data = 1;
    echo json_encode($response);
}
else {
    $array = array();
        while ($row = $res->fetch_assoc()) {
            $taskData = new task();
            $taskData->id_task = $row['id_task'];
            $taskData->name = $row['name'];
            $taskData->id_ranking = $_GET['id_ranking'];
            $array[] = $taskData;
        } 
        $response = new Result();
        $response->resultado = 'OK';
        $response->mensaje = 'TAREAS RECOGIDAS CORRECTAMENTE'; 
        $response->data = $array;
        echo json_encode($response);
    }
?>