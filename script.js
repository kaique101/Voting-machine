//this variables below are just to control the interface 
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

//this variables below are here to control the enviroment or the steps 
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = []; // this is going to be resposable to save all votes 


//functions 

function comecarEtapa(){ // this functions is goint to be responsible to clean my display, get the information from "etapaAtual" and fill in all the information on screen 
    let etapa = etapas[etapaAtual];

    let numeroHtml = '';
    numero = '';
    votoBranco = false;
    for (let i=0;i<etapa.numeros;i++){ // this loop is to create the numbers on the screen according to the array for mayors are only 2 and politicians 5
        if(i===0){
            numeroHtml += '<div class="numero pisca"></div>';
    } else {
        numeroHtml += '<div class="numero"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

};

function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{ // this code below is to check if the numbers that chose is the same as my array
        if(item.numero === numero){
            return true;
        } else{
            return false;
        }
    });
    if(candidato.length > 0){ // this part will be the resposible to show the information on the screen according to the number written
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`;
        aviso.style.display = 'block';

        let fotosHtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotosHtml += `<div class="d-1-image small">Prefeito<img src="images/${candidato.fotos[i].url}" alt="Prefeito">${candidato.fotos[i].lengenda}</div>`
            } else{
                fotosHtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}" alt="Prefeito">${candidato.fotos[i].lengenda}</div>`
            }
            
        }
        lateral.innerHTML = fotosHtml; 
    } else{ //this else is the "null" vote
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`
    }    
};

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca'); // this is to remove the pisca class 
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca'); // this is to add the pisca class into the next element
        }
        else{
            atualizaInterface();
        }
    }
};

function branco(){
        numero = '';
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        numeros.innerHTML = '';
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`
        lateral.innerHTML = '';
    
};

function corrige(){
    comecarEtapa();
};
function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

    if(votoBranco===true){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:"branco"
        });
    }
    else if (numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto:numero
    });
    }
    if(votoConfirmado){
        etapaAtual++;
        if(etapas[etapaAtual]!== undefined){
            comecarEtapa();
        } else{ //this is goint to be the "FIM part"
            document.querySelector('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM</div>`
            console.log(votos)
        }
    }
};

comecarEtapa();