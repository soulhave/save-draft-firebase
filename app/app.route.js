angular.module('SaveDraftApp')
    .config(['$routeProvider',
        function ($routeProvider) {
        
            'ngInject';

            $routeProvider
                .when('/', {
                    templateUrl: 'view/app.view.html',
                    controller: 'AppCtrl',
                    controllerAs: 'ctrl'
                });
        }
    ]);
