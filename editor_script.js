 const firebaseConfig = {
   apiKey: "AIzaSyBpofGapZ9j5RM99IXPCmOQV_WbNkjLSro",
   authDomain: "projeto-notas-a1f58.firebaseapp.com",
   databaseURL: "https://projeto-notas-a1f58-default-rtdb.firebaseio.com",
   projectId: "projeto-notas-a1f58",
   storageBucket: "projeto-notas-a1f58.appspot.com",
   messagingSenderId: "204356444737",
   appId: "1:204356444737:web:aaaf8790b7a302e11c9cc0"
 };


 firebase.initializeApp(firebaseConfig);
 const auth = firebase.auth();
 const database = firebase.database();

 let userId = "street";


 window.salvarConteudo = function () {
    if (userId) {  // Verificar se o usuário está autenticado
      const conteudo = tinymce.get('editor').getContent();  // Obter o conteúdo do TinyMCE
      firebase.database().ref('notas/' + userId).set({
        texto: conteudo
      }).then(() => {
        exibirMensagemSalvo();
        //console.log("Conteúdo salvo com sucesso!");
      }).catch((error) => {
        //console.error("Erro ao salvar o conteúdo: ", error);
      });
    } else {
      //console.error("Erro: Usuário não autenticado.");
    }
 };


 window.recuperarConteudo = function (){
    if (userId) {  
      const dbRef = firebase.database().ref('notas/' + userId);
      dbRef.get().then((snapshot) => {
        if (snapshot.exists()) {
          const conteudoSalvo = snapshot.val().texto || '';
          tinymce.get('editor').setContent(conteudoSalvo);  // Definir o conteúdo no TinyMCE
          //console.log("Conteúdo recuperado com sucesso!");
        } else {
          //console.log("Nenhum dado encontrado.");
        }
      }).catch((error) => {
        //console.error("Erro ao recuperar o conteúdo: ", error);
      });
    } else {
      //console.error("Erro: Usuário não autenticado.");
    }
 };




 window.onload = function() {

   tinymce.init({
     selector: '#editor',
     plugins: 'link image code',
     menubar: false,
     toolbar: 'insertSalvar | insertAtualizar | insertImprimir | insertCheckmark | insertCheckmarkX | fontsizeselect | forecolor',
     height: '100vh',
     setup: function (editor) {

      editor.ui.registry.addButton('insertSalvar', {
        text: 'Salvar',
        onAction: function () {
          salvarConteudo();
      }});
      editor.ui.registry.addButton('insertAtualizar', {
        text: 'Atualizar',
        onAction: function () {
          recuperarConteudo();
      }});
      editor.ui.registry.addButton('insertImprimir', {
        text: 'Imprimir',
        onAction: function () {
          imprimirConteudo();
      }});

      editor.ui.registry.addButton('insertCheckmark', {
        text: '✔',
        onAction: function () {
        editor.insertContent('<span style="color:#2dc26b; font-size: 1.3em;">☑</span>');
      }});

      editor.ui.registry.addButton('insertCheckmarkX', {
        text: 'X',
        onAction: function () {
        editor.insertContent('<span style="color:red; font-size: 1.2em;">X</span>');
      }});
      

      editor.on('init', function () {
        recuperarConteudo();
      });
       
     },
     
   });
  

 };

 function imprimirConteudo() {
   const contentToPrint = tinymce.get("editor").getContent();
   const newWindow = window.open("", "", "width=800,height=600");
   newWindow.document.write("<html><head><title>Documento Impresso</title></head><body>");
   newWindow.document.write(contentToPrint);
   newWindow.document.write("</' + 'body></' + 'html>");
   newWindow.document.close();
   newWindow.focus();
   newWindow.print(); 
   newWindow.close();
 }


function exibirMensagemSalvo() {
  const mensagemDiv = document.getElementById('salvoMensagem');
  mensagemDiv.style.display = 'block';  

  setTimeout(() => {
    mensagemDiv.style.display = 'none';
  }, 1000);
}

 function removerBarraInferior() {
   let barraInferior = document.getElementsByClassName("tox-statusbar__text-container");
   if (barraInferior.length > 0 ){
     barraInferior[0].remove();
     clearInterval(loopAtualizar);
   }
 }

 function mudarEstilo() {
  let barraInferior = document.getElementsByClassName("tox-tbtn__select-label");
  if (barraInferior.length > 0 ){
    for (let x = 0;x < barraInferior.length; x++){
      barraInferior[x].style = "font-size: 0.8em;";
    }
    clearInterval(loopAtualizar);
  }
}

 let loopAtualizar = setInterval(function () {
   removerBarraInferior()
   mudarEstilo()
 }, 1000);