angular.module('app', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('index', {
        url: '/',
        templateUrl: 'app/templates/index.tpl.html',
        controller: 'IndexCtrl as indexVm'
    });

    $urlRouterProvider.otherwise('/');
})

.factory('MailService', function ($http) {

    var MAIL_API = 'api/subsribe';

    var _send = function (user) {
        return $http.post(MAIL_API, user);
    };

    return {
        send: _send
    };
})

.controller('IndexCtrl', function (MailService) {
    var vm = this;

    vm.isSentSuccessful = false;

    vm.user = {
        name: '',
        email: ''
    };

    vm.send = function (isValid) {
        if(isValid) {
            MailService.send(vm.user).then(function (response) {
                vm.isSentSuccessful = true;
            }).catch(function (error) {
                vm.isSentSuccessful = false;
            });
        }
    };
});
