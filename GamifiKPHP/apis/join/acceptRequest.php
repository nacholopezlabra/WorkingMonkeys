<?php


header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("../../Models/result.php");
include_once("../../Controlers/bd.php");

$bd = new bd();
$con = $bd->getConnection();
$response = new Result();

$query = "SELECT * FROM join_status where id = ".$_GET['id'];
$res = mysqli_query($con,$query);

if($res){
    $row = $res->fetch_assoc();
    if($_GET['status'] == 1){
        $query = "SELECT * FROM rankings WHERE code = ".$row['code'];
        $res = mysqli_query($con,$query);
        $row2 = $res->fetch_assoc();
        if(!is_bool($res) && !empty($row2)){
            $query = "SELECT * FROM ranking_students WHERE id_student = ".$row['id_student']." AND id_ranking = ".$row2['id_ranking'];
            $res = mysqli_query($con,$query);
            if(!$res || mysqli_num_rows($res) == 0){
                $query = "INSERT INTO ranking_students(id_ranking,id_student) VALUES (".$row2['id_ranking'].",".$row['id_student'].")";
                $res = mysqli_query($con,$query);
                if($res){
                    $query = "SELECT * FROM tasks where id_ranking = ".$row2['id_ranking'];
                    $res = mysqli_query($con,$query);
                    while($row3 = $res->fetch_assoc()){
                        $query = "INSERT INTO scores(id_student,id_task,score) values (".$row['id_student'].",".$row3["id_task"].",0)";
                        $result = mysqli_query($con,$query);
                    }
                    $query = "UPDATE join_status SET status = 1 where id =".$_GET['id'];
                    $res = mysqli_query($con,$query);
                    $response->resultado = 'OK';
                    $response->mensaje = 'SE HA AÑADIDO EL USUARIO EXITOSAMENTE DEL RANKING';
                    $response->data = 3;
                }else{
                    $response->resultado = 'ERROR';
                    $response->mensaje = 'NO SE HA AÑADIDO EL USUARIO EXITOSAMENTE DEL RANKING';
                    $response->data = 2;
                }
            }else{
                $response->resultado = 'ERROR';
                $response->mensaje = 'EL USUARIO YA EXISTE EN EL RANKING';
                $response->data = 1;
            }
        }else{
            $response->resultado = 'ERROR';
            $response->mensaje = 'EL CODIGO NO EXISTE';
            $response->data = 4;
        }
    }else{
        $query = "UPDATE join_status SET status = 2 where id =".$_GET['id'];
        $res = mysqli_query($con,$query);
        $response->resultado = 'OK';
        $response->mensaje = 'SE HA RECHAZADO AL USUARIO EXITOSAMENTE DEL RANKING';
        $response->data = 3;
    }
    echo json_encode($response);
}

?>