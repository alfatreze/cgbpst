(function () {
    'use strict';

    angular.module('application', [
    // Angular libraries
    'ui.router',
    'ngAnimate',
    'dndLists',
    // App Modules
    'controllers',
    // Foundation UI components
    'foundation',
    'foundation.notification',
    // Routing with front matter
    'foundation.dynamicRouting',
    // Transitioning between views
    'foundation.dynamicRouting.animations',
    //services
    'statServices',
    //controllers
    'statControllers'
    ])
        .config(config)
        .run(run);

    config.$inject = ['$urlRouterProvider', '$locationProvider'];

    function config($urlProvider, $locationProvider) {

        // Default to the index view if the URL loaded is not found
        $urlProvider.otherwise('/home');

        // Use this to enable HTML5 mode
        $locationProvider.html5Mode({
            enabled: false,
            requireBase: false
        });

        // Use this to set the prefix for hash-bangs
        // Example: example.com/#!/page
        $locationProvider.hashPrefix('!');
    }

    function run() {
        // Enable FastClick to remove the 300ms click delay on touch devices
        FastClick.attach(document.body);
    }





})();


(function () {

    // CONTROLLER MODULE

    var app = angular.module('controllers', ['statServices', 'ngResource']);

    // CONTROLLERS
    // --------------------------------------------------

    // HEADER

/*
    function bdpMenu_FilterMenuLinksBySection(menuLinks, menuSectionKey) {
        var newMenuLinks = new Array();

        var menuLink;

        for (var i = 0; i < menuLinks.length; i++) {
            menuLink = menuLinks[i];

            if (menuLink['section'] == menuSectionKey) {
                newMenuLinks[newMenuLinks.length] = menuLink;
            }
        }

        return newMenuLinks;
    }

    function bdpMenu_GetSection(menuSectionKey) {
        var menuSection;
        var menuSectionToReturn;

        for (var i = 0; i < menuSections.length; i++) {
            menuSection = menuSections[i];

            if (menuSection['section'] == menuSectionKey) {
                menuSectionToReturn = menuSection;
                break;
            }
        }

        return menuSectionToReturn;
    }


    var menuSections = [
        {
            name: 'Backoffice',
            order: 1,
            section: 'BO',
            uiSref: 'backoffice',
        },
        {
            name: 'Frontoffice',
            order: 2,
            section: 'FO',
            uiSref: 'home',
        }
    ];

    var mainLinks = [
        {
        name: 'Front Office',
        order: 1,
        section: 'FO',
        uiSref: 'home',
        },
        {
            name: 'Ajuda',
            order: 2,
            section: 'FO',
            uiSref: 'Ajuda',
        },
        {
            name: 'Ajuda',
            order: 2,
            section: 'BO',
            uiSref: 'Ajuda_BO',
        },
        {
            name: '-',
            order: 3,
            section: 'FO',
            uiSref: 'Menu',
        },
    ];

    var subLinks = [
        {
            name: 'Gestão de Conteúdos',
            order: 1,
            section: 'BO',
            uiSref: 'GestaoConteudos',
            enabled: true,
        },
        {
            name: 'Gestão de Publicações',
            order: 2,
            section: 'BO',
            uiSref: 'GestaoPublicacoes',
            enabled: 'disabled',
        },
        {
            name: 'Gestão da Pesquisa',
            order: 3,
            section: 'BO',
            uiSref: 'GestaoPesquisa',
            enabled: 'disabled',
        },
        {
            name: 'Gestão de Utilizadores',
            order: 4,
            section: 'BO',
            uiSref: 'GestaoUtilizadores',
            enabled: 'disabled',
        },
        {
            name: 'Gestão de Contactos',
            order: 5,
            section: 'BO',
            uiSref: 'GestaoContactos',
            enabled: 'disabled',
        },
        {
            name: 'Monitorização',
            order: 6,
            section: 'BO',
            uiSref: 'Monitorizacao',
            enabled: 'disabled',
        },
        {
            name: 'Estatistica',
            order: 1,
            section: 'FO',
            uiSref: 'DomainEstatistica',
            enabled: '',
        },
        {
            name: 'Domain 2',
            order: 2,
            section: 'FO',
            uiSref: 'Domain2',
            enabled: '',
        },
    ];
*/
    // SIDEBAR


})();
