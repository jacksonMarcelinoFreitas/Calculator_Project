![imgCalculator](https://user-images.githubusercontent.com/88464195/162635998-5920d343-9721-469c-8a64-955373c499b5.png)
# Anotações sobre o projeto

- O projeto possui CSS incorporado
- Programação procedural - execução de forma linear


## Orientação a objetos

- Métodos (trechos de códigos reutilizáveis);
- É possível criar objetos que representam uma classe (instância);
- Há reutulização de código e praticidade;

- O que importa em uma classe é uma arquivo dentro dela;
- A classe é um conjunto de atributos e métodos;
- Os objetos representam classes (instância);
- Dentro de uma classe emcontramos métodos e atributos;

## Criação da classe

- MVC (model View Controller) organização entre os dados, interface e regras de negócio;
- A classe CalcController possui as regras 
- A classe Calculadora.js representa o CalcController (instanciando);

## Método Construtor e Encapsulamento
#### Construtor
- No construtor de CalcControler nós podemos passar parâmetros, caso ele receba.
- Com o uso do this. , o atrubuto pode ser chamado dentro de qualquer parte do códgo;
- O this faz a referencia atributos e métodos, do próprio objeto instanciado

#### Encapsulamento 
- Public: todos acessam
  Protected: somente atributos e metodos da mesma classe e classe pai acessam
  Private: Somente atributos e métodos da própria classe
- Em JavaScript usa-se o "_" para indicar algo privado;
- Para acessar os métodos e atributos privados , podemos usar os métodos (Get e Set)

- GET (retorna algo);
- SET (recebe um valor e atribui ao atributo);
- O método construtor é chamado automaticamente;

## Manipulando o DOM
- Document Object Model
- Cada elemento HTML vira um objeto
- Método QuerySelector seleciona elementos do HTML (DATA, HORA, DISPLAY); 


      Ex.: 
            let displayCalcEl = document.querySelector('#display');

- A propriedade innerHTML faz a modificação no arquivo HTML;

      Ex.:
            displayCalcEl.innerHTML = "teste"

## Data e Hora
- toLacaleDateString();
- toLocaleTimeString();

- setInterval (para executar de forma intermitente uma função em um intervalo de tempo);
- setTimeOut (executa uma ação uma única vez, após um tempo);
o setInterval recebe dois parâmetros (ação a ser executada, intervalo de tempo)

      Ex.: 
            setInterval(()=>{
                this.displayDate = this.currentDate.toLocaleDateString('pt-BR')
            },1000)


No código, a função setDisplayDateTime(), atribui a displayDate e a displayTime as configurações de currentDate, já formatadas, e estas por sua vez estão configuradas para alterar o HTML;

## Arrow Function
- Possui novos recursos para a criação de funções;

      ex.: 
      
        function texte1(){
          return;    -->Função normal
        } 

        () => {
          return;    -->Arrow function
        } 

## Refatorar códigos
- É possível criar um método para executar funções  ou ou trechos de códigos repetidos ;

## querySelector
- querySelector() faz a seleção de um elemento;
- querySelectorAll() faz a seleção de todos os elementos buscados

## Criar elementos dinamicamente
- createElement('nome')
- atribuir algo a este elemento
- document.body.appendChild('nome') --> colocando o elemento dentro do body
- nome.select() --> selecionando elemento 
- document.execComand("Copy"); faz a copia do que está selecionado

- addEventListenner('paste', ){}
- clipboardData.getData('Text');

## Eventos em JS
- Para algo acontecer depois de um click ou movimento, nós adicionamos a escuta de eventos:

      Ex.: buttons.addEventListener ('click', e=>{
      });

- Para ele, devemos passar dois parâmetros, o evento e a ação a ser executada;
- recebe dois parâmetros('click', )

- são vários os tipos, como: (teclados , mouses, e etc)

- Criando métodos que adiciona multiplos eventos


## Converter Strings em Array
- Usa-se o método "split()"
- O parâmetro é o elemento separador

      Ex.: a = "Hello"
          a.split(' ') -> adicionado espaço como identificador de separação


## Switch
- Usa-se quando já sabemos as possibilidades

      ex.: 
          switch(valor){
          case 'A':
          break
          }

## Adicionando itens no ARRAY
- Usa-se o método "push()" para adicionar ao final do array

      ex.: 
          operation = [1,2]
          operation.push(3);

## Removendo itens do ARRAY
- Usa-se o método "pop()" para remover o ultimo elemento do array

      ex.: 
          operation.pop()

## Operação isNaN
- Verifica se é um número ou não e retorna um 

        ex.:
          a = "A";
          a.isNaN  --> true
          isNaN(a) --> true

          a = 5
          a.isNaN  --> false
          isNaN(a) --> false

## Operação .indexOf
- Faz a busca e dentro do array e retorna o indice

      ex.: 
        array = [1,2,3,5,10]
        array.indexOf(5)  --> Retorna indice 3

## Operador Eval
- Interpreta um String e faz operações com elas;


## Operador Join
- Faz a junção de Strings e números
onde deve-se passar um parâmetro para juntar

      ex.: 
        [20, "-", 5].join("") --> "20+5"
        [20, "+", 10].join(",") --> "20,+,5"

## Laço FOR
- Faço repetições

      ex.: 
        for(let i = 0; i < 100; i++){}
        for(let i = 100; i >= 0; i--){}

## Operador Ternário
- Condição
ex.:
  Condição ? Ação de for verdade : Ação se for falso;
  let A = 5; 
  teste = (A == 5) ? 10 : 20;
  teste --> 10 (true)

## Eventos de teclado 
- Eventos que ocorrem quando há uma ação no teclado

      ex.: 
        keyup --> quando a tecla é solta
        onkeydown --> quando pressiona a tecla
        onkeypress --> quand pressiona uma tecla

        etc...

## Copiando e colando 
- Clipboard (área de tranferência)

a) Copiar

      1) criamos um objeto 'input'
          document.createElement('input');
      2) atribui ao 'input' o display
        input.value = this.displayCalc;
      3) adiciona o input como elemento filho de budy
        document.body.appendChild(input);
      4) Seleciona o objeto
        input.select();
      5) executar o comando de copiar
        document.execCommand("Copy");

b) Colar  

      document.addEventListener('paste', e => {
            let text = e.clipboardData.getData('Text');
            this.displayCalc = parseFloat(text);
        });



## Recurso try cat

- Tente o try
- Se não conseguir, execute o cat

      ex.: 
        try{
          retrun eval(this._opertion.join(""));
        }catch(){
          this.setError();
        }








