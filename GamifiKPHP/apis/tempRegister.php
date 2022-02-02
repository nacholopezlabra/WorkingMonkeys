<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

/*include_once('../Controlers/bd.php');
$bd = new bd();
$con = $bd->getConnection();
*/

$inputJSON = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR
//var_dump($json);
$_post = json_decode($inputJSON, true);
$response = array();
$response['test'] = $inputJSON;
echo json_encode($response);


//echo 16363636363;
//print_r($_post["name"]);

//var_dump($params);





?>