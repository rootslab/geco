/*
 * get all combinations of k cards chosen from n values,
 * without replacement/repetition 
 */

let log = console.log
    , Geco = require( '../' )
    , cards = 'AKQJT98765432'.split( '' )
    , j = 0
    , n = 5
    , k = 4
    , iter = Geco.gen( n, k, cards )
    ;

log();

for ( const comb of iter )
    log( ` (${++j}): ${comb}` );

log();
log( `- cards: ${ cards.slice( 0, n ) }` );
log( `- (n,k): ${ n },${ k }` );
log( `- comb: ${j}` );
log();