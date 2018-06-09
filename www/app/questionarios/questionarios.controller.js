(function(){

    function QuestionarioController(QuestionariosService) {
        var vm = this;
        vm.Questionarios = [];

        // Ao iniciar
        recuperarQuestionarios();

        // Funções
        function recuperarQuestionarios () {
            QuestionariosService.recuperar()
            .then(function() {
                vm.questionarios = QuestionariosService.questionarios;
            });
        }
    }

    angular.module('questionarioApp')
    .controller('QuestionariosController', QuestionarioController);

})();