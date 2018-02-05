/*
 * Generate all different poker boards of 5 different card values. (high-card and straight boards)
 *
 * We could generate them, using:
 *
 * - (multiset) combinations of 5 elements chosen from 13 different
 *   values/types, with max (restricted) repetitions set to 1, for
 *   every value/type.
 *
 * - combinations of 5 elements from a single set of 13 values 
 */

let log = console.log
    , assert = require( 'assert' )
    , Geco = require( '../' )
    , k = 5
    , v = 13
    , r = 1
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
    log( `  ${++cnt}:`, buff, board );
}

// it's the same to count combinations without repetitions
assert.ok( cnt, Geco.cnt( v, k ) );
