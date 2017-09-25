angular.module('SaveDraftApp')
    .controller('AppCtrl', function ($scope, $timeout) {

        'ngInject';

        this.sexo = [{ value: 'M', description: 'Masculino' }, { value: 'F', description: 'Feminino' }];
        this.escolaridade = [{ value: '1', description: 'Superior completo' }, { value: '2', description: 'Segundo grau completo' }];
        this.estado = [{ value: 'MG', description: 'Minas Gerais' }, { value: 'SP', description: 'São Paulo' }, { value: 'RJ', description: 'Rio de Janeiro' }];
        this.cidade = [{ value: 'BH', description: 'Belo Horizonte' }, { value: 'CVO', description: 'Curvelo' }, { value: 'ITBA', description: 'Inimutaba' }]
        $scope.saving = 1; //0-progress 1-saved 2-pendente 

        UserBean = function () {
            var name;
            var sexo;
            var escolaridade;
            var idade;
            var cidade;
            var cidadeNatal;
            var endereco;
            var dataNascimento;
        }

        $scope.init = function () {
            $scope.user = new UserBean();
        }

        $scope.$watch('user', function (newVal, oldVal) {
            if ($scope.userForm && $scope.userForm.$dirty) {
                $scope.saving = 2;
                if ($scope.timeoutId) $timeout.cancel($scope.timeoutId);
                $scope.timeoutId = $timeout($scope.saveDraft, 750);
            }

        }, true);


        /**
         * List of the cities.
         */
        this.citiesList = function (search) {
            res = ['Belo Horizonte', 'Curvelo', 'Inimutaba'].filter(function (x) {
                return x.toLowerCase().indexOf(search.toLowerCase()) > -1;
            })
            return res;
        }

        $scope.saveDraft = function () {
            $scope.saving = 0;
            $timeout(function () {
                $scope.saving = 1;
                console.log($scope.user);
            }, 750);

        }

        $scope.isProcessing = function () {
            return $scope.saving == 0;
        }

        $scope.isSaved = function () {
            return $scope.saving == 1;
        }

        $scope.isNotSaved = function () {
            return $scope.saving == 2;
        }

        $scope.reset = function () {
            $scope.userForm.$setPristine();
            $scope.userForm.$setUntouched();
            $scope.user = new UserBean();
            console.log('Reset ...')
        }

        $scope.init()

    });
