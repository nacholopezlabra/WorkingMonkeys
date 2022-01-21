<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header("Content-Type: text/html; charset-UTF 8");
header('Content-Type: application/json');
require('../Controlers/bd.php');
require('../Models/user.php');
$bd = new bd();
$con = $bd->getConnection();

$query = "SELECT * from users where 1";
$res = mysqli_query($con, $query);

$user = "wotroyer";
$pass = 1234;
class Result
{
  // $resultado;
  // $mensaje;
}

fetchResult($res,$bd);
  

function fetchResult($res,$bd){
    while ($row = $res->fetch_assoc()) {

      if ($_GET['user'] == $row["nickname"] && $_GET['pass'] == $row["password"]) {
        $response = new Result();
        $response->resultado = 'OK';
        $response->mensaje = 'SE HA LOGEADO EXITOSAMENTE EL USUARIO';
        $userData = new User();
        $userData->id = $row['id'] ;
        $userData->nickname = $row['nickname'];
        $userData->mail = $row['mail'];
        $userData->name =  $row['name'];
        $userData->surname = $row['surname'];
        $userData->center = $row['center'];
        $userData->birthday= $row['birthday'];
        $userData->userType = $row['userType'];
        $userData->image = $row['image'];
        json_encode($userData);
        $response->data = $userData;
        echo json_encode($response);
        return;
      }
  }
    $response = new Result();
    $response->resultado = 'Error';
    $response->mensaje = 'NO SE HA PODIDO LOGEAR EL USUARIO';
    echo json_encode($response);
    
  return;
}
