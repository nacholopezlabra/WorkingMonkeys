<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once('../../Controlers/bd.php');
include_once('../../Models/result.php');
include_once('../../Models/pentabilitie.php');

$bd = new bd();
$con = $bd->getConnection();

$inputJSON =  file_get_contents('php://input');
$decoded = json_decode($inputJSON,true);

$response = new Result();

$query = "SELECT * FROM pentabilities ";
$res = mysqli_query($con,$query);

if(mysqli_num_rows($res) == 0){
    $query = "INSERT INTO pentabilities (Name, Explanation, Image) values ('".$decoded['name']."','".$decoded['explanation']."','".$decoded['image']."')";
    $res = mysqli_query($con,$query);
    
    if($res){
        $response->resultado = 'OK';
        $response->mensaje = 'SE HA CREADO LA penta EXITOSAMENTE';
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