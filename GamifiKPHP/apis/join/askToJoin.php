<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once('../../Controlers/bd.php');
include_once('../../Models/result.php');

$bd = new bd();
$con = $bd->getConnection();

$inputJSON =  file_get_contents('php://input');
$decoded = json_decode($inputJSON,true);

$response = new Result();


$query = "SELECT * FROM join_status where id_student = ".$decoded['id_student']." and code = '".$decoded['code']."'";
$res = mysqli_query($con,$query);
if(!is_bool($res) && mysqli_num_rows($res) == 0){
    $query = "SELECT * FROM rankings where code = '".$decoded['code']."'";
    $res = mysqli_query($con,$query);
    if(!is_bool($res) && mysqli_num_rows($res)>0){
        $row = $res->fetch_assoc();
        $query = "INSERT INTO join_status (id_teacher, id_student, code, status) values ('".$row['id_teacher']."','".$decoded['id_student']."','".$decoded['code']."',0)";
        $res = mysqli_query($con,$query);
        if($res){
            $response->resultado = 'OK';
            $response->mensaje = 'SE LE HA PEDIDO AL PROFESOR QUE LE DEJE UNIRSE EXITOSAMENTE';
            $response->data = 3;
    
            
        }else{
            $response->resultado = 'ERROR';
            $response->mensaje = 'NO SE LE HA PEDIDO AL PROFESOR QUE LE DEJE UNIRSE EXITOSAMENTE';
            $response->data = 1;
        }
    }

}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'USTED YA HA PEDIDO UNIRSE A ESTE RANKING';
    $response->data = 2;
}

echo json_encode($response);

?>