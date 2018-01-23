window.onload = function(){
    

    //Card constructor object
    function Card(suit, value)
    {
        this.suit = suit;
        this.value = value;
    }

    // Deck constructor
    function Deck() 
    {
        this.deck = [];
    }

    //Create deck with given requirements.
    Deck.prototype.BuildDeck = function()
    {
        this.suits = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];
        this.values = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
        this.deck = new Array(52);

        var i, j;
        for (i = 0; i < this.suits.length; i++)
        {
            for (j = 0; j < this.values.length; j++)
            {
                this.deck.push(new Card(this.suits[i], this.values[j]));
            }
        }
    }

    //Shuffle the deck that calls this function
    function Shuffle(deckArray) 
    {
        var i, j, n, temp;
        for (i = 0; i < n; i++)
        {
            for (j = 0; j < deckArray.length; j++)
            {
                k = Math.floor(Math.random() * deckArray.length);
                temp = deckArray[j];
                deckArray[j] = deckArray[k];
                deckArray[k] = temp;
            }
        }
        return deckArray;
    }

    //Returns or "deals" a card when called between two players
    Deck.prototype.Deal = function() 
    {
        for (i = 0; i < this.deck.length; i++)
        {
            if (i%2)
            {
                player1.deck.push(this.deck[i]);
            }
            else
            {
                player2.deck.push(this.deck[i]);
            }
        }
    };

    //Player constructor
    function Player()
    {
        this.deck = [];
    }

    //Game Constructor
    function War()
    {
        this.victor;
        this.loser;
    }

    //Generates the 2 game players with shuffled and split deck
    War.prototype.Generate = function()
    {
        player1 = new Player();
        player2 = new Player();

        //Starting deck to deal to players
        var startingDeck = new Deck();
        startingDeck.BuildDeck();
        Shuffle(startingDeck.deck);

        startingDeck.Deal();
    }

    game = new War();
    game.Generate;

    //Webpage Logic------------------

    //New game button
    $("#newGame").click(function(){
        game = new War();
        game.Generate();
        $("#gameStatus").html(" ");
    });

    var flipped = false;

    //Flip card button
    $("#flip").click(function(){
        if (player1.deck.length < 1){
            $("#gameStatus").html("You lose.");
        }
        else if (player2.deck.length < 1){
            $("#gameStatus").html("You win!");
        } else {
            $("#player1Card").removeClass('blank');
            // console.log("removed, maybe?");
            $("#player2Card").removeClass('blank');
            $("#player1Card").html(player1.deck[player1.deck.length-1].numb);
            $("#player2Card").html(player2.deck[player2.deck.length-1].numb);
        }
        flipped = true;
    });


    //Take a new card button
    $("#take").click(function(){
        //makes sure the cards have been flipped first
        if (flipped === true){
            game.compareCards();
            $("#player1Card").html(" ");
            $("#player2Card").html(" ");
            $("#player1Card").addClass('blank');
            $("#player2Card").addClass('blank');
        }
        flipped = false;
    });

    War.prototype.compareCards = function()
    {
    //If player1 wins...
        var player1Card = player1.deck[player1.deck.length-1];
        var player2Card = player2.deck[player2.deck.length-1];

        if(player1Card.numb > player2Card.numb){
            //put the card at the end of the player1 deck
            player1.deck.unshift(player2Card);
            //and take it out of the player2 deck.
            temp = player1.deck.pop();
            player1.deck.unshift(temp);
            player2.deck.pop();
        } else if (player1Card.numb < player2Card.numb){
            player2.deck.unshift(player1Card);
            temp = player2.deck.pop();
            player2.deck.unshift(temp);
            player1.deck.pop();

        }
        //Auto draw to break tie 
        else 
        {
            $("#gameStatus").html("WAR!");
            
        }
        console.log("Jack's Deck: " + player1.deck.length)
        console.log("Jill's Deck: " + player2.deck.length)

    }
}