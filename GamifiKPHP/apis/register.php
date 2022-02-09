<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include_once('../Controlers/bd.php');
include_once('../Models/result.php');
$bd = new bd();
$con = $bd->getConnection();

$inputJSON = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR
$decoded = json_decode($inputJSON, true);


date_default_timezone_set('America/Los_Angeles');
$bdate=$decoded['birthday'];
$bdate=date("Y-m-d", strtotime($bdate));




$response = new Result();
$query = "SELECT * FROM users where nickname = '" .$decoded['nickname']."'";
$res = mysqli_query($con,$query);

if(mysqli_num_rows($res) == 0){
    $query ="SELECT * FROM users where mail ='".$decoded['mail']."'";
    $res = mysqli_query($con,$query);
    if(mysqli_num_rows($res) == 0){
        $query = "INSERT INTO users(id, nickname, mail, password, name, surname, center, birthday, userType, image) VALUES (null, '".$decoded['nickname']."','".$decoded['mail']."','".$decoded['password']."','".$decoded['name']."','".$decoded['surname']."','".$decoded['center']."','".$bdate."',".$decoded['userType'].",'".$decoded['image']."')";
        $res = mysqli_query($con,$query);
        if($res){
            $response->resultado = 'OK';
            $response->mensaje = 'SE HA REGISTRADO EXITOSAMENTE EL USUARIO';
            $response->data = 3;
            
        }else{
            $response->resultado = 'ERROR';
            $response->mensaje = 'NO SE HA REGISTRADO EXITOSAMENTE EL USUARIO';
            $response->data = $bd->getBDErrors();
        }
    
    }else{
        $response->resultado = 'ERROR';
        $response->mensaje = 'EL CORREO YA ESTA EN USO';
        $response->data = 2;
    }

    
}else{
    $response->resultado = 'ERROR';
    $response->mensaje = 'EL USUARIO YA EXISTE';
    $response->data = 1;
}

   ECHO json_encode($response);


?>