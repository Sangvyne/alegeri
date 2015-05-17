<?php

class Controller_Users extends Core_Controller{

    public function registerAction(){

    }

    public function loginAction(){
        if (!isset($_POST["username"]) && !isset($_POST["password"]) || !$this->services->get("Model_User")->login()){
            $_SESSION["error"] = "Invalid username or password";
            header("Location: /");
            return;
        }
        $_SESSION["success"] = "You have successfully logged in";
    }

    public function logoutAction(){
        $this->services->get("Model_User")->logout();
        $_SESSION["success"] = "You have successfully logged out";
        header("Location: /");
    }

    public function add(){
        $this->services->get("Model_User")->addUser();
        $_SESSION["success"] = "Account created";
        header("Location: /");
    }

    public function signinAction(){
        $this->setNoLayouts();
    }

    public function edit(){
        //TODO: Implement this
    }
}