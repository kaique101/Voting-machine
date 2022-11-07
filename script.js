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


//functions 

function comecarEtapa(){ // this functions is goint to be responsible to clean my display, get the information from "etapaAtual" and fill in all the information on screen 
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    
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
    console.log(numero);    
};

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero} ${n}`;

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
    alert(`clicou em Branco`)
};

function corrige(){
    alert(`clicou em corrige`)
};
function confirma(){
    alert(`clicou em confirma`)
};

comecarEtapa();