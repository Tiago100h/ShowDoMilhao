angular
    .module("questionarioApp", ["ionic"])

    .run(function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider

            .state("app", {
                url: "/app",
                abstract: true,
                templateUrl: "app/core/app.html"
            })

            .state("app.questionarios", {
                url: "/questionarios",
                views: {
                    menuContent: {
                        templateUrl : "app/questionarios/questionarios.html",
                        controller : 'QuestionariosController',
                        controllerAs : 'vm'
                    }
                }
            })

            .state("app.questoes", {
                url: "/questionarios/:codigo/questoes",
                views: {
                    menuContent: {
                        templateUrl : "app/questoes/questoes.html",
                        controller : 'QuestoesController',
                        controllerAs : 'vm'
                    }
                }
            });
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise("app/questionarios");
    });
