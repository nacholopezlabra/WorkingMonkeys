<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once("../../Models/result.php");
include_once("../../Controlers/bd.php");


$bd = new bd();
$con = $bd->getConnection();
class request{}
$response = new Result();
$query = "SELECT * from join_status where id_teacher =".$_GET['id']." and status = 0";
$res = mysqli_query($con,$query);
$return = array();
$req = new request();
if(!is_bool($res) && mysqli_num_rows($res)){
    while($row = $res->fetch_assoc()){
       
        $req->id = $row['id'];
        $req->id_teacher = $row['id_teacher'];
        $req->code = $row['code'];
        $req->status = $row['status'];
        $query = "SELECT * FROM users where id = ".$row['id_student'];
        $result = mysqli_query($con,$query);
        $row2 = $result->fetch_assoc();
        $req->studentNickname = $row2['nickname'];
        $req->studentName = $row2['name'];
        $req->studentSurname = $row2['surname'];
        $query2 = "SELECT * FROM rankings where code = '".$row['code']."'";
        $res2 = mysqli_query($con,$query2);
        $row3 = $res2->fetch_assoc();
        $req->rankingName = $row3['name'];
        $return[] = $req;
    }
    $response->resultado = 'OK';
    $response->mensaje = 'SE HAN ENCONTRADO PETICIONES EXITOSAMENTE';
    $response->data = $return;
    echo json_encode($response);
}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'NO SE HAN ENCONTRADO PETICIONES';
    $response->data = 1;
    echo json_encode($response);
}


?>