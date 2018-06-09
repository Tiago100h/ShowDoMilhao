(function(){

    function QuestoesController ($stateParams, QuestionariosService) {
        var vm = this;
        var codigoQuestionario = $stateParams.codigo;
        vm.questionario = {};
        vm.questoes = [];
        vm.indice = 0;
        vm.questaoCorrente = {};

        // Ao iniciar
        recuperarQuestionarioDetalhe();
        recuperarQuestoes();

        // Funções
        function recuperarQuestionarioDetalhe(){
            QuestionariosService.recuperarDetalhe()
            .then(function() {
                vm.questionario = QuestionariosService.questionario;
            });
        }

        function recuperarQuestoes() {
            QuestionariosService.recuperarQuestoes(codigoQuestionario)
            .then(function() {
                vm.questoes = QuestionariosService.questoes;
                vm.questaoCorrente = vm.questoes[vm.indice];
            })
        }
    }

    angular.module('questionarioApp')
    .controller('QuestoesController', QuestoesController);

})()