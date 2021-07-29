<?php
// Charge la classe REST
include('rest.class.php');

// Crée un objet pour produire le format REST
$rest = new Rest();

// Affiche la méthode
$methode = $rest->getMethod();

// Resultat différent selon la méthode
switch ($methode) {
  case 'GET':
    $res = $rest->getInput();
    $json = json_encode($res);
    //$rest->response(200,'{"info":"Tout est OK !"}');
    $rest->setStatusMessage("Ca maaarche !!!");
    $rest->responseJson(200,$json);
    break;
    case 'POST':
    case 'QUERY':
    // Récupère les valeurs du post
    $res = $rest->getInput();
    if (is_array($res)) {
      // Ce sont des données type query string
      $json = json_encode($res);
      $rest->responseJson(200,$json);
    } else {
      // C'est du texte
      $rest->responseText(200,$res);
    }
    break;
    case 'DELETE':
    // Recupere la valeur à détruire
    break;
    case 'PATCH':
    // Test une réponse non standard
    $rest->setStatusMessage('Message non standard');
    $rest->response(207);
  default:
    $rest->response(501);
    break;
}
