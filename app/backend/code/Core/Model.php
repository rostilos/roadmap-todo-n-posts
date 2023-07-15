<?php

namespace Core;

use Config\Database;
use PDO;

abstract class Model {

    /**
     * PDO instance
     *
     * @var object
     */
    static $db = null;

    /**
     * The name of the table in the database that the model binds
     *
     * @var string
     */
    private $_table;


    public function __construct($table_name) {

        if (static::$db === null) {
            
            $conn_string = 'mysql:host=' . Database::DB_HOST . ';dbname=' . Database::DB_NAME . ';charset=utf8';
            $db = new \PDO($conn_string, Database::DB_USER, Database::DB_PASSWORD);

            $db->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
            static::$db = $db;
        }
        
        $this->_table = $table_name;
    }

    public function insert(array $data): int {

        if($this->_table === ""){
            throw new Exception("Attribute _table is empty string!");
        }
        
        // Question marks
        $marks = array_fill(0, count($data), '?');
        // Fields to be added.
        $fields = array_keys($data);
        // Fields values
        $values = array_values($data);

        // Prepare statement
        $stmt = $this->DB()->prepare("
            INSERT INTO " . $this->_table . "(" . implode(",", $fields) . ")
            VALUES(" . implode(",", $marks) . ")
        ");

        // Execute statement with values
        $stmt->execute($values);

        // Return last inserted ID.
        return $this->DB()->lastInsertId();
    }

    /**
     * Abstract method for getting all records from database.
     *
     *
     * @return array
     * @access  public
     * @since   Method available since Release 1.0.0
     */
    // abstract function getAll(): iterable;

    /**
     * The method return a PDO database connection.
     *
     * @return object
     * @access  public
     * @since   Method available since Release 1.0.0
     */
    protected function DB(): PDO {

        return static::$db;
    }

}