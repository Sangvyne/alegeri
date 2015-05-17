<?php
// load config file
require_once "config.php";

// init autoloader
require_once "core/autoloader.php";
new Core_Autoloader();

$app = new Core_Base();
$app->start();