<?php

class Model_User extends Core_Model{

    public function login($userName, $password){
        $userData = $this->repo->getUserDataForLogin($userName, $password);
        if (empty($userData)) {
            return false;
        }
        $_SESSION["user"]["username"] = $userName;
        $_SESSION["user"]["email"]    = $userData["email"];
        return true;
    }

    public function logout(){
        $_SESSION = array();
    }

}