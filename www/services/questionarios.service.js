(function() {

    function QuestionariosService($http, $filter){

        var service = {
            questionarios : [],
            questionario : {},
            questoes : [],
            recuperar: recuperar,
            recuperarDetalhe: recuperarDetalhe,
            recuperarQuestoes : recuperarQuestoes
        };

        return service;

        // Funções
        function recuperar(){
            return $http.get('api/questionarios.json')
            .then(function(resposta) {
                service.questionarios = resposta.data;
            });
        }

        function recuperarDetalhe(codigo) {
            return $http.get('api/questionarios.json')
            .then(function(resposta) {
                service.questionario = $filter('filter')(resposta.data, { codigo: codigo })[0];
            });
        }

        function recuperarQuestoes(codigoQuestionario){
            return $http.get('api/questoes.json')
            .then(function(resposta) {
                service.questoes = $filter('filter')(resposta.data, { codigoQuestionario : codigoQuestionario });
            });
        }

    }

    // Registrando serviço na aplicação
    angular.module('questionarioApp')
    .factory('QuestionariosService', QuestionariosService);

})();