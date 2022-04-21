let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    time: 0,
    segundosUnidade:0,
    segundosDezena:0,
    minutosUnidade:0,
    minutosDezena:0,
    pontosTotal:0,
    moves: 0,
    point: 0,

    techs: ['Júpiter',
        'Lua',
        'Marte',
        'Mercúrio',
        'Terra',
        'Plutão',
        'Saturno',
        'Sol',
        'Urano',
        'Vênus'],

    cards: null,

    setCard: function (id) {

        let card = this.cards.filter(card => card.id === id)[0];
        console.log(card);
        if (card.flipped || this.lockMode) {
            return false;
        }

        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.moves += 1
            this.lockMode = true;
            return true;
        }

    },

    checkMatch: function () {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    unflipCards() {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver() {

        return this.cards.filter(card => !card.flipped).length == 0;
    },





    createCardsFromTechs: function () {

        this.cards = [];

        this.techs.forEach((tech) => {
            this.cards.push(this.createPairFromTech(tech));
        })
        this.cards = this.cards.flatMap(pair => pair);
        this.shuffleCards();
        return this.cards;
    },

    createPairFromTech: function (tech) {

        return [{
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.createIdWithTech(tech),
            icon: tech,
            flipped: false,
        }]

    },

    createIdWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    shuffleCards: function (cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        while (currentIndex !== 0) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }

    },

    checkGameOver(){
        return this.cards.filter( card=> !card.flipped).length == 0;       
     },
     
     timer(){
        this.time++;
       if(this.segundosUnidade < 9 && this.segundosDezena >= 0){
         this.segundosUnidade++
       }else if(this.segundosDezena < 5){
        this.segundosUnidade = 0;  
        this.segundosDezena++
       }else if(this.segundosDezena <= 5 && this.segundosUnidade <= 9){
        this.segundosDezena = 0;
        this.segundosUnidade = 0;  
        this.minutosUnidade++
       }
},

     points(){
        
        this.pontosTotal = Math.round((this.point * 1000) / ((this.moves + this.time) / 4));
        console.log(this.pontosTotal)
       

     }






}