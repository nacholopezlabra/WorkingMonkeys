<?php

header("Content-Type: text/html;charset=utf-8");

class bd{
    
    private $servidor="localhost";
    private $usuario="root";
    private $contraseña="usbw";
    private $bd="gamifiK";
    private $con;

    function __construct(){
        $this->setConnection();
    }
    
    function setConnection(){
    
        $this->con = mysqli_connect($this->servidor,$this->usuario,$this->contraseña,$this->bd);
        if(!$this->con)
        {
            die("Con se ha podido realizar la conexión: ". mysqli_connect_error() . "<br>");
        }
        else
        {
            mysqli_set_charset( $this->con,"utf8");
        }
    
    }
    
    function getConnection(){
        return $this->con;
    }


    function getBDErrors(){
        return mysqli_error($this->con);
    }


}

?>