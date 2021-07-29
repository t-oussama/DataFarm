<?php include('design/svgHelper.php'); ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title></title>
  <link rel="stylesheet" type="text/css" href="design/style.css">
  <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.9/angular.min.js"></script>
  <script type="text/javascript" src="js/data.js"></script>
  <script type="text/javascript" src="js/model.js"></script>
  <script type="text/javascript" src="js/control.js"></script>
  <script type="text/javascript" src="js/view.js"></script>
  <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBFiINQ0eKEH9IABBr-5iskXQlSKEj8teQ"></script>
</head>
<body ng-app="">
  <div id="map"></div>
  <!-- Boite d'accueil -->
  <form id="accueil">
    <aside>
      <img src="design/img/main.icn.png" alt="">
    </aside>
    <div class="content" ng-controller="StartBox as ctrl">
      <h1>{{ctrl.title}}</h1>
      <p>{{ctrl.content}}</p>
      <div class="checkbox">
        <label>
          {{ctrl.checkboxText}}
          <input type="checkbox">
          <span class="checkmark"></span>
        </label>
      </div>
    </div>
  </form>

  <!-- Menu de gauche -->
  <nav ng-controller="MainMenu as ctrl">
    <ul>
      <li ng-repeat="item in ctrl.items">
        <!-- Seul le premier element de la liste -->
        <input type="radio" name="menu" id={{item.id}} ng-checked="$first" ng-click="item.onclick()">
        <label for={{item.id}}></label>
        <div class="help">
          <div class="arrow-left">
          </div>
          <h2>{{item.help.title}}</h2>
          <p>{{item.help.content}}</p>
        </div>
      </li>
    </ul>
  </nav>

  <!-- Menu Thématique -->
  <div id="menu-thematique">
    <img src="design/img/searchEngine.icn.svg" alt="">
    <h2>
      Explorer
    </h2>
    <h3>Naviguez dans les réseaux </h3>
    <ul>

      <li> <h2>Local</h2>
        <ul>
          <li>
            <?= SVG("design/img/econRegional.icn.svg","icon"); ?>
            Economies Régionales
          </li>
          <li>
            <?= SVG("design/img/smartCities.icn.svg","icon"); ?>
            Smart Cities
          </li>
          <li>
            <?= SVG("design/img/businessParks.icn.svg","icon"); ?>
            Business Parks
          </li>
        </ul>
      </li>

      <li>
        <h2>Digital</h2>
        <ul>
          <li>
            <?= SVG("design/img/infoTechnologies.icn.svg","icon"); ?>
            Information Technologies
          </li>
          <li>
            <?= SVG("design/img/artiIntelligence.icn.svg","icon"); ?>
            Intelligence Artificielle
          </li>
          <li>
            <?= SVG("design/img/IoT.icn.svg","icon"); ?>
            IoT
          </li>
          <li>
            <?= SVG("design/img/openSource.icn.svg","icon"); ?>
            Open Source
          </li>
        </ul>
      </li>

      <li>
        <h2>Savoir</h2>
        <ul>
          <li>
            <?= SVG("design/img/higherEducation.icn.svg","icon"); ?>
            Higher Education
          </li>
          <li>
            <?= SVG("design/img/formation.icn.svg","icon"); ?>
            Formation continue
          </li>
        </ul>
      </li>

      <li>
        <h2>Entrepreunariat</h2>
        <ul>
          <li>
            <?= SVG("design/img/incubateurs.icn.svg","icon"); ?>
            Incubateur & Start-ups
          </li>
          <li>
            <?= SVG("design/img/industie4.icn.svg","icon"); ?>
            Capital Risque et financement
          </li>
          <li>
            <?= SVG("design/img/HR.icn.svg","icon"); ?>
            HR
          </li>
          <li>
            <?= SVG("design/img/openInnovation.icn.svg","icon"); ?>
            Open Innovation
          </li>
        </ul>
      </li>

      <li>
        <h2>Industrie</h2>
        <ul>
          <li>
            <?= SVG("design/img/industie4.icn.svg","icon"); ?>
            Industrie 4.0
          </li>
          <li>
            <?= SVG("design/img/agroIndustrie.icn.svg","icon"); ?>
            Agro-industrie
          </li>
        </ul>
      </li>

      <li>
        <h2>Services</h2>
      </li>
      <li>
        <h2>Construction</h2>
      </li>
      <li>
        <h2>Immobilier</h2>
      </li>
      <li>
        <h2>Distribution</h2>
      </li>
      <li>
        <h2>Santé</h2>
      </li>
    </ul>
  </div>
  <script src="js/main.js"></script>
  <script>
  console.log("Start");
  // Creation de l'objet application pour angular
  //var app = angular.module('', []);
  </script>
</body>
</html>
