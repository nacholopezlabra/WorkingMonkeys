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

$query = "SELECT * FROM rankings where code ='".$decoded['code']."'";
$res = mysqli_query($con,$query);

if (mysqli_num_rows($res) == 0) {

        $query = "SELECT * FROM rankings where name ='".$decoded['name']."' AND id_teacher = '".$decoded['id_teacher']."'";
        $res = mysqli_query($con,$query);
        if(mysqli_num_rows($res) == 0){
            //todo
            $query = "INSERT INTO rankings(name,id_teacher,code, image) values ('".$decoded['name']."' ,".$decoded['id_teacher'].",'".$decoded['code']."', '".$decoded['image']."')";
            $res = mysqli_query($con,$query);
            $response->resultado = 'OK';
            $response->mensaje = 'SE HA CREADO EL RANKING EXITOSAMENTE';
            $response->data = 3;
            echo json_encode($response);
        }else{
            $response->resultado = 'ERROR';
            $response->mensaje = 'ESTE RANKING YA EXISTE';
            $response->data = 1;
            echo json_encode($response);
        }
}
else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'EL CODIGO DEL RANKING YA ESXITE';
    $response->data = 2;
    echo json_encode($response);
}
?>
