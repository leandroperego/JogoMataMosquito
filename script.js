let alturaTelaVidas = document.querySelector("#lifesAndTime").clientHeight;
let limiteTelaX = window.innerWidth;
let limiteTelaY = window.innerHeight - alturaTelaVidas;

let milisegundos = 1000;

window.addEventListener("resize", function (){
    limiteTelaX = window.innerWidth;
    limiteTelaY = window.innerHeight - alturaTelaVidas;
})

let spanTempo = document.querySelector("span#tempo");
let lifesImg = document.querySelectorAll("#lifes img");

let tempoDeJogo = 20;
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

    let mosquitoEsmagado = document.querySelector("#mosquitoEsmagado");
    if (mosquitoEsmagado){
        mosquitoEsmagado.remove();
        imgMira.remove();
    }

    let tamanhoMosquitoInteger = 50;

    let imgMosquito = document.createElement("img");
    imgMosquito.id = "mosquito";
    imgMosquito.src = "imagens/mosca.png";
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
        imgMosquito.src = "imagens/mosca_esmagada.png";
        imgMosquito.id = "mosquitoEsmagado";

        let imgMira = document.createElement("img");
        imgMira.src = "imagens/mira.png";
        imgMira.style.width = "10rem";
        imgMira.id = "imgMira";
        document.body.appendChild(imgMira);
        imgMira.style.position = "absolute";
        imgMira.style.left = `calc(${posicaoX} - 2.5rem)`;
        imgMira.style.top = `calc(${posicaoY} - 2.5rem)`;
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
            img.src = "imagens/coracao_vazio.png";
            break;
        }
    }
}

function criarImagemExibicao(path){
    let imagem = document.createElement("img");
        imagem.src = path;
        imagem.style.display = "block";
        imagem.style.height = `70%`;
        imagem.style.margin = "0 auto";

    return imagem;
}

function exibirTela(status){
    switch (status){
        case "gameover":
            document.body.appendChild(criarImagemExibicao("imagens/game_over.png"));
            break;
        case "vitoria":
            document.body.appendChild(criarImagemExibicao("imagens/vitoria.png"));
            break;
    }
    
    limparMosquito();
    pararJogo();
    criarBotao();
}

function criarBotao(){
    let button = document.createElement("button");
    button.textContent = "Ir para o inicio";
    button.addEventListener('click', () => {window.location.href = "index.html"});
    document.body.appendChild(button);
}

iniciarJogo();

let verificarJogo = setInterval(function(){
    if(gameOver()){
        exibirTela("gameover");

    } else if(venceu()){
        exibirTela("vitoria");
    }
}, 500);