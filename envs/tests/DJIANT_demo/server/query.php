<?php
// Charge la classe REST
include('class/rest.class.php');
// Charge le code de l'indexeur
include('class/indexer.class.php');

// Crée un objet pour produire le format REST
$rest = new Rest();

// Récupère la méthode
$methode = $rest->getMethod();

// Resultat différent selon la méthode
switch ($methode) {
  // Demande un document par son idf ou une liste de valeur par un attribut
  case 'GET':
  // récupère les données demandées
  $res = $rest->getInput();
  // Il faut indiquer le type des documents
  if (isset($res['t'])) {
    $type = $res['t'];
  } else {
    // Erreur : bad request
    $rest->responseJson(400,'{"error":"no document type"}');
  }
  // Place le type
  $path = 'data/_DB/'.$type;
  // Ouvre l'indexeur avec le bon type
  $indexer = new Indexer($path);
  // Si on indique l'ID interne d'un document
  if (isset($res['id'])) {
    $id = $res['id'];
    // Va chercher le document avec son id
    $json = $indexer->getDoc($id);
    // Retourne la réponse
    $rest->responseJson(200,$json);
  }
  // Si on indique un nom de champ, on obtient la liste des valeurs
  if (isset($res['f'])) {
    $fieldName = $res['f'];
    // Va chercher le document avec son id
    $json = $indexer->getValueList($fieldName);
    // Retourne la réponse
    $rest->responseJson(200,$json);
  }
  // Erreur : bad request
  $rest->responseJson(400,'{"error":"no document id or field name"}');
  break;
  case 'QUERY':
  // Récupère les valeurs du post
  $res = $rest->getInput();
  // Il faut indiquer la requête
  if (isset($res['q'])) {
    $query = $res['q'];
  } else {
    // Erreur : bad request
    $rest->responseJson(400,'{"error":"no query"}');
  }
  // Il faut indiquer le type des documents
  if (isset($res['t'])) {
    $type = $res['t'];
  } else {
    // Erreur : bad request
    $rest->responseJson(400,'{"error":"no document type"}');
  }
  $start = microtime(true);
  // Place le type
  $path = 'data/_DB/'.$type;
  // Ouvre l'indexeur avec le bon type
  $indexer = new Indexer($path);
  // Lance une requête
  $result = $indexer->query($query);
  $end = microtime(true);
  $time = round($end-$start,3);
  $out = array();
  $out['time'] = $time;
  $out['total_match'] = count($result);
  $allMatch = array();
  // Affiche les 5 premières réponses
  for ($i=0; $i < count($result) && $i < 5; $i++) {
    $match = array();
    $match['order'] = $i+1;
    $match['id'] = $result[$i]->docId;
    $match['doc'] = json_decode($indexer->getDoc($match['id']));
    $allMatch[] = $match;
  }
  $out['match'] = $allMatch;
  $json = json_encode($out);
  // Retourne la réponse
  $rest->responseJson(200,$json);
  break;
  case 'PATCH':
  // Test une réponse non standard
  $rest->setStatusMessage('Message non standard');
  $rest->response(207);
  default:
  $rest->response(501);
  break;
}
