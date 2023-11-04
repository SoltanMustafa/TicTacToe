export default class View {

    $ = {};
    $$ ={};

    /*
    Asagida document.querySelector ile document.querySelectorAll-u 
    qs ve qsAll cevirdikden sonra qs ve qsAll-lari bir-birinden
    daha aydin oxunaqli olsun deye tekleri tek $ all olanlari ise
    cut $$ ile gostermek ucun yuxarida bir dene de $${} obyekti yaratdiq
    */

    constructor() {
        // this.$.resetBtn = document.querySelector('[data-id="reset-button"]');
        // this.$.newGameBtn = document.querySelector('[data-id="new-game-button"]');
        // this.$.boxes = document.querySelectorAll('[data-id="box"]');
        // this.$.notification = document.querySelector('[data-id="notification-holder"]');
        // this.$.playerWonText = document.querySelector('[data-id="player-won"]');
        // this.$.playAgainBtn = document.querySelector('[data-id="play-again-btn"]');
        // this.$.turn = document.querySelector('[data-id="x-turn"]');

        
        //Single Elements
        this.$.resetBtn = this.#qs('[data-id="reset-button"]');
        this.$.newGameBtn = this.#qs('[data-id="new-game-button"]');
        this.$.notification = this.#qs('[data-id="notification-holder"]');
        this.$.playerWonText = this.#qs('[data-id="player-won"]');
        this.$.playAgainBtn = this.#qs('[data-id="play-again-btn"]');
        this.$.turn = this.#qs('[data-id="x-turn"]');
        this.$.p1Wins = this.#qs('[data-id="p1-wins"]');
        this.$.p2Wins = this.#qs('[data-id="p2-wins"]');
        this.$.draw = this.#qs('[data-id="draw-score"]');


        //Element lists
        this.$$.boxes = this.#qsAll('[data-id="box"]');

        //Ui-only event listeners
    }


    /*
    Register all the event listeners
    */


    bindGameResetEvent(handler){
        this.$.resetBtn.addEventListener("click", handler);
        this.$.playAgainBtn.addEventListener("click", handler);
    }

    bindNewRoundEvent(handler){
        this.$.newGameBtn.addEventListener("click", handler);
    }

    bindPlayerMoveEvent(handler) {
        this.$$.boxes.forEach(box => {
            box.addEventListener("click", () => handler(box));
        });
    }

    /*
    DOM helper methods

    Video-da burda sag ustdeki menunu acmaq ucun toggle methodundan istifade edilir.
    Ve bununla gosterir ki, View terefinde de Controller olmadan da bezi komekci
    funksiyalar isledile biler. Amma men menu-nun acilib yigilmasini hover ile etdi-
    yimden bu methodu burda istifade etmedim. Amma burada asagidaki komekci
    methodlardan istifade edeceyik. 
    */

    updateScoreBord(p1Wins, p2Wins, draw){
        this.$.p1Wins.innerText = `${p1Wins}`;
        this.$.p2Wins.innerText = `${p2Wins}`;
        this.$.draw.innerText = `${draw}`;
    }

    openNotification(message){
        this.$.notification.classList.remove('hidden')
        this.$.playerWonText.innerText = message
    }

    closeNotification(){
        this.$.notification.classList.add('hidden')
    }

    clearMoves(){
        this.$$.boxes.forEach(box => {
            box.replaceChildren()
        })
    }

    handlePlayerMove(boxEl, player){
        const boxIcon = document.createElement('i');
        boxIcon.classList.add("fa-solid", player.iconClass);
        boxEl.replaceChildren(boxIcon);
    }

    // player = 1|| 2
    setTurnIndicator(player){
        const icon = document.createElement('i');
        const label = document.createElement('p');

        label.classList.add(player.colorClass);

        icon.classList.add("fa-solid", player.iconClass, player.colorClass);
        label.innerText = `${player.name}, you're up!`;

        this.$.turn.replaceChildren(icon, label);
    }

    /*
    Isimizi asanlashirmaq ucun bezi komekci methodlardan istifade ede bilerik. Meselen
    hem yuxarida querselectorla secdiyimiz elementlerde yazilari qislatmaq ucun,
    hem de eger sechdiyimiz element yoxsa bundan xeberdar olmaq ucun asagidaki methodu
    ishlede bilerik. Asagida qs(selector) ile yaratdigimiz methodda el adindan bir 
    deyisken yaradir, sonra hemin deyishkene document.querySelector(selector) ile 
    secilen bir sheyi menimsedirik. sonra if ile sorgu vererek el-in dogru olub-olmadigini
    yoxlayir. Dogru deyirse Error verir. Dogrudursa el-i qaytarir. Indi yuxarida genish
    shekilde yazilmish document.querySelector("") lari qs ile deyisheceyik. Amma neyi
    deyishdiyimizi bilmek ucun, evelki hallarini kommente atacagiq. onune # qoyaraq ise
    kodumuzu private-gizli edirik. Eyni sheyi qsAll ile de edirik.
    */

    #qs(selector, parent){
        const el = parent ? document.querySelector(selector) : document.querySelector(selector);

        if(!el) throw new Error('Could not find elements');

        return el;
    }

    #qsAll(selector){
        const elList = document.querySelectorAll(selector);

        if(!elList) throw new Error('Could not find elements');

        return elList;
    }
}
