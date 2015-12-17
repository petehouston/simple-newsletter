describe('Testing service', function () {

    var MailService;

    beforeEach(function () {
        module('app');

        inject(function ($injector) {
            MailService = $injector.get('MailService');
        });
    });


});