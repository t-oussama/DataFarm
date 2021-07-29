<?php
// Classe pour faciliter l'usage des échanges au format REST

class Rest{

  // Permet d'avoir un status message particulier
  private $statusMessage = '';
  // Contenu de la query string nettoyé des tags HTML
  private $input = array();

  // Ouvre une communication de type REST
  function __construct() {
  }

  // Recupère les données de la query string
  // ou de la partie data du message
  function getInput() {
    // Test en fonction de la méthode REST utilisée
    switch ($this->getMethod()) {
      case 'GET':
      case 'DELETE':
      case 'QUERY':
      // Les données sont uniquement dans la query string donc dans $_GET
      return $this->clearArray($_GET);
      break;
      case 'POST':
      // Les données sont dans le corps du message
      // Test si le type de contenu est annoncé
      if (isset($_SERVER['CONTENT_TYPE'])) {
        $content_type = $_SERVER['CONTENT_TYPE'];
        if (strpos($content_type,'text/plain') !== FALSE) {
          // De type texte, lecture direct du corps du message
          return file_get_contents("php://input");
        }
        if (strpos($content_type,'application/x-www-form-urlencoded') !== FALSE) {
          // De type query string mais placé dans les données
          return $this->clearArray($_POST);
        }
      } else {
        // Type inconnu, on suppose du texte
        return file_get_contents("php://input");
      }
      default:
      // code...
      break;
    }
    // Rend rien par défaut
    return '';
  }

  // Met un status message non standard pour plus d'info en cas d'erreur
  // Pour pouvoir aussi utiliser des codes non standards
  function setStatusMessage(string $message) {
    $this->statusMessage = $message;
  }

  // Retourne la méthode REST utilisée
  function getMethod(){
    return $_SERVER['REQUEST_METHOD'] ?? 'ERROR';
  }

  // Retourne une réponse texte
  function responseText(int $status, string $data) {
    $this->response($status,$data,'text/plain');
  }

  /// Retourne une valeur JSON
  function responseJson(int $status, string $data) {
    $this->response($status,$data,'application/json');
  }

  /// Retourne uniquement le header, il faut ensuite envoyer les données
  function header(int $status, string $contentType='text/plain') {
    // Recherche un message standard, si pas de message définit
    if ($this->statusMessage === '') {
      $this->statusMessage = $this->getStatusMessage($status);
    }
    // Produit le header
    header('HTTP/1.1 '.$status.' '.$this->statusMessage);
    header('Content-Type: '.$contentType.' charset=UTF-8');
    header('X-Server: 0.1');
  }

  /// Affiche la réponse et termine le script
  /// Si le statusMessage est vide; alors met un message standard
  function response(int $status,string $data='', string $contentType='text/plain'){
    $this->header($status,$contentType);
    echo $data;
    exit(0);
  }

  // Partie privée

  // Retourne un message standard
  function getStatusMessage(int $status) {
    switch ($status) {
      // Codes standards
      case 100: return 'Continue';
      case 101: return 'Switching Protocols';
      case 200: return 'OK';
      case 201: return 'Created';
      case 202: return 'Accepted';
      case 203: return 'Non-Authoritative Information';
      case 204: return 'No Content';
      case 205: return 'Reset Content';
      case 206: return 'Partial Content';
      case 300: return 'Multiple Choices';
      case 301: return 'Moved Permanently';
      case 302: return 'Found';
      case 303: return 'See Other';
      case 304: return 'Not Modified';
      case 305: return 'Use Proxy';
      case 306: return '(Unused)';
      case 307: return 'Temporary Redirect';
      case 400: return 'Bad Request';
      case 401: return 'Unauthorized';
      case 402: return 'Payment Required';
      case 403: return 'Forbidden';
      case 404: return 'Not Found';
      case 405: return 'Method Not Allowed';
      case 406: return 'Not Acceptable';
      case 407: return 'Proxy Authentication Required';
      case 408: return 'Request Timeout';
      case 409: return 'Conflict';
      case 410: return 'Gone';
      case 411: return 'Length Required';
      case 412: return 'Precondition Failed';
      case 413: return 'Request Entity Too Large';
      case 414: return 'Request-URI Too Long';
      case 415: return 'Unsupported Media Type';
      case 416: return 'Requested Range Not Satisfiable';
      case 417: return 'Expectation Failed';
      case 500: return 'Internal Server Error';
      case 501: return 'Not Implemented';
      case 502: return 'Bad Gateway';
      case 503: return 'Service Unavailable';
      case 504: return 'Gateway Timeout';
      case 505: return 'HTTP Version Not Supported';
      // Codes non standards utilisés par les serveurs de 
      case 530: return 'Cannot open file';
      case 531: return 'Empty file';
      case 532: return 'Internal data inconsistency';
      default: return 'Undocumented status';
    }
  }

  // Nettoie le tableau de tags HTML
  private function clearArray(array $array) : array {
    $res = array();
    foreach ($array as $key => $value) {
      $res[$key] = trim(strip_tags(htmlspecialchars($array[$key])));
    }
    return $res;
  }


}

// Pas de fermeture pour éviter les caractères hors php
// qui perturbe le header
