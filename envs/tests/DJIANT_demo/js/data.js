// Les données de demonstration stockées localement coté client

// La liste statique des domaines et sous domaines
// Chaque feuille de l'ontologie est identifiée, c'est cette valeur qui est utilisée
// pour positionner un moteur dans sous domaine particulier, donc aussi dans un domaine
// puisque c'est une arborescence
var dj_domain = [
  {
    title_fr: "Economies locales",
    sub:
    [
      {
        title_fr: "Chambres de commerce",
        idf: 11
      },
      {
        title_fr: "Agences de développement",
        idf: 12
      },
      {
        title_fr: "Word Trade Center",
        idf: 13
      },
      {
        title_fr: "Offices de Tourisme",
        idf: 14
      },
      {
        title_fr: "Parcs d'Activités",
        idf: 15
      },
      {
        title_fr: "Cluster",
        idf: 16
      },
    ]
  },
  {
    title_fr : "Education",
    sub:
    [
      {
        title_fr: "Universités",
        idf:21
      },
      {
        title_fr: "Business Schools",
        idf:21
      },
    ]
  }
];

// Liste des localités, chaque localité est identifiée
// Utilisé pour définir les moteurs
var dj_location = [
  {

  }

];

// Liste des moteurs :
