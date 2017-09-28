angular.module('SaveDraftApp')
    .controller('AppCtrl', function ($scope, $timeout) {

        'ngInject';

        this.sexo = [{ value: 'M', description: 'Masculino' }, { value: 'F', description: 'Feminino' }];
        this.escolaridade = [{ value: '1', description: 'Superior completo' }, { value: '2', description: 'Segundo grau completo' }];
        this.estado = [{ value: 'MG', description: 'Minas Gerais' }, { value: 'SP', description: 'São Paulo' }, { value: 'RJ', description: 'Rio de Janeiro' }];
        this.cidade = [{ value: 'BH', description: 'Belo Horizonte' }, { value: 'CVO', description: 'Curvelo' }, { value: 'ITBA', description: 'Inimutaba' }]
        $scope.saving = 1; //0-progress 1-saved 2-pendente 
        $scope.users;

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

            $scope.users = [];

            if (!$scope.newPostKey) {
                $scope.newPostKey = firebase
                    .database().ref()
                    .child('submission')
                    .push().key;
            }

            firebase.database()
                .ref('submission/' + $scope.newPostKey)
                .set($scope.user);


            $scope.saving = 1;

        }

        $scope.retrieve = function () {
            $scope.users = [];
            firebase.database().ref('submission')
                    .orderByKey()
                    .on('value', function (snapshot) {

                snapshot.forEach(function (childSnapshot) {
                    var childKey = childSnapshot.key;
                    var childData = childSnapshot.val();
                    $scope.users.push({key: childKey, value: childData});
                });

                $scope.users = $scope.users.reverse();
                $scope.$apply();
            });
        }

        $scope.reset = function () {
            $scope.userForm.$setPristine();
            $scope.userForm.$setUntouched();
            $scope.newPostKey = undefined;
            $scope.user = new UserBean();
        }

        $scope.init = function () {
            $scope.user = new UserBean();
            $scope.users = [];
            $scope.retrieve();
        }

        $scope.init();
    });
