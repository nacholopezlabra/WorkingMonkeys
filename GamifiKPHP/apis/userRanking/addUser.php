<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

//$_GET["id_ranking"];
//$_GET["id_user"];

include_once("../../Models/result.php");
include_once("../../Controlers/bd.php");
$bd = new bd();
$con = $bd->getConnection();

$response = new Result();

$query = "SELECT * FROM rankings WHERE code = '".$_GET['code']."'";
$res = mysqli_query($con,$query);
$row = $res->fetch_assoc();
echo $row['code'];
if(!is_bool($res) && !empty($row)){
    $row = $res->fetch_assoc();
    $query = "SELECT * FROM ranking_students WHERE id_student = ".$_GET['id_user']." AND id_ranking = ".$row['id_ranking'];
    $res = mysqli_query($con,$query);
    
    if(mysqli_num_rows($res) == 0){
        $query = "INSERT INTO ranking_students(id_ranking,id_student) VALUES (".$row['id_ranking'].",".$_GET['id_user'].")";
        $res = mysqli_query($con,$query);
        if($res){
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
echo json_encode($response);



?>