$(document).ready(function() {

    function makeOpacityOne() { //helper functions for hovering
        return function() {
            $(this).css('opacity', '1');
        }
    }

    function makeOpacityPointThree() {
        return function() {
            $(this).css('opacity', '0.3');
        }
    }
    //make squares non-opaque
    $('#redSquare').hover(makeOpacityOne(), makeOpacityPointThree());
    $('#blueSquare').hover(makeOpacityOne(), makeOpacityPointThree());
    $('#orangeSquare').hover(makeOpacityOne(), makeOpacityPointThree());
    $('#greenSquare').hover(makeOpacityOne(), makeOpacityPointThree());



    let gameObject = {
        count: 0,
        possibilities: ['#redSquare', '#blueSquare', '#orangeSquare', '#greenSquare'],
        currentGame: [],
        player: [],
        sound: {
            red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
            blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
            orange: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
            green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
        },
        strict: false,
    }

    //handle click events
    $('#redSquare').click(function() {
        handleClick(this.id);
    });
    $('#blueSquare').click(function() {
        handleClick(this.id);
    });
    $('#orangeSquare').click(function() {
        handleClick(this.id);
    });
    $('#greenSquare').click(function() {
        handleClick(this.id);
    });

    $('#restartGame').click(function() {
        clearGame();
    });
    //handle the checking of the checkbox for strict mode
    $('#strictCheckBox').change(function() {
        if (gameObject.strict === false) {
            gameObject.strict = true;
        } else {
            gameObject.strict = false;
        }
        newGame();
    });

    //click handler
    function handleClick(square) {
        let clickedSquare = '#' + square; //to make it id selector for jQuery
        sound(clickedSquare);
        gameObject.player.push(clickedSquare); //push the clickedsquare into array
        checkIfCorrect(clickedSquare); //check if the sequence is correct
    }

    function checkIfCorrect(square) {
        if (gameObject.player.length === gameObject.currentGame.length) { //if lengths are the same
            if (gameObject.player.toString() === gameObject.currentGame.toString()) { //if the two arrays are the same as a string
                sound(square); //it's right
                if (gameObject.count === 20) {
                    $('#messageCenter').html('You won! Congratulations!');
                    setTimeout(function() {
                        $('#messageCenter').html('');
                        newGame();
                    }, 1000);
                } else {
                    $('#messageCenter').html('Good job! Next level!');
                    setTimeout(function() {
                        $('#messageCenter').html('');
                        addCount();
                    }, 1000);
                }
            } else { //it's wrong
                if (gameObject.strict === true) { //start game over
                    $('#messageCenter').html('Wrong! In strict mode, so you start over!');
                    setTimeout(function() {
                        $('#messageCenter').html('');
                        newGame();
                    }, 1000);
                } else { //give many chances
                    $('#messageCenter').html('Wrong moves! Try again!');
                    setTimeout(function() {
                        $('#messageCenter').html('');
                        showSequence();
                    }, 1000);

                }
            }
        }
    }

    function sound(square) { //switch statement for handling sounds
        switch (square) {
            case '#redSquare':
                gameObject.sound.red.play();
                break;
            case '#blueSquare':
                gameObject.sound.blue.play();
                break;
            case '#orangeSquare':
                gameObject.sound.orange.play();
                break;
            case '#greenSquare':
                gameObject.sound.green.play();
                break;
        }
    }

    function clearPlayer() {
        gameObject.player = []; //empty the array
    }

    function showIndividual(square) { //function to showIndividual square getting highlighted
        $(square).css('opacity', '1');
        sound(square);
        setTimeout(function() {
            $(square).css('opacity', '0.3');
        }, 350);
    }

    function showSequence() {
        let i = 0;

        let moves = setInterval(function() {
            showIndividual(gameObject.currentGame[i]);
            i++;
            if (i >= gameObject.currentGame.length) {
                clearInterval(moves);
            }
        }, 600); //show sequence making each one last 600 ms
        clearPlayer();
    }

    function startSequence() { //add a random square to sequence
        gameObject.currentGame.push(gameObject.possibilities[(Math.floor(Math.random() * 4))]);
        //console.log(gameObject.currentGame);
        showSequence();
    }

    function addCount() { //iterartor and beginning of game
        gameObject.count++;
        $('#gameCount').html('Game Count: ' + gameObject.count);
        startSequence();
    }

    function clearGame() { //initialize game as if it's a clean slate
        gameObject.currentGame = [];
        gameObject.count = 0;
        addCount();
    }

    function newGame() { //calls clearGame()
        clearGame();
    }

    newGame();
});
