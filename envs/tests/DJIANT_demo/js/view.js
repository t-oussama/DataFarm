// Partie elements d'interface

// Definition comme un module, seuls les elements retournés comme un
// objet sont visibles de l'exterieur
function Module_dj_view() {

  // Paramètres de l'interface


  ////////////////////////////////////////////////////////////////////////////
  // La carte de fond par GoogleMap
  ////////////////////////////////////////////////////////////////////////////

  // Style de la carte pour GoogleMap
  var styleMap =
  [
      {
          "featureType": "all",
          "elementType": "all",
          "stylers": [
              {
                  "hue": "#008eff"
              }
          ]
      },
      {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
              {
                  "saturation": "0"
              },
              {
                  "lightness": "0"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "off"
              }
          ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "visibility": "simplified"
              },
              {
                  "saturation": "-60"
              },
              {
                  "lightness": "-20"
              }
          ]
      }
  ]

  /* Une carte par Google Map
  *
  */
  function Map(){
    // Variables locales
    // ATTENTION:  le var est important pour masquer une définition globale

    // Carte de google
    var map;

    // Definit une nouvelle image de l'icone : moteur actif
    var imageIcnEngineOn;
    // Moteur inactif
    var imageIcnEngineOff;

    // Initialisation de la carte et autres valeurs
    this.setUp = function() {
      // Initialisation de la carte
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 45, lng: 10},
        zoom: 5.0,
        styles: styleMap,
        disableDefaultUI: true
      });
      // Initialisation de l'image icone
      imageIcnEngineOn = {
        url: 'design/img/engineOn.icn.png',
        // Taille de l'image de l'icone en pixel
        // Utile si une image contient tous les icones
        size: new google.maps.Size(50, 50),
        // Ou est le point haut gauche de l'icone.
        origin: new google.maps.Point(0, 0),
        // La taille réelle apres scalling
        scaledSize: new google.maps.Size(10,10),
        // Ou est l'ancre : au centre
        // Attention, il s'agit des coordonnes apres le scale
        anchor: new google.maps.Point(5, 5),
      };
      imageIcnEngineOff = {
        url: 'design/img/engineOff.icn.png',
        // Taille de l'image de l'icone en pixel
        // Utile si une image contient tous les icones
        size: new google.maps.Size(50, 50),
        // Ou est le point haut gauche de l'icone.
        origin: new google.maps.Point(0, 0),
        // La taille réelle apres scalling
        scaledSize: new google.maps.Size(10,10),
        // Ou est l'ancre : au centre
        // Attention, il s'agit des coordonnes apres le scale
        anchor: new google.maps.Point(5, 5),
      };
    }

    // Augmente le zoom
    this.zoomIn = function () {
      // La fonction getZoom() arrondi à l'entier
      var zoom = map.getZoom();
      // On ne peut rien faire d'autre qu'ajouter un entier
      zoom += 1;
      map.setZoom(zoom);
    }

    // Diminue le zoom
    this.zoomOut = function () {
      map.setZoom(map.getZoom()-1);
    }

    /** Place un moteur sur la carte
    * @arg engine - un moteur tel définit dans le modèle
    */
    this.setUpEngine = function(engine) {
      // Cree un marqueur Google
      var marker = new google.maps.Marker({
        position: {lat: engine.latitude, lng: engine.longitude},
        map: map,
        // Choisit le bon icone si le moteur est actif
        icon: (engine.isActive) ? imageIcnEngineOn : imageIcnEngineOff ,
        title: 'Hello World!'
      });
    }
  }

  // Objet carte local
  // IMPORTANT: comme cet objet est passé à la constuction du module
  // il doit déjà exister
  const map = new Map();

  /** Action à réaliser au chargement
  */
  function setUpMap() {
    // Initialisation de la carte
    map.setUp();
  }

  // Augmente le zoom
  function zoomIn() {
    map.zoomIn();
  }

  // Diminue le zoom
  function zoomOut() {
    map.zoomOut();
  }

  ////////////////////////////////////////////////////////////////////////////
  // La navigation et les bulles d'aide
  ////////////////////////////////////////////////////////////////////////////

  //Fonction qui affiche une bulle d'aide sur un noeud DOM
  // Suppose que le help est un noeud frere de la classe help
  function showHelp(domNode) {
    // Recherche le noeud père
    var parentNode = domNode.parentNode;
    // Recherche le premier fils qui est de la classe help
    var helpNodes = parentNode.getElementsByClassName('help');
    // Vérifie qu'on a trouvé au moins une aide
    if (helpNodes.length >= 1) {
      // Rend visible la bulle d'aide
      helpNodes[0].style.display = 'block';
    }
  }

  //Fonction qui rend invisible une bulle d'aide sur un noeud DOM
  // Suppose que le help est un noeud frere de la classe help
  function hideHelp(domNode) {
    // Recherche le noeud père
    var parentNode = domNode.parentNode;
    // Recherche le premier fils qui est de la classe help
    var helpNodes = parentNode.getElementsByClassName('help');
    // Vérifie qu'on a trouvé au moins une aide
    if (helpNodes.length >= 1) {
      // Rend visible la bulle d'aide
      helpNodes[0].style.display = 'none';
    }
  }

  /** Place une bulle l'aide sur tous les elements à l'interieur du noeud domNode
  * et de la classe DOM dClass
  * @arg domNode - l'objet dom menu sur lequel il faut placer les bulles d'aides
  * @arg dClass - nom dom de la classe qui contient le bulle d'aide
  */
  function setUpHelp(domNode,dClass) {
    // Recupère tous les elements à modifier
    var nodeList = domNode.getElementsByTagName(dClass);
    // Parcours la liste
    for(var i=0; i< nodeList.length; i++) {
      // Ajout d'une fonction intermédiaire pour que
      // la variable n soit crée pour chaque valeur de la fonction i
      // Voir : Resig p 116
      (function(n) {
        // Place l'action d'entrée dans la zone
        nodeList[n].addEventListener('mouseenter',
        function(event) {
          // Lance une fonction apres un time out
          // Conserve la référence sur le timer pour le supprimer à la sortie.
          nodeList[n].timeOut =
          setTimeout(function() {
            // Appelle la fonction d'affichage de l'aide sur le noeud
            showHelp(event.target);
          }, parameters.timeOutHelp);
        });
        // Place l'action de sortie de la zone
        nodeList[n].addEventListener('mouseleave',
        function(event) {
          // supprime le time out
          clearTimeout(nodeList[n].timeOut);
          // Rend invisible la bulle d'aide
          hideHelp(event.target);
        });
      })(i)
      //console.log(nodeList[i]);
    }
  }



  ///////////////////////////////////////////////////////////////////////////
  // Utilitaires
  ///////////////////////////////////////////////////////////////////////////

  // Ferme la boite en mettant son opacité à 0
  function closeNode(domNode) {
    domNode.style.opacity = "0";
  }

  // Recherche le premier bouton input checkbox
  //  pour y a jouter une fonction de disparition de domNode
  function setupClose(domNode) {
    // Recherche le premier input de type checkbox
    var input = domNode.querySelectorAll('input[type=checkbox]');
    // Test si erreur
    if (input.length == 0) {
      throw "no input checked node found";
    }
    // Regarde si checked
    if (input[0].checked) {
      // n'affiche pas la boite
      domNode.style.display = 'none';
    } else {
      // Place la fonction sur ce noeud
      input[0].onchange = function() {closeNode(domNode);};
    }
  }


  /**
  * Mise en place du menu sur la balise nav
  * @param domNode - le noeud ou rechercher les label du menu
  * @param action - fonction activée avec en paramètre l'id de l'input
  */
  function setUpMenu(domNode,action) {
    // Recherche tout les labels sous ul et li
    var labels = domNode.querySelectorAll('ul>li>label');
    // Verifie qu'il y en au au moins un
    if (labels.length == 0) {
      throw "aucun <label> trouvé dans le menu";
    }
    // Parcourt tous les labels pour leur placer une fonction
    for(i=0; i<labels.length; i++) {
      // Récupère l'identifiant de l'input à partir de l'attribut for du label
      labels[i].onclick = function() {action(this.attributes['for'].value);};
    }
  }

  /**
  * Mise en place de la réaction du menu thematique
  * @param domNode - le noeud ou rechercher les label du menu
  * @param action - fonction activée avec en paramètre le nom de l'item selectionné
  */
  function setUpMenuThematique(domNode,action) {
    // Recherche toutes les sous entrées
    var subEntries = domNode.querySelectorAll('ul>li>ul>li');
    // Parcours chaque entrée pour placer la fonction
    for(var i=0; i<subEntries.length; i++) {
      subEntries[i].onclick = function() {
        // Passe en revue toutes les sous entrée
        // ATTENTION : fermeture sur subEntries
        for(var i=0; i<subEntries.length; i++) {
          subEntries[i].classList.remove('selected');
        }
        // Change l'entrée comme selectionnée
        this.classList.add('selected');
        // Recupère le nom de l'entrée
        var name = this.innerHTML;
        // Appelle l'action avec le nom de l'entrée
        action(name);
      }
    }
  }




  /*************************************************************************
  * Menu thématique
  **************************************************************************/

  /**
  * Création
  * @param domNode - le noeud dom du menu
  * @param menuMain - le menu principal d'ou on enlève l'ombre
  */
  function MenuThematique(domNode,menuMain) {
    // Le noeud dom ou se trouve le menu
    this.domNode = domNode;
    // Pour afficher le menu
    this.show = function () {
      // Rend visible ce noeud
      // Le met à sa place
      domNode.style.left = "38px";
      // supprime l'ombre du menu principal
      menuMain.hideShadow();
    }
    this.hide = function () {
      // Cache le menu
      domNode.style.left = "-278px";
      // Replace l'ombre sur le menu
      menuMain.showShadow();
    }
  };


  /*************************************************************************
  * Menu principal (icones)
  **************************************************************************/

  /**
  * Création
  * @param domNode - le noeud dom du menu
  */
  function MenuMain(domNode) {
    // Le noeud dom ou se trouve le menu
    this.domNode = domNode;
    // Recupère la valeur initiale de l'ombre
    this.boxShadow = "0px 0px 20px 0px #444";
    // fait apparaitre l'ombre
    this.showShadow = function () {
      this.domNode.style.boxShadow = this.boxShadow;
    }
    // Fait disparaitre d'Ombrage
    this.hideShadow = function () {
      this.domNode.style.boxShadow = "none";
    }
  }

  /*************************************************************************
  * Les moteurs
  * Concerne l'icone du moteur sur la carte
  **************************************************************************/

  /** Moteur comme un point sur la carte
  * @arg engine - les données sur le moteur en provenance du modele
  */
  function Engine(engine) {
    this.latitude = engine.latitude;
  }

  /** Montre le moteur sur la carte
  *
  */
  Engine.prototype.show = function () {
    console.log(this);
  }

  // Rend visible certaines methodes et classes
  // ATTENTION: n'est exécuté qu'une seule fois à la création
  // Il ne faut donc pas mettre des variables qui changent de valeur
  return {
    // Methodes de mise en place de l'interface
    setUpMap: setUpMap,
    setUpHelp: setUpHelp,
    setupClose: setupClose,
    setUpMenu: setUpMenu,
    setUpMenuThematique: setUpMenuThematique,
    // Interactions directes sans passer par le controleur
    zoomIn: zoomIn,
    zoomOut: zoomOut,
    // Les vue disponibles (classe)
    MenuThematique: MenuThematique,
    MenuMain: MenuMain,
    // Les vues (instances)
    map : map
  }

  // Fin du module dj_view
};
