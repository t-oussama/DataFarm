<?php
// Calcul du temps complet
$start = microtime(true);
// Indexe un fichier CSV
include('class/indexer.class.php');

// Verifie qu'il y a bien un paramètre
if (count($argv) !== 3) {
  print("Usage: php ".$argv[0]." ficher.csv moteur\n");
  exit(1);
}

$fileName = $argv[1];
$moteur = $argv[2];
print("Indexing $fileName into $moteur\n");

// Ouvre le fichier
$file = fopen($fileName,'r');
if ($file === false) {
  // Revoit le code d'erreur et le message
  echo "Cannot open file '$fileName'\n";
  exit(1);
}

// Taille maxi d'une ligne
$maxLineSize = 100*1024; // 100Ko
// Lecture de la première ligne : les idf des colonnes
// La longueur max accelère le code
// trim : enlème les caractères vides en début et fin de ligne
$firstLine = trim(fgets($file,$maxLineSize));

// Determine le caractère de séparation sur la première ligne
// Recherche d'abord le |
$pos = strpos($firstLine,'|');
if ($pos!== false) {
  $cvsSep = '|';
} else {
  // Recherche le ;
  $pos = strpos($firstLine,';');
  if ($pos !== false) {
    $cvsSep = ';';
  } else
  // Recherche la ,
  $pos = strpos($firstLine,',');
  if ($pos !== false) {
    $cvsSep = ',';
  } else {
    echo 'No separator found in the first line (; , or |)'."\n";
    exit(1);
  }
}
print("Using CVS separator: '$cvsSep'\n");

// Decoupe la première ligne
$title = explode($cvsSep,$firstLine);
// Nombre d'attributs d'un document
$nbAttrib = count($title);

// Si pas de nom, met simplement le No de la colonne
foreach ($title as $key => $value) {
  if ($value === '') {
    $title[$key] = strval($key);
  }
}

// Chemin génénal
$path = 'data/_DB';
if (! is_dir($path)) {
  if (! mkdir($path,0777,true)) {
    die(json_encode(array('error' => "cannot create ".$path)));
  }
}
// Chemin de l'index
$idxPath = $path.'/'.$moteur;

// Ouverture de l'indexeur
$indexer = new Indexer($idxPath);

// Lecture des autres lignes
//$line = trim(fgets($file,$maxLineSize));
$lineNb = 0;
while (($data = fgetcsv($file, $maxLineSize, $cvsSep, '"' )) !== FALSE) {
//while ($line) {
  $lineNb++;
  //$data = explode($cvsSep,$line);
  // Vérifie qu'il y a autant de valeurs qu'annocé dans le titre
  if (count($data) != $nbAttrib) {
    echo 'Expected '.$nbAttrib.' found '.count($data).' in line '.$lineNb."\n";
    var_dump($data);
    exit(1);
  }
  // Construit un document
  $doc = new stdClass();
  for($i=0;$i<$nbAttrib;$i++) {
    $attrib = $title[$i];
    $doc->$attrib = $data[$i];
  }
  // Le transforme en JSON
  $json = json_encode($doc);

  // L'ajoute à la base
  $indexer->addDoc($json);

  // Ligne suivante
  //$line = trim(fgets($file,$maxLineSize));
}

// Sauvegarde l'indexation
$indexer->dump();

// Temps final
$end = microtime(true);
$time = ($end-$start);
$speed = round($lineNb/$time,2);
echo "Add $lineNb documents in ".round($time,3)."s ($speed doc/s)\n";
//var_dump($title);
?>
