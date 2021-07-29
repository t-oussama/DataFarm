// Objets du modèle

// Creation d'un module par appel d'une fonction initialisée
const dj_model = (function() {

  /* Notion de moteur de recherche
  * Utilisé pour transformer les objets reçus du serveur
  * Actuellement les attributs sont :
  *
  */
  function Engine() {
  }

  // Ajoute des methodes au prototype donc à tous les objets
  // qui son crée par Engine ou auquel on change le propotype

  /** Interroge le moteur
  *
  */
  Engine.prototype.search = function () {
    console.log(this);
  }

  /**
  *  Récupère l'info de latitude
  */
  Object.defineProperty(Engine.prototype,'latitude', {
    get : function() {  return this.Latitude;}
  })

  /**
  *  Récupère l'info de longitude
  */
  Object.defineProperty(Engine.prototype,'longitude', {
    get : function() {  return this.Longitude;}
  })

  /**
  *  Indique si le moteur est actif
  */
  Object.defineProperty(Engine.prototype,'isActive', {
    get : function() {
      // Le moteur est considéré comme actif s'il a un code non vide
      return this.Code != "";}
    })



    // Les moteurs de recherche au croisement d'une thématique et
    // d'une localisation
    // Représente tous les moteurs
    function Engines(){
      /** Recupération de la liste des moteurs pour une thématique
      * @arg theme - chaine décrivant le thème (non utilisé dans cette version)
      * @arg callback - fonction appelée lorsque le résultat est disponible
      */
      this.getByTheme = function (theme,callback,callbackE) {
        // La réponse doit être du JSON, on le transforme
        getServer('getEngineList',
        function(data) {
          // Transforme en JSON
          let engines = JSON.parse(data);
          // parcours tous les objets pour leur donner la classe Engine
          for(var i=0; i<engines.length; i++) {
            Object.setPrototypeOf(engines[i],Engine.prototype);
          }
          callback(engines);
        },callbackE);
      }
    }

    /* Protocole  : liste des retour d'erreurs
    * 200 : ok pas d'erreur
    * 530 : ressource non disponible
    * 531 : ressource vide
    * 532 : format de la ressource incorrect
    */
    /** Methode de communication avec le serveur
    * @arg ep - entry point, point d'entrée sur le serveur, un nom sans php
    * @arg callback - call back si tout est correct, la valeur reçue est entre parametres
    * @arg callbackE - call back en cas d'erreur
    */
    function getServer(ep,callback,callbackE) {
      const req = new XMLHttpRequest();
      req.onreadystatechange = function(event) {
        // XMLHttpRequest.DONE === 4
        if (this.readyState === XMLHttpRequest.DONE) {
          if (this.status === 200) {
            // Reponse recue pas d'erreur dans le protocole HTTP
            // appel la callback avec le contenu du message
            callback(this.responseText);
          } else {
            // Appel le callback d'erreur, le texte de la réponse peut préciser l'erreur
            callbackE(this.status,this.statusText,this.responseText)
          }
        }
      };
      // Réalise l'appel au serveur
      req.open('GET', 'server/'+ep+'.php', true);
      req.send(null);
    }

    // Fin du module, retourne un objet avec les acces aux fonctions
    // IMPORTANT: on ne retourne ici que ce qui est visible de l'exterieur
    return {
      // Représente l'ensemble des moteurs
      engines: new Engines()
    }
  })();
