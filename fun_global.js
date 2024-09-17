const SENHA = "street";


function login() {


    let mascara_login = document.getElementById("mascara_login");
    let mascara_conteudo = document.getElementById("mascara_conteudo");

    let input_senha = document.getElementById("senha");

    let s = localStorage.getItem("senha_nota_street");

    if(s == SENHA){
        input_senha.value =  s;
    }
    
    if (SENHA == input_senha.value.toString()){

        mascara_login.style = "display: none;";
        mascara_conteudo.style = "display: block;";

        localStorage.setItem("senha_nota_street", SENHA);
        insirirConteudo();

    }else {
       let acesso = document.getElementById("acesso");
       mascara_login.style = "display: block;";
       mascara_conteudo.style = "display: none;";

       acesso.style = " display: block;";
       acesso.innerHTML = "Acesso negado";
    }
    
}


function inserirBotoesMenu(){
    let extremidade = "/note/"; // colocar / se for local host e /nps/ se for github
    let caminho_listaCorte = "index.html";

    let urlBase = `http://${window.location.hostname}:${window.location.port}${extremidade}`;

    let botao_sair = document.getElementById("sair");
    let botao_listaCorte = document.getElementById("pagina_listaCorte");

    botao_listaCorte.addEventListener("click", function () {
        let url = `${urlBase}${caminho_listaCorte}`; 
        window.open(url.toString(), "_self");
    });

    botao_sair.addEventListener("click", function () {
        localStorage.clear();
        startSite(true);
        location.reload();
        //console.clear();
    });

}



function abrirLink() {
    var url = "https://docs.google.com/document/d/1UCwCfUXbVIpZCP0CzSN4ktsgxI5b__60kb_5w9ANJb0/edit?usp=sharing";
    window.location.href = url;
}



function startSite(estado){
    let mascara_conteudo = document.getElementById("mascara_conteudo");
    let fora = document.getElementById("fora");
    let bloco_login = document.getElementById("id_bloco_login");
    mascara_conteudo.style = "display: none;";
    fora.style = "display: none;";

    if (estado){
        let botao_logar = document.getElementById("btn_logar");
        botao_logar.addEventListener("click",login);
        let s = localStorage.getItem("senha_nota_street");

        if(s == SENHA){
            login();
        }
        let x = setTimeout(function () { /*console.clear();*/}, 3000);
    }else{
       fora.style = "display: block;";
       mascara_conteudo.style = "display: none;";
       bloco_login.style = "display: none;";
    }

}

function insirirConteudo(){
    //inserirBotoesMenu();
    //abrirLink();
}

startSite(true);