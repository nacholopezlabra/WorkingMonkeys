<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once('../../Controlers/bd.php');
include_once('../../Models/result.php');
include_once('../../Models/task.php');

$bd = new bd();
$con = $bd->getConnection();

$inputJSON =  file_get_contents('php://input');
$decoded = json_decode($inputJSON,true);

$response = new Result();

$query = "SELECT * FROM tasks where name = '".$decoded['name']."' AND id_ranking = '".$decoded['id_ranking']."'";
$res = mysqli_query($con,$query);

if(mysqli_num_rows($res) == 0){
    $query = "INSERT INTO TASKS (name, id_ranking) values ('".$decoded['name']."','".$decoded['id_ranking']."')";
    $res = mysqli_query($con,$query);
    
    if($res){
        $query = "SELECT * FROM tasks where name = '".$decoded['name']."' AND id_ranking = '".$decoded['id_ranking']."'";
        $res = mysqli_query($con,$query);
        $row = $res->fetch_assoc();
        $query = "SELECT * from ranking_students where id_ranking = ".$decoded['id_ranking'];
        $res1 = mysqli_query($con,$query);
        while($row2 = $res1->fetch_assoc()){
            $query = "INSERT INTO scores(id_student,id_task,score) values (".$row2['id_student'].",".$row['id_task'].",0)"; 
            $res = mysqli_query($con,$query);
        }
        $response->resultado = 'OK';
        $response->mensaje = 'SE HA CREADO LA TASCA EXITOSAMENTE';
        $response->data = 3;
        echo json_encode($response);
    }
   
}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'ESTA TASCA YA EXISTE';
    $response->data = 1;
    echo json_encode($response);
}

?>