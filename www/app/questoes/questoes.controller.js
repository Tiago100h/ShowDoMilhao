(function(){

    function QuestoesController ($stateParams, $state, $timeout, $ionicScrollDelegate, QuestionariosService, MensagemService) {
        var vm = this;
        var codigoQuestionario = $stateParams.codigo;
        vm.questionario = {};
        vm.questoes = [];
        vm.indice = 0;
        vm.questaoCorrente = {};
        vm.pontuacaoCorrente = 0;
        vm.quantidadeQuestoes = 0;

        // Ao iniciar
        recuperarQuestionarioDetalhe();
        recuperarQuestoes();

        // Índice
        vm.responder = responder;
        vm.finalizar = finalizar;
        vm.irParaProxima = irParaProxima;
        vm.irParaAnterior = irParaAnterior;

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
                vm.quantidadeQuestoes = vm.questoes.length;
            })
        }

        function responder(){
            if(vm.questaoCorrente.resposta == vm.questaoCorrente.opcaoSelecionada) {
                vm.questaoCorrente.acertou = true;
                vm.pontuacaoCorrente += vm.questaoCorrente.pontuacao;
                MensagemService.sucesso("Aeeeeew!", "Acertou!")
            } else {
                vm.questaoCorrente.acertou = false;
                vm.pontuacaoCorrente -= vm.questaoCorrente.pontuacao * 2;
                MensagemService.erro("Ih rapaz...", "você errou!")
            }
            vm.questaoCorrente.respondida = true;
            if(vm.indice + 1 == vm.quantidadeQuestoes) {
                vm.questionario.respondido = true;
            } else {
                irParaProxima();
            }
        }

        function irParaProxima() {
            vm.indice++;
            if(vm.indice < vm.quantidadeQuestoes) {
                vm.questaoCorrente = vm.questoes[vm.indice];
            }
            $ionicScrollDelegate.scrollTop();
        }

        function finalizar(){
            MensagemService.avisoCustom(
                "Atenção:",
                "Deseja mesmo finalizar?",
                function(sim){
                    if (sim) {
                        $timeout (function() {
                            MensagemService.sucesso (
                                "Sucesso!",
                                "O questionário foi finalizado!"
                            );
                            $state.go('app.questionarios');
                        }, 300);
                    }
                }
            )
        }

        function irParaAnterior() {
            vm.indice--;
            if(vm.indice >= 0) {
                vm.questaoCorrente = vm.questoes[vm.indice];
            }
            $ionicScrollDelegate.scrollTop();  
        }

    }

    angular.module('questionarioApp')
    .controller('QuestoesController', QuestoesController);

})()