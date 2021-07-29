// Partie controle
// déclanche le modèle si necessaire

// Fonction contructeur qui définit le contenu de la boite d'acueil
function StartBox() {
  // Titre de la boite
  this.title = "Bienvenue dans ";
  // Texte de contenu
  this.content = "De nouveaux serveurs  sont crées tous les jours et le réseau se déploie pour couvrir toujours plus de sujets, de régions et de pays.  Découvrez sur la map les tout derniers serveurs .";
  // Texte de la check box
  this.checkboxText = "Ne plus afficher, j'ai compris."
}

// Définition du contenu du menu principal
function MainMenu() {
  // Liste des items du menu
  this.items = {
    home:
    {
      // Identifiant de cette entrée de menu
      // ATTENTION : cet identifiant est utilisé dans le CSS pour choisir l'icone
      id: "home",
      // Action sur le click
      onclick: function() {dj_ctrl.views.menuThematique.hide();},
      help: {
        // Titre qui apparait dans l'aide
        title: "Home",
        // Texte de l'aide
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    },
    searchEngine:
    {
      id: "searchEngine",
      onclick: function() {dj_ctrl.views.menuThematique.show();},
      help: {
        title: "Search",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    },
    addEngine:
    {
      id: "addEngine",
      onclick: function() {
        dj_ctrl.views.menuThematique.hide();
        alert("Aucune action");
      },
      help: {
        title: "Ajouter un moteur",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    },
    informations:
    {
      id: "informations",
      onclick: function() {
        dj_ctrl.views.menuThematique.hide();
        alert("Aucune action");
      },
      help: {
        title: "Informations",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    },
    zoomIn:
    {
      id: "zoomIn",
      onclick: function() {dj_view.zoomIn();},
      help: {
        title: "Zoom in",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    },
    zoomOut:
    {
      id: "zoomOut",
      onclick: function() {dj_view.zoomOut();},
      help: {
        title: "Zoom Out",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      }
    }
  }
}


// Definition du contenu du menu thématique
function ThematicMenu() {
  // Les menu sont dans des groupes puis des items
  this.groups =  [
    {
      // Titre de tout le groupe
      title: "Local",
      // liste des items de ce groupe
      items: {
        // Titre de l'item
        title: "Economies Régionales",
        // Identifiant : utilisé pour trouver l'icone
        id: "econRegional"
      }
    }
  ]
}



// Definition comme un module
const dj_ctrl = (function() {

  // Definition des vues accessibles
  let views = {
    // La vue du menu thématique
    menuThematique : undefined,
    // LA vue principale, les icones
    menuMain: undefined,
    // La carte en font d'écran
    map: undefined
  };


  // Callback simple en cas d'erreur
  function callbackE(HTTP_status,HTTP_statusText,info) {
    console.log("HTTP error : %s %s : %s",HTTP_status,HTTP_statusText,info);
  }

  /** Callback pour afficher les moteurs
  * @arg engineList - une liste d'objets modeles, moteurs de recherche à afficher
  */
  function showAllEngine(engineList) {
    // Demande à tous les objets de se montrer sur la carte
    for(var i=0; i<engineList.length; i++) {
      // Demande à la vue d'ajouter cet objet Modele Engine sur la carte
      views.map.setUpEngine(engineList[i])
    }
  }

  /**
  * Réaction à la selection d'un menu thematique
  * @param name - contenu du texte de l'entrée
  */
  function menuThematique(name) {
    // Déclenche la recherche dans le modèle de la liste des moteurs
    dj_model.engines.getByTheme("",showAllEngine,callbackE);
  }

  /* Obsolete */
  function menu() {}

  // Rend visible certaines méthodes du controle
  return {
    // Controleurs mis à disposition pour les vues
    menu: menu,
    menuThematique : menuThematique,
    // Acces en écriture à la liste des vues, il faut modifier les valeur
    views: views
  }
  // Fin du module dj_ctrl
})()
