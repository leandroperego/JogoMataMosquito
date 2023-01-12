let alturaTelaVidas = document.querySelector("#lifesAndTime").clientHeight;
let limiteTelaX = window.innerWidth;
let limiteTelaY = window.innerHeight - alturaTelaVidas;

let milisegundos = 1500;

window.addEventListener("resize", function (){
    limiteTelaX = window.innerWidth;
    limiteTelaY = window.innerHeight - alturaTelaVidas;
})

let spanTempo = document.querySelector("span#tempo");
let lifesImg = document.querySelectorAll("#lifes img");

let tempoDeJogo = 15;
spanTempo.textContent = tempoDeJogo;
let setIntervalTempoJogo;
let intervalExibirMosquito;

//------------------------------------------------------------------
function rodarTempo(){
    setIntervalTempoJogo = setInterval(function(){
        tempoDeJogo--;
        spanTempo.textContent = tempoDeJogo;
        clearIntervalSeTerminouTempo(tempoDeJogo);
    }, 1000);
}

function clearIntervalSeTerminouTempo(tempo){
    if (tempo == 0){
        clearInterval(setIntervalTempoJogo);
    }
}

function temVidasAinda(){

    for (var img of lifesImg){
        if (img.src.includes("coracao_cheio.png")){
            return true;
        }
    }

    return false;
}

function gameOver(){
    return !temVidasAinda();
}

function venceu(){
    return temVidasAinda() && tempoDeJogo == 0;
}

function pararJogo(){
    clearInterval(intervalExibirMosquito);
    clearInterval(verificarJogo);
    clearInterval(setIntervalTempoJogo);
}

function exibirGameOver(){
    console.log('game over');
}

function iniciarJogo(){
    rodarTempo();
    intervalExibirMosquito = setInterval(exibirMosquito, milisegundos);
}

function exibirMosquito(){

    if(limparMosquito()){
        removerLifes();
    }

    let tamanhoMosquitoInteger = 50;

    let imgMosquito = document.createElement("img");
    imgMosquito.id = "mosquito";
    imgMosquito.src = "/imagens/mosca.png";
    imgMosquito.style.width = tamanhoMosquitoInteger + "px";
    imgMosquito.style.position = "absolute";
    
    let posicaoX = sortearNumero(limiteTelaX) - tamanhoMosquitoInteger;
    posicaoX < tamanhoMosquitoInteger ? posicaoX = 0 + "px" : posicaoX += "px";
    let posicaoY = sortearNumero(limiteTelaY) - tamanhoMosquitoInteger;
    posicaoY < tamanhoMosquitoInteger ? posicaoY = 0 + "px" : posicaoY += "px";
    imgMosquito.style.left = posicaoX;
    imgMosquito.style.top = posicaoY;
    document.body.appendChild(imgMosquito);
    imgMosquito.addEventListener(`click`, function(){
        imgMosquito.remove();
    });
}

function limparMosquito(){
    let imgMosquitoNaBody = document.querySelector("#mosquito");
    if (imgMosquitoNaBody){
        imgMosquitoNaBody.remove();
        return true;
    }
    return false;
}

function sortearNumero(limite){
    return Math.floor(Math.random() * limite);
}

function removerLifes(){
    for (var img of lifesImg){
        if (img.src.includes("coracao_cheio.png")){
            img.src = "/imagens/coracao_vazio.png";
            break;
        }
    }
}

function criarImagemExibicao(path){
    let gameoverimg = document.createElement("img");
        gameoverimg.src = path;
        gameoverimg.style.display = "block";
        gameoverimg.style.height = `70%`;
        gameoverimg.style.margin = "0 auto";

    return gameoverimg;
}


iniciarJogo();

let verificarJogo = setInterval(function(){
    if(gameOver()){
        document.body.appendChild(criarImagemExibicao("/imagens/game_over.png"));
        limparMosquito();
        pararJogo();

    } else if(venceu()){
        document.body.appendChild(criarImagemExibicao("/imagens/vitoria.png"));
        limparMosquito();
        pararJogo();
    }
}, 500);