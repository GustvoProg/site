angular.module('bookApp', [])
  .controller('BookCtrl', ['RecursoService', function (RecursoService) {
    var self = this;
    
    self.tab = 'livros';
    self.open = function(tab) {
      self.tab = tab;
    };
    
    self.livros = function () {
      return RecursoService.livros();
    };
    
    self.cursos = function () {
      return RecursoService.cursos();
    };
    
    self.getReClass = function (status) {
      return {
        recomendo: status.recomendo,
        naorecomendo: !status.recomendo
      };
    };
    
    
  }])
  .factory('RecursoService', [function (RecursoService) {
    var livros = [
      {pic: 'book/head.jpg', title: 'Head First HTML and CSS', infos: 'Muito bom pra quem quer um livro bem introdutório, com exemplos e que quer construir algo que faça sentido durante o aprendizado.', find: 'url', recomendo: true},
      {pic: 'book/html-css.jpg', title: 'HTML & CSS - Jon Duckett', infos: 'Um livro muito bonito, bem distribuído. Uma obra prima. Mas Pecou pelo excesso de capricho. Ensina pouco, com exemplos sem conexão.', find: 'url', recomendo: false},
      {pic: 'book/definitive.gif', title: 'JavaScript The Definitive Guide', infos: 'Se diz um livro iniciante, mas parei de ler no capítulo 4. Quase sem exemplos, e os que apresenta não fazem sentido nenhum pra quem está aprendendo (não quero criar uma calculadora de empréstimos que apresenta os resultados num gráfico gerado num canvas...)', find: 'url', recomendo: false},
      {pic: 'book/asmarter.jpg', title: 'A Smarter Way to Learn JS', infos: 'Recomendo como primeiro contato com a linguagem. Capítulos curtíssimos (89) seguidos de mais de 1750 exercícios no total. É a melhor base.', find: 'url', recomendo: true},
      {pic: 'book/professional-js.jpg', title: 'Professional JS for Web Devs', infos: 'Li seguindo o tutorial de aprendizado do JS num blog que está na seção de blogs aqui do catálogo. Dá de 10 no "Guia definitivo"', find: 'url', recomendo: true},
      {pic: 'book/jquery.png', title: 'jQuery Succinctly', infos: 'Como o nome diz, sucinto. Conciso. Vai direto ao ponto e serve como guia de bolso. Ensina o que é preciso pra sair criando com jQuery. Não que seja difícil aprender jQuery, mas esse livro facilita, com muitos exemplos.', find: 'url', recomendo: true},
      {pic: 'book/hello-html.jpg', title: 'Hello HTML5 & CSS3', infos: 'Não terminei de ler, mas até onde eu li, eu colocaria lado a lado com o Head First. Explicações sensacionais. Bom pra quem está começando e pra quem quer dar uma atualizada no HTML5.', find: 'url', recomendo: true},
      {pic: 'book/angular.gif', title: 'AngularJS Up & Running', infos: 'Lendo atualmente. Esse catálogo, por exemplo, é um aplicativo em Angular. O livro, aliado aos documentos do próprio Angular são a melhor introdução que encontrei pra essa framework.', find: 'url', recomendo: true},
      {pic: 'book/dont.jpeg', title: 'Don\'t Make Me Think', infos: 'Na categoria UX/UI que todo desenvolvedor deveria ler. O texto parece uma conversa. Com pelo menos uma imagem por página. Não tem como não entender e passar a ter noção do que vai na tela do user.', find: 'url', recomendo: true}
    ];
    var cursos = [
      {pic: 'book/codeschool.png', title: 'Code School', infos: 'Pago. Assinei por um mês numa promoção de $9 e gostei bastante. Fiz os cursos de Javascript, jQuery, AngularJS e git. Os professores e a didática são bem descontraídos, o que pra mim facilitou o aprendizado. Além de vídeos tem vários exercícios. Entre os cursos de navegador, esse é o melhor ao lado da Treehouse.', find: 'https://www.codeschool.com', recomendo: true},
      {pic: 'book/codecademy.png', title: 'Codecademy', infos: 'Grátis. Fiz o curso de HTML, CSS e Javascript. Os dois primeiros eu recomendo, mas não o segundo. NÃO APRENDA JAVASCRIPT na codecademy. O mecanismo do curso de JS é lento e bugado e ensina más práticas da linguagem. No geral, recomendo.', find: 'http://www.codecademy.com/pt-BR/learn', recomendo: true},
      {pic: 'book/treehouse.png', title: 'Treehouse', infos: 'Pago. O mais completo. Tem vários cursos, do básico ao avançado. Fiz aqui cursos de design, UX, front-end (HTML, CSS, JS), mídias sociais, Illustrator, Photoshop, identidade visual, SASS e git! Recomendo demais.', find: 'http://referrals.trhou.se/estevanmaito', recomendo: true},
      {pic: 'book/lynda.png', title: 'Lynda', infos: 'Pago. Você encontra uma infinidade de cursos na Lynda. Fiz cursos de introdução à programação, Javascript, fundamentos de design e layout. Dentre todos, os melhores professores. Peca por não ter exercícios como os outros, só vídeo. Mas mesmo assim são ótimos.', find: 'https://www.lynda.com', recomendo: true},
      {pic: 'book/tuts.png', title: 'Tuts Plus', infos: 'Pago. Cursos variados de mais ou menos 2-3hs. Fiz cursos de linha de comando e web design responsivo. Bem explicados, mas sem exemplos, só vídeo. No nível da Lynda. Eles têm também um blog com muito conteúdo, e o melhor, de graça.', find: 'http://tutsplus.com/courses', recomendo: true},
    ];
    
    return {
      livros: function () {
        return livros;
      },
      cursos: function () {
        return cursos;
      }
    }
    
    
  }])
  