<?php

class Core_Base{

    public function start(){
        $router = new Core_Router();
        try{
          $params = $router->route();
        } catch(Exception $e){
            echo "Page not found.";
            header("Page not found", true, 404);
            return;
        }
        session_start();
        $this->bootstrap();
        $this->_runApp($params);
    }

    private function _runApp($params){
        $controller = $this->_getController($params["controller"]);
        $action     = $params["action"];

        if (!method_exists($controller, $action."Action")) {
            throw new Exception("Method $action not found");
        }

        if ($_SERVER['REQUEST_METHOD'] == "GET") {
            $viewPath = SITE_PATH."/views/".$params["controller"]."/".$action.".phtml";
            $viewObj = new Core_View();
            $viewObj->setScript($viewPath);
            $controller->view = $viewObj;
        }

        $action = $action."Action";
        $controller->$action();

        $view = "";
        if ($controller->hasView()){
            $view = $controller->view->render();
        }

        if ($controller->hasLayout()){
            require_once(SITE_PATH."/layouts/layout.phtml");
        } elseif(!empty($view)){
            echo $view;
        }
    }

    private function _getController($controllerName){
        if (empty($controllerName)) {
            throw new RuntimeException("Controller name invalid");
        }

        $name = "Controller_".ucfirst($controllerName);
        return new $name();
    }

    private function bootstrap(){
        $services = Core_Service::getInstance();
        $services->add("Model_User", function(){
            $model = new Model_User();
            $model->setRepo(new Repo_User());
            return $model;
        });
    }
}