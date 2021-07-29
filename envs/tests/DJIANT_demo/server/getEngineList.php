<?php
// Retourne la liste des moteurs
include('class/rest.class.php');

// Création de l'objet REST pour la construction de la réponse
$rest = new Rest();

// Seule méthode autorisée : GET
if ($rest->getMethod() !== "GET") {
  // Non implementé
  $rest->response(501);
}

// Chemin relatif vers les données
$dataPath = 'data';

// Taille maxi d'une ligne
$maxLineSize = 4000;

// Fichier des moteurs
$enginePathname = $dataPath.'/Region monde.csv';

// Ouvre le fichier des serveurs
$file = fopen($enginePathname,'r');
if ($file === false) {
  // Revoit le code d'erreur et le message en plus dans le texte
  $rest->responseText(530,"Cannot open file '".$enginePathname."'");
}

ini_set("auto_detect_line_endings", true);

// Lecture du fichier

// Lecture de la première ligne : les idf des colonnes
// La longueur max accelère le code
// trim : enlème les caractères vides en début et fin de ligne
$firstLine = trim(fgets($file,$maxLineSize));

// Si impossible c'est que le fichier est vide
if ($firstLine === false) {
  // Revoit le code d'erreur et le message en plus dans le texte
  $rest->responseText(531,"Empty file '$enginePathname'");
  exit(1);
}

// Decoupe la première ligne
$title = explode(';',$firstLine);

// S'il n'y a pas 9 premiers champs alors c'est une erreur
if (count($title) != 9) {
  // Revoit le code d'erreur et le message
  $rest->responseText(532,"Wrong number of values (".count($title).") in first line of '$enginePathname'");
}
// No des colonnes à lire
$regionFR_nb = 2;
$latitude_nb = 5;
$longitude_nb = 6;
$code_nb = 8;
// Vérifie les noms des champs attendus
if ($title[$regionFR_nb] != 'Région-FR' || $title[$latitude_nb] != 'Latitude' || $title[$longitude_nb] != 'Longitude' || $title[$code_nb] != 'Code' ) {
  // Revoit le code d'erreur et le message
  $rest->responseText(532,"Wrong columms title in first line of '$enginePathname'");
}
// Nom des colonnes
$regionFR_name = $title[$regionFR_nb];
$latitude_name = $title[$latitude_nb];
$longitude_name = $title[$longitude_nb];
$code_name = $title[$code_nb];

// Sortie du header pour du JSON
$rest->header(200,'application/json');

// Sortie des données en JSON
echo "[\n";
$line = trim(fgets($file,$maxLineSize));
$firstLine = true;
while ($line) {
  $data = explode(';',$line);
  // Sort les données dans un nouvel objet si le nom de région n'est pas vide
  if ($data[$regionFR_nb]) {
    if ($firstLine) {
      $firstLine = false;
    } else {
      echo ",\n";
    }
    echo '{"'.$regionFR_name.'":"'.$data[$regionFR_nb].'",';
    echo '"'.$latitude_name.'":'.$data[$latitude_nb].',';
    echo '"'.$longitude_name.'":'.$data[$longitude_nb].',';
    echo '"'.$code_name.'":"'.$data[$code_nb].'"';
    echo "}";
  }
  $line = trim(fgets($file,$maxLineSize));
}
echo "\n]\n";
?>
