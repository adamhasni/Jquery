<?php

if( $_REQUEST ){
    var_dump($_REQUEST);
    echo "<pre>";
    print_r($_REQUEST);
    echo "</pre>";

    $data = $_REQUEST;
    
    foreach($data as $key => $value){
        echo $key.' => '.$value[0];
        echo '<br/>';
    }
 }