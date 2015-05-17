<?php

class Core_Db{

    private static $_conn = null;

    public static function getPDOConnection(){
        if (is_null(self::$_conn)){
            self::$_conn = new PDO('mysql:host='.DEV_HOST.'; dbname='.DEV_DATABASE, DEV_USERNAME, DEV_PASSWORD);
            self::$_conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        }
        return self::$_conn;
    }

}