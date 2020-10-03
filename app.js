/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var score, roundScore, activePlayer, gamePlaying, prevDice;


init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        //each time someone hits the button a random number is generated 
        var dice= Math.floor(Math.random()*6)+1; //generate a random number from 1-6
        //var dice=6; //generate a random number from 1-6
        //display the result 
        var diceDom=document.querySelector('.dice');
        diceDom.style.display='block';
        diceDom.src='dice-'+dice+'.png';
         // update the round score If rolled number was not 1
        if(dice!==1){ 
            console.log(dice+' this is dice');
            console.log(prevDice + ' this is prevDice');
            if(dice===6 && prevDice===6){
                document.querySelector('#current-'+activePlayer).textContent='double sixs';
                roundScore=0;
            }else{
                //update score
                roundScore=roundScore+dice;
                document.querySelector('#current-'+activePlayer).textContent=roundScore;
                prevDice=dice;
            }
        }else{
            //next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){

    if(gamePlaying){
         //add the current score to Global score 
        score[activePlayer]+=roundScore;
        // Update the UI
        document.querySelector('#score-'+activePlayer).textContent=score[activePlayer];
        //Check if player won the game 
        if(score[activePlayer]>=document.querySelector('#scrset').value){
            //end Game
            endGame();
        }else{
            //next Player
            nextPlayer();
        }
    }

})

//new game functioonality 
document.querySelector('.btn-new').addEventListener('click', init);


//declare the functions that will be used again and again 

function nextPlayer(){
    //reset the prevDice
    prevDice=0;
    //make the roundScore=0
    roundScore=0;
    //next player with ternary operator 
    activePlayer===0?activePlayer=1:activePlayer=0;
    console.log(activePlayer);
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    //toggle the active panel 
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

      //hide the dice 
      document.querySelector('.dice').style.display='none';
}

function endGame(){
    document.querySelector('#score-'+activePlayer).textContent='Winner!';
    //apply the winner class
    document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
    //hide the dice 
    document.querySelector('.dice').style.display='none';
    //remove the active class from the player
    document.querySelector('.player-'+ activePlayer +'-panel').classList.remove('active');

    //set the gamePlaying to false
    gamePlaying=false;

    //hide the roll and hold btns 
    // document.querySelector('.btn-roll').style.display='none';
    // document.querySelector('.btn-hold').style.display='none';

}

function init(){
    score=[0,0];
    roundScore=0;
    activePlayer=0; // 0 or 1 to read the score from the array
    gamePlaying= true;
    prevDice=0;
    
    document.getElementById('score-0').textContent='0';
    document.getElementById('score-1').textContent='0';
    document.getElementById('current-0').textContent='0';
    document.getElementById('current-1').textContent='0';

    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    //remove the class winner
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
}

// click the new Game the game starts from the beginning 



//1) 2 sixs in a raw player looses all his score 
//tip save the previous dice roll and the current 

//2) add an input field to the html where the players can set the winning score . use the .value property

// 3) add a second dice --> the player looses his score if one of them is 1