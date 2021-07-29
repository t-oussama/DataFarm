<?php
// Test de l'Indexer
include('class/indexer.class.php');
// Chemin en dur
$indexer = new Indexer('data/_DB/France_paca');

//$query = 'total';
//$query = 'socapdis';
$query = "34300";
$start = microtime(true);
// Liste des attributs à filtrer
$attribList = array("Company name","Postcode");
$result = $indexer->query($query,$attribList);
$end = microtime(true);
$time = round($end-$start,3);
print(count($result)." résultats en ".$time."s\n");
if (count($result) === 0) {
  print("Aucun résultat pour '$query'\n");
  return;
}
// Affiche les 5 premières réponses
for ($i=0; $i < count($result) && $i < 5; $i++) {
  $docId = $result[$i]->docId;
  print('#'.$docId."\n");
  $doc = $indexer->getDoc($docId);
  print($doc."\n");
}

?>
