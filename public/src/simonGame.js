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

    $('#strictCheckBox').change(function() {
        if (gameObject.strict === false) {
            gameObject.strict = true;
        } else {
            gameObject.strict = false;
        }
        newGame();
    });

    function handleClick(square) {
        let clickedSquare = '#' + square;
        sound(clickedSquare);
        gameObject.player.push(clickedSquare);
        console.log(gameObject.player);
        checkIfCorrect(clickedSquare);
    }

    function checkIfCorrect(square) {
        if (gameObject.player.length === gameObject.currentGame.length) {
            if (gameObject.player.toString() === gameObject.currentGame.toString()) {
                sound(square);
                alert('Good job! Next round!');
                addCount();
            } else {
                if (gameObject.strict === true) {
                    alert('Wrong! In strict mode, so you start over!');
                    newGame();
                } else {
                    alert('Wrong moves! Try again!');
                    showSequence();
                }
            }
        }
    }

    function clearGame() {
        gameObject.currentGame = [];
        gameObject.count = 0;
        addCount();
    }

    function newGame() {
        clearGame();
    }

    function showIndividual(square) {
        $(square).css('opacity', '1');
        sound(square);
        setTimeout(function() {
            $(square).css('opacity', '0.3');
        }, 350);
    }

    function sound(square) {
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

    function showSequence() {
        let i = 0;

        let moves = setInterval(function() {
            showIndividual(gameObject.currentGame[i]);
            i++;
            if (i >= gameObject.currentGame.length) {
                clearInterval(moves);
            }
        }, 600);
        clearPlayer();
    }

    function clearPlayer() {
        gameObject.player = [];
    }

    function startSequence() {
        gameObject.currentGame.push(gameObject.possibilities[(Math.floor(Math.random() * 4))]);
        //console.log(gameObject.currentGame);
        showSequence();
    }


    function addCount() {
        gameObject.count++;
        $('#gameCount').html('Game Count: ' + gameObject.count);
        startSequence();
    }

    newGame();
});
