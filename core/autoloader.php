<?php

class Core_Autoloader{

    public function __construct(){
        spl_autoload_register(array($this, "_baseLoader"));
    }

    /**
     * Load classes automatically
     * @param string $className
     */
    private function _baseLoader($className){
        if (empty($className)) {
            throw new RuntimeException("Invalid class for autoloader");
        }

        $params = explode("_", $className);
        $path   = SITE_PATH;

        foreach ($params as $param) {
            $path .= '/'.lcfirst($param);
        }

        $path .= '.php';

        if (file_exists($path)) {
            require_once $path;
            return;
        }
    }
}