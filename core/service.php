<?php

class Core_Service {

    private static $_instance = null;
    /**
     * The object holder array
     * @var Array
     */
    private $_holder = array();

    private function __construct(){
        // private constructor -> singleton
    }
    /**
     * Get the singleton instance
     * @return Core_Service
     */
    public static function getInstance(){
        if (self::$_instance === null){
            self::$_instance = new Core_Service();
        }

        return self::$_instance;
    }
    /**
     * Check if a service is available
     *
     * @param String $service
     * @return boolean
     */
    public function has( $service=null ){
        if (empty($service)) {
            return false;
        }

        if (array_key_exists($service, $this->_holder)) {
            return true;
        }

        return false;
    }
    /**
     * Get a required service
     *
     * @return Object
     */
    public function get( $serviceName=null ){
        if (!$this->has($serviceName)) {
            throw new RuntimeException("Service $serviceName not found!");
        }

        // create the object if it does not exist yet
        if (is_null($this->_holder[$serviceName]["instance"])) {
            $factory = $this->_holder[$serviceName]['factory'];
            if (is_callable($factory)){
                $this->_holder[$serviceName]["instance"] = $factory();
            } else {
                $this->_holder[$serviceName]["instance"] = new $this->_holder[$serviceName]["className"]();
            }
        }

        return $this->_holder[$serviceName]['instance'];
    }
    /**
     * Add a service to the list
     *
     * @param String $serviceName
     * @param String $serviceClassName
     * @throws RuntimeException
     */
    public function add( $serviceName=null , $serviceClassName=null , $factory_method=null){
        if (empty($serviceName)) {
            throw new RuntimeException("Must provide valid arguments to add a service");
        }

        if ($this->has($serviceName)) {
            throw new RuntimeException("Service $serviceName already exists in list");
        }

        $this->_holder[$serviceName] = array(
            "instance"   => null,
            "className"  => $serviceClassName,
            "factory"    => $factory_method
        );
    }

}