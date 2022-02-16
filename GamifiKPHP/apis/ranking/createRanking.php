<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");


include_once('../../Controlers/bd.php');
include_once('../../Models/result.php');


$bd = new bd();
$con = $bd->getConnection();


$inputJSON =  file_get_contents('php://input');
$decoded = json_decode($inputJSON,true);



$query = "SELECT * FROM rankings where name ='".$decoded['name']."' AND id_teacher = ".$decoded['id_teacher'];
$res = mysqli_query($con,$query);

if(mysqli_num_rows($res) == 0){
    //todo
    $query = "INSERT INTO rankings(name,id_teacher,code) values (".$decoded['name'].",".$decoded['id_teacher'].",".$decoded['code'].")";
    $res = mysqli_query($con,$query);
}





?>