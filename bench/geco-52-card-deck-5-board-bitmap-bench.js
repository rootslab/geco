/*
 * benchmark for listing all possible combinations/boards of 5 cards,
 * chosen from a deck of 52 cards (13 different card values and 4 
 * different suits), without repetition/replacement.
 */

let log = console.log
    , bfrom = Buffer.from
    , spades = 'A♠ K♠ Q♠ J♠ T♠ 9♠ 8♠ 7♠ 6♠ 5♠ 4♠ 3♠ 2♠ '
    , clubs = 'A♣ K♣ Q♣ J♣ T♣ 9♣ 8♣ 7♣ 6♣ 5♣ 4♣ 3♣ 2♣ '
    , diamonds = 'A♦ K♦ Q♦ J♦ T♦ 9♦ 8♦ 7♦ 6♦ 5♦ 4♦ 3♦ 2♦ '
    , hearts = 'A♥ K♥ Q♥ J♥ T♥ 9♥ 8♥ 7♥ 6♥ 5♥ 4♥ 3♥ 2♥'
    , deck = ( spades + clubs + diamonds + hearts ).split( ' ' )
    // buffer variant
    , bdeck = deck.map( x => bfrom( x ) )
    , dlen = deck.length
    , Geco = require( '../' )
    // get k cards
    , cards = 5
    // get the iterable generator, using bitmap
    , iter = Geco.bgen( deck.length, cards, deck )
    , cnt = 0
    , board = null
    // get total number of combinations
    , tot = ( () => {
        let i = 0
            , f1 = 1
            , f2 = 1
            ;
        for ( ; i < cards; ++i ) {
            f1 *= dlen - i;
            f2 *= cards - i;
        }
        return ( f1 / f2 );
    } ) ()
    , etime = 0
    , stime = Date.now()
    ;

log( '- generate all boards of 5 cards from a deck of 52, without repetition/replacement' );
log( `\n- the 52-card deck is:\n  ${ spades }\n  ${clubs}\n  ${diamonds}\n  ${hearts}` );

log( `\n- generating all ${ cards }-combinations (${ tot })..\n` );

for ( board of iter ) {
    ++cnt;
    if ( ( ( 100 * cnt / tot ) ) % 10 === 0 ) 
        log( ` (${ ++cnt }): ${board} [${ ( 100 * cnt / tot ).toFixed( 5 ) } %] ${ ( ( Date.now() - stime ) / 1000 ).toFixed( 2 ) } secs` );
}

etime = ( ( Date.now() - stime ) / 1000 ).toFixed( 2 );

log();
log( `- total: ${ cnt } combinations` );
log( `- rate:  ${ ( cnt / etime ) >>> 0 } comb/sec` );
log( `- time:  ${ etime } secs` );
