/*
 * Generate all different poker boards of 7 cards from a 52-card deck, 4 suits.
 * Then, generate all the (multiset) combinations of 7 elements chosen from 13
 * different values/types, with max (restricted) repetitions set to 4, for
 * every value/type.
 */

let log = console.log
    , Geco = require( '../' )
    , k = 7
    , v = 13
    , r = 4
    , iter = Geco.mget( k, v, r )
    , cards = 'AKQJT98765432'.split( '' ).reverse()
    , cnt = 0
    ;

// gen boards with cards
for ( let buff of iter ) {
    let board = [];
    for ( let j = 0; j < buff.length; j++ ) {
        let el = buff[ j ];
        while ( el ) {
            board.push( cards[ j ] );
            --el;
        }
    }
    log( `  ${++cnt}:`, buff, board, board.join( '' ) );
}
