<?php

// Produit le fichier SVG en ajoutant la classe
function SVG(string $file,string $class) {
  // Recupère le fichier SVG
  $svg = file_get_contents($file);
  // Ajoute à tous les path, polygon la classe pour pouvoir changer la couleur !
  $svg = str_replace('<path','<path class="'.$class.'"',$svg);
  $svg = str_replace('<polygon','<polygon class="'.$class.'"',$svg);
  return $svg;
};

 ?>
