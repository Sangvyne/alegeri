<?php

class Core_View{

    private $_script = "";
    private $_vars = array();

    public function __set($name, $value){
        if (empty($name)) {
            throw new RuntimeException("Invalid variable name for view");
        }

        $this->_vars[$name] = $value;
    }

    public function __get($name){
        if (array_key_exists($name, $this->_vars)) {
            return $this->_vars[$name];
        }

        return null;
    }

    public function render(){
        if (!file_exists($this->_script)){
            throw new RuntimeException("View script file doesn't exist");
        }
        ob_start();
        require_once($this->_script);
        return ob_get_clean();
    }

    public function setScript($script){
        $this->_script = $script;
    }
}