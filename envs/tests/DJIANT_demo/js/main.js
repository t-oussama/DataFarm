
// Partie principale
window.onload = main;
console.log("main.js loading");

// Parametres globaux
var parameters = {
  // Desactiver temporairement la carte pour des tests hors ligne
  gMapActive: true,
  // Temps d'activation en millisecondes pour les bulles d'aide
  timeOutHelp : 4000
}

// Pour l'instant variable globale
var query;
var dj_view;
// Creation de l'objet application pour angular
// ATTENTION : cet objet doit être global
var app = angular.module('', []);

// Ajoute les controleurs de cette application
app.controller('StartBox', StartBox);
app.controller('MainMenu', MainMenu);


function main() {

  // Verifie que la version de javascript est assez récente
  if (! Object.setPrototypeOf) {
    alert("Version de Javascript trop ancienne\nL'interface ne peux pas fonctionner correctement")
    return;
  }

  // Instanciation du module de gestion des vues
  dj_view = Module_dj_view();

  // Installation de la carte en fond d'écran
  if (parameters.gMapActive) {
    dj_view.setUpMap();
  }


  // Recherche du menu à gauche
  var nav = document.getElementsByTagName('nav');
  // Vérification
  if (nav.length != 1) {
    throw "Unique élément <nav> de la page non trouvé.";
  }
  // Il n'y a qu'un nav, on le note
  var menuDom = nav[0];

  // Installation des bulles d'aide sur la barre de navigation
  // On suppose qu'il n'y a qu'une seule barre de navigation
  dj_view.setUpHelp(menuDom,'label');

  // Installation de la fermeture de la boite d'accueil
  // Récupère la boite d'accueil
  var accueil = document.getElementById('accueil');
  // Recherche le premier input de type checkbox pour y arrocher une fermeture *
  dj_view.setupClose(accueil);


  // Création de la vue menu
  let menuMain = new dj_view.MenuMain(menuDom);

  // Initialisation de l'objet du menu MenuThematique
  var menuThematiqueDom = document.getElementById("menu-thematique");

  // Création de le vue du menu thématique
  let menuThematique = new dj_view.MenuThematique(menuThematiqueDom,menuMain);

  //////////////////////////////////////////////////////////////////////////
  // Partie controleurs
  //////////////////////////////////////////////////////////////////////////

  // Association de cette vue au controleur
  dj_ctrl.views.menuThematique = menuThematique;

  // Installation de la réaction au clic sur le menu thematique
  dj_view.setUpMenuThematique(menuThematiqueDom,dj_ctrl.menuThematique)

  // Positionne la vue main au controleur
  dj_ctrl.views.menuMain = menuMain;

  // Passe la carte au controleur
  dj_ctrl.views.map = dj_view.map;

}


// Traitement des caractères de query
// Un caractère de plus
function query_onkeypress(event) {
  // Récupère le caractère lu
  var char = event.which || event.keyCode;
  char = String.fromCharCode(char);
  // Lecture de l'état de l'input
  var inputValue = query.value;
  console.log(inputValue);
}

// Caractères spéciaux
function query_onkeydown(event) {
  // Récupère le caractère lu
  var char = event.which || event.keyCode;
  // Suppression d'une lettre
  if (char == 8) {

  }
}

function query_onchange(event) {
  var inputValue = query.value;
}

function query_oninput(event) {
  var inputValue = query.value;
}
