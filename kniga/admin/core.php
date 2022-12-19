<?php
$action = $_POST['action'];

require_once 'function.php';

switch ($action) {
    case 'init':
        init();
        break;
    case "selectOneBooks":
        selectOneBooks();
        break;
    case "updateBooks":
        updateBooks();
        break;
        case "newBooks":
            newBooks();
            break;  
        case 'deleteBooks';
            deleteBooks();
            break;   
        case "loadBooks":
            loadBooks();
            break;
        case "loadSingleBooks":
            loadSingleBooks();
            break;
        case "loadManga":
            loadManga();
            break;
        case "loadBook":
            loadBook();
            break;
        case "loadComics":
            loadComics();
            break;    
        case "loadAll":
            loadAll();
            break;
           
}
      