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

$response = new Result();

if(mysqli_num_rows($res)>0){
    $taskboard = array();
    while ($row = $res->fetch_assoc()) {
    $task = new task();
    $task->id_task = $row['id_task'];
    $task->name = $row['name'];
    $task->id_ranking = $row['id_ranking'];
    $taskboard[] = $task;
    }
    
    $response->resultado='OK';
    $response->mensaje ='TAREAS MOSTRADAS EXITOSAMENTE';
    $response->data=$taskboard;
    echo json_encode($response);
    
} else if(mysqli_num_rows($res)==0){
    $response->resultado = 'ERROR';
    $response->mensaje = 'NO SE HAN ENCONTRADO TAREAS';
    $response->data = 104;
    echo json_encode($response);
}
?>