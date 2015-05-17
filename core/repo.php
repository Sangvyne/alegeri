<?php
class Core_Repo{
    protected $conn;

    public function __construct(){
        $this->conn = Core_Db::getPDOConnection();
    }
}