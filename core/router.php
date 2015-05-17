<?php

class Core_Router{

    public function route(){
       if (!isset($_GET["controller"]) && !isset($_GET["action"])) {
           return array_merge(array(
               "controller" => "home",
               "action"     => "index"
           ), $_GET);
       }

       if (!isset($_GET["controller"]) || !isset($_GET["action"])){
           throw new Exception("Invalid route");
       }

       return array_merge(array(), $_GET);
    }

}