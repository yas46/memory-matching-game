// images: 
// card0.jpg is back of the cards
// card1.jpg has the same face image as card9.jpg
// card2.jpg has the same face image as card10.jpg
// card3.jpg has the same face image as card11.jpg
// card4.jpg has the same face image as card12.jpg
// ...

function reloadPage() {
    window.location.reload();
}

jQuery( document ).ready(function( $ ) {

    var cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16], pairs = 0, pick1 = null, pick2 = null, totalClicks = 0;
    var ArrIndexDiff = cards.length/2;

    function shuffle(array) {
        var m = array.length, t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = array[m];
            array[m] = array[i];
            array[i] = t;
        }
        console.log(array);
        return array;
    }

    function deactivateButtons() {
        cards.forEach( function(x) {
            $('#c' + x).unbind('click');
        });
        setTimeout( function() {
            cards.forEach( function(x) {
                $('#c' + x).bind( "click", function() {
                    ardClick(x);
                });
            });
        }, 2000);
    }

    function display(array) {
        array.forEach( function(x) {
            $('#game-container').append('<img class="card" id="c' + x + '" src="/images/card0.jpg">');
            $('#c' + x).bind( "click", function() {
                cardClick(x);
            });
            $('#c' + x).css('cursor', 'pointer');
        });
    }

    function checkPicks() {
        if (Math.abs(pick1-pick2) === ArrIndexDiff) {
            $('#c' + pick1).css('opacity', '0');
            $('#c' + pick2).css('opacity', '0');
            $('#c' + pick1).unbind('click');
            $('#c' + pick2).unbind('click');
            pairs++;
            console.log(pairs);
        } else {
            $('#c' + pick1).attr('src', '/images/card0.jpg');
            $('#c' + pick2).attr('src', '/images/card0.jpg');
            $('#c' + pick1).css('cursor', 'pointer');
            $('#c' + pick2).css('cursor', 'pointer');
        }
        pick1 = null;
        pick2 = null;
        if (pairs >= 8) {
            $('#game-container').css('display', 'none');
            $('#num-result').html("<h2>Number of moves: " + totalClicks + "</h2>");
            $('#result').css('display', 'block');
            $('#btn-container').css('display', 'block');
        }
    }

    function cardClick(num) {
        $('#c' + num).attr('src', '/images/card' + num + '.jpg');
        $('#c' + num).css('cursor', 'default');
        if (pick1 === null) {
            pick1 = num;
        } else if (pick2 === null) {
            deactivateButtons();
            pick2 = num;
            totalClicks++;
            setTimeout( function() {
                checkPicks();
            }, 2000);
        }
    }

    display(shuffle(cards));

});
