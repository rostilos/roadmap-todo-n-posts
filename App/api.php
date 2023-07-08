<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Обработка префлайт-запроса
    exit();
}

error_reporting(E_ALL);
ini_set('display_errors', 1);

// Define path to application directory
define('APPLICATION_PATH', substr(realpath(dirname(__FILE__)), 0, -4));
$test = substr(realpath(dirname(__FILE__)), 0, -4);
require '../Core/Psr4AutoloaderClass.php';

// PSR4 autoloader class.
$loader = new Core\Psr4AutoloaderClass();
$loader->register();

// Route dispatch
$router = new Core\Router();
$router->dispatch();
