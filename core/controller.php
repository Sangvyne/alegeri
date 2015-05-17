<?php

class Core_Controller{
    public $view;
    protected $params = array();

    private $_viewSet = true;
    private $_layoutSet = true;

    protected $services;

    public function __construct(){
        $this->services = Core_Service::getInstance();
    }

    protected function setNoViews(){
        $this->_viewSet = false;
    }

    protected function setNoLayouts(){
        $this->_layoutSet = false;
    }

    public function hasView(){
        return $this->_viewSet;
    }

    public function hasLayout(){
        return $this->_layoutSet;
    }
}