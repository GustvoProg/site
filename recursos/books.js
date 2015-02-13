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
    
    self.blogs = function () {
      return RecursoService.blogs();
    }
    
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
      {pic: '', title: 'Head First', infos: 'Bem bom', find: 'url'},
      {pic: '', title: 'Head First', infos: 'Bem bom', find: 'url'},
      {pic: '', title: 'Head First', infos: 'Bem bom', find: 'url'},
      {pic: '', title: 'Head First', infos: 'Bem bom', find: 'url'},
      {pic: '', title: 'Head First', infos: 'Bem bom', find: 'url'},
    ];
    var blogs = [
      {pic: '', title: 'Head First', infos: 'Bem bom', find: 'url'},
      {pic: '', title: 'Head First', infos: 'Bem bom', find: 'url'},
      {pic: '', title: 'Head First', infos: 'Bem bom', find: 'url'},
      {pic: '', title: 'Head First', infos: 'Bem bom', find: 'url'},
      {pic: '', title: 'Head First', infos: 'Bem bom', find: 'url'},
      {pic: '', title: 'Head First', infos: 'Bem bom', find: 'url'},
    ];
    
    return {
      livros: function () {
        return livros;
      },
      cursos: function () {
        return cursos;
      },
      blogs: function () {
        return blogs;
      }
    }
    
    
  }])
  