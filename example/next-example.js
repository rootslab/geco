/*
 * simple next() example
 */

let log = console.log
    , Geco = require( '../' )
    , cards = 'AKQJT98765432'.split( '' )
    , j = 0
    , n = 5
    , k = 4
    , iter = Geco.gen( n, k, cards )
    , comb = null
    ;

log();

while ( true ) {
    comb = iter.next();
    if ( comb.done ) {
        log( ' done!');
        break;
    }
    log( ` (${++j}): ${comb.value}` );
}

log();
log( `- cards: ${ cards.slice( 0, n ) }` );
log( `- (n,k): ${ n },${ k }` );
log( `- comb: ${j}` );
log();