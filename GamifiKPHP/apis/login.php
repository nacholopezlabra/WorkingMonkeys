<?php
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  require('../Controlers/bd.php');
  $bd = new bd();
  $con = $bd->getConnection();

  $query = "SELECT * from users where 1";
  $res = mysqli_query($con,$query);

  $user = "wotroyer";
  $pass = 1234;
  class Result {
    // $resultado;
    // $mensaje;
   }
  while($row = $res->fetch_assoc()){
    if($_GET['user'] == $row["nickname"] && $_GET['pass'] == $row["password"]){
      $response = new Result();
      $response->resultado = 'OK';
      $response->mensaje = 'SE HA LOGEADO EXITOSAMENTE EL USUARIO';
      $response->data ="1";

      header('Content-Type: application/json');

      echo json_encode($response);
    }else{
      $response = new Result();
      $response->resultado = 'Error';
      $response->mensaje = 'NO SE HA PODIDO LOGEAR EL USUARIO';
      $response->data ="0";
        
      header('Content-Type: application/json');
        
      echo json_encode($response);
    }
  }

?>