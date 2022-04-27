<?php 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

include_once('../../Controlers/bd.php');
include_once('../../Models/result.php');
include_once('../../Models/pentabilitie.php');

$bd = new bd();
$con = $bd->getConnection();

$query = "SELECT * from pentabilities ";
$res = mysqli_query($con, $query);

$response = new Result();

if(mysqli_num_rows($res)>0){
    $pentabilitiesarray = array();
    while ($row = $res->fetch_assoc()) {
        $pentabilitie = new pentabilitie();
        $pentabilitie->id_pentabilitie = $row['Id'];
        $pentabilitie->name = $row['Name'];
        $pentabilitie->explanation = $row['Explanation'];
        $pentabilitie->image = $row['Image'];
        $pentabilitiesarray[] = $pentabilitie;
    }
    
    $response->resultado='OK';
    $response->mensaje ='PENTABILITIES MOSTRADAS EXITOSAMENTE';
    $response->data=$pentabilitiesarray;
    echo json_encode($response);
    
} else if(mysqli_num_rows($res)==0){
    $response->resultado = 'ERROR';
    $response->mensaje = 'NO SE HAN ENCONTRADO PENTABILITIES';
    $response->data = 104;
    echo json_encode($response);
}
?>