var pontuacaoLabirinto = 0;
var userInfo = cc.sys.localStorage;
var perguntasDatabase  = [cc.sys.localStorage,cc.sys.localStorage,cc.sys.localStorage,cc.sys.localStorage,cc.sys.localStorage];
var pontuacaoPlataforma = 0;
var respostaDesafioPlataforma = 0;
var contadorFimPlataforma = 5;
var tentativas = 3;
var status =18;
var idLabirintoAtual = 0;
var numeroPerguntaQuizLabirinto = 0;
var incrementoPost = 0;
var incrementoPlataforma = 0;
var zerarResultadoParaPost = {
    "resultado": {
        "idAluno": -1,
        "level": -1,
        "respostas":[
            {
                "idQuestao": 0,
                "pontuacao": 0
            },
            {
                "idQuestao": 0,
                "pontuacao": 0
            },
            {
                "idQuestao": 0,
                "pontuacao": 0
            },
            {
                "idQuestao": 0,
                "pontuacao": 0
            },
            {
                "idQuestao": 0,
                "pontuacao": 0
            }
        ]
    }
};


var resultadoParaPost = {
    "resultado": {
        "idAluno": -1,
        "level": -1,
        "respostas":[
            {
                "idQuestao": 0,
                "pontuacao": 0
            },
            {
                "idQuestao": 0,
                "pontuacao": 0
            },
            {
                "idQuestao": 0,
                "pontuacao": 0
            },
            {
                "idQuestao": 0,
                "pontuacao": 0
            },
            {
                "idQuestao": 0,
                "pontuacao": 0
            }
        ]
    }
};