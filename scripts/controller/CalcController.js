class CalcController {

    constructor() {

        this._audio = new Audio('click.mp3'); //this method recives "audio", in which audio has as parameter the src
        this._audioOnOff = false;
        this._lastOperator = '';
        this._lastNumber = '';

        this._operation = []; //objeto que armazena os números e operações
        this._locale = 'pt-BR';
        this._displayCalcEl = document.querySelector("#display"); //objeto para controlar o display
        this._dateEl = document.querySelector("#data"); //objeto para controlar a data
        this._timeEl = document.querySelector("#hora"); //objeto para controlar a hora

        this._currentDate;

        //Chamando o método inicialize no construtor
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard();

    }

    //This method copies the elements and sends it to the clipboard
    copyToClipboard() {

        //Criando um elemento input que será inserido dentro do body
        let input = document.createElement('input');

        input.value = this.displayCalc; //Atribuindo ao input o conteúdo do display

        document.body.appendChild(input); //adicionando com filha de body

        input.select(); // selecionando o input

        document.execCommand("Copy"); // copinado o input

        input.remove(); //removendo o input da calculadora

    }

    //Método para copiar da área de tranferência 
    pasteFromClipboard() {

        document.addEventListener('paste', e => {

            let text = e.clipboardData.getData('Text');

            this.displayCalc = parseFloat(text);

        });

    }

    //Método que é chamado de imediato
    initialize() {

        //Method call
        this.setDisplayDateTime();

        //This function update the time on the display
        setInterval(() => {

            this.setDisplayDateTime();

        }, 1000);

        this.setLastNumberToDisplay();

        this.pasteFromClipboard();

        document.querySelectorAll('.btn-ac').forEach(btn => {

            btn.addEventListener('dblclick', e => {

                this.toggleAudio();

            });

        });

    }

    //Method that turns audio on and off
    toggleAudio() {

        this._audioOnOff = !this._audioOnOff;

    }

    //This method, settings when the audio starts
    playAudio() {

        if (this._audioOnOff) {
            
            this._audio.currentTime = 0;
            this._audio.play();

        }

    }
    //This method adds some keyboards shortcuts 
    initKeyboard() {

        //Usa-se um laço para adicionar o evento.
        document.addEventListener('keyup', e => {

            this.playAudio();

            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                case '%':
                    this.addOperation(e.key);
                    break;
                case 'Enter':
                case '=':
                    this.calc();
                    break;
                case '.':
                case ',':
                    this.addDot();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    //Se for algum caso acima ele adiciona a operação tranformando em inteiro
                    this.addOperation(parseInt(e.key));
                    break;

                    //Caso  apertar a tecla c e se a tecla ctrl estiver pressionada , chama o método de copiar 
                case 'c':
                    if (e.ctrlKey) this.copyToClipboard();
                    break;
                
            }

        });

    }


    //Criando método que adiciona multiplos eventos
    addEventListenerAll(element, events, fn) {

        //1º Separar os parâmetros events e depois percorrer aplicanto o evento no elemento
        events.split(' ').forEach(event => {

            element.addEventListener(event, fn, false);

        });

    }

    clearAll() {
        //Zera o array 
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = '';

        this.setLastNumberToDisplay();

    }

    clearEntry() {
        //Remove o ultimo elemento do array
        this._operation.pop();

        this.setLastNumberToDisplay();

    }

    //Método para pegar a ultima operação
    getLastOperation() {

        return this._operation[this._operation.length - 1];

    }

    //Método para substituir a ultima operação pelo value
    setLastOperation(value) {

        this._operation[this._operation.length - 1] = value;

    }

    //Método que verifica se o valor é um operador, por meio do indexOf e retorna o true ou false
    //Se ele é maior que menos um é true, senão é false
    isOperator(value) {
        //O indexOf retorna o indice, se for maior que -1 , então true, senão é false
        return (['+', '-', '*', '%', '/'].indexOf(value) > -1);

    }

    //Método para adicionar uma operação
    pushOperation(value) {

        this._operation.push(value);

        if (this._operation.length > 3) { //Se o vetor tiver mais que 3 elementos, chama calc

            this.calc();

        }

    }

    getResult() {

        try {
            return eval(this._operation.join(""));
        } catch (e) {
            setTimeout(() => {


            }, 1);
            this.setError()
        }

    }

    calc() {

        let last = '';

        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {

            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];

        }

        if (this._operation.length > 3) {

            last = this._operation.pop();
            this._lastNumber = this.getResult();

        } else if (this._operation.length === 3) {

            this._lastNumber = this.getLastItem(false);

        }

        let result = this.getResult();

        //Tratando o porcento
        if (last === '%') {

            result /= 100;
            this._operation = [result];

        } else {

            this._operation = [result];

            if (last) this._operation.push(last);

        }

        this.setLastNumberToDisplay();

    }

    //Método para pegar o ultimo operador e ultimo número
    getLastItem(isOperator = true) {

        let lastItem;

        for (let i = this._operation.length - 1; i >= 0; i--) {
            
            //Se for um operador
            if (this.isOperator(this._operation[i]) === isOperator) {
                lastItem = this._operation[i];
                break;
            }

        }

        if (!lastItem) {

            lastItem = (isOperator) ? this._lastOperator : this._lastNumber;

        }

        return lastItem;

    }

    //Método para mostrar o ultimo número no display
    setLastNumberToDisplay() {

        let lastNumber = this.getLastItem(false);

        if (!lastNumber) lastNumber = 0;

        this.displayCalc = lastNumber;

    }
    addOperation(value) {

        if (isNaN(this.getLastOperation())) { //Se a ultima operação não for um número
            
            if (this.isOperator(value)) { //Se for um operador

                this.setLastOperation(value); //atribui à uultima operação o valor
             
            } else {

                this.pushOperation(value); //se não for um operador, ele adiciona ao array esse valor

                this.setLastNumberToDisplay(); 

            }
            
        } else { //Se for um número

            if (this.isOperator(value)) { //Se for u operador

                this.pushOperation(value);

                
            } else {
                //Transforma tudo em string e concatena
                let newValue = this.getLastOperation().toString() + value.toString();
                this.setLastOperation(newValue);


                //Atualiza o display
                this.setLastNumberToDisplay();

            }

        }

    }

    setError() {
        //Display recebe ERRO
        this.displayCalc = "Error";

    }

    //Função para adicionar o ponto
    addDot() {

        let lastOperation = this.getLastOperation();

        if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.setLastOperation('0.');
        } else {
            this.setLastOperation(lastOperation.toString() + '.');
        }

        this.setLastNumberToDisplay();

    }

    //Método para quando é executado um botão
    execBtn(value) {

        this.playAudio();

        switch (value) {
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.calc();
                break;
            case 'ponto':
                this.addDot();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
            
        }

    }

    initButtonsEvents() {

        //Selecionando todas as tags g filhas de class buttons e de parts
        let buttons = document.querySelectorAll("#buttons > g, #parts > g");

        //Aqui é aplicado um laço para cada btn
        buttons.forEach((btn, index) => {

           //Aqui é aplicado um laço que percorre cada btn e aplica o evento 'click drag'
            this.addEventListenerAll(btn, 'click drag', e => {
                
                //Aqui eu extraio o nome da classe e troco o "btn-", por "vazio"
                let textBtn = btn.className.baseVal.replace("btn-", "");
                
                //Chamando a função e passando o botão clicado como parâmetro; 
                this.execBtn(textBtn);

            });

            //Chamando método que adiciona muktiplos eventos.
            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {

                //Quando acontece os eventos o cursor fica com a mao;
                btn.style.cursor = "pointer";

            });

        });

    }

    //This method assigns to "displayDate" end "displayTime" the date end the Time in the specified formats
    setDisplayDateTime() {

        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale);

    }


//*********************************************************************************************** */
    //METHODS GETS AND SETS

    //This get method returns to page HTML the value in "_timeEl". 
    get displayTime() {
        return this._timeEl.innerHTML;
    }

    //This method assigns to "_timeEl" the parameter that come with displayTime
    set displayTime(value) {
        this._timeEl.innerHTML = value;
    }

    //This method returns to the HTML page, a modification with a date
    get displayDate() {
        return this._dateEl.innerHTML;
    }

    //This method assigns to "dateEl." the value that comes as a parameter in "displayDate"
    set displayDate(value) {
        this._dateEl.innerHTML = value;
    }

    //This method returns the instance of Date();
    get currentDate() {
        return new Date();
    }

    //Here the atribute "_currentDate" receives the parameter
    set currentDate(value) {
        this._currentDate = value;
    }

    get displayCalc() {

        return this._displayCalcEl.innerHTML;

    }

    set displayCalc(value) {

        if (value.toString().length > 10) {
            this.setError();
            return false;
        }

        this._displayCalcEl.innerHTML = value;
        
    }

}
