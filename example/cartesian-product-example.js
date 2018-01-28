/*
 * a naive implementation of the Cartesian product between combinations
 */

let log = console.log
    , Geco = require( '../' )
    , cards = 'AKQJT98765432'.split( '' )
    , concat = !!true
    , j1 = 0
    , n1 = 5
    , k1 = 4
    , iter1 = Geco.gen( n1, k1, cards, concat )
    , j2 = 0
    , n2 = 3
    , k2 = 2
    , iter2 = Geco.gen( n2, k2, cards, concat )
    , comb = null
    , scomb = null
    , result = null
    ;

log();

for ( comb of iter1 ) {
    for ( scomb of iter2 ) {
        result = comb.concat( scomb );
        if ( concat ) result = Buffer.concat( result );
        log( ` (${++j2}): ${comb} ${scomb} -> ${result}` );
    }
    iter2 = Geco.gen( n2, k2, cards, concat );
    ++j1;
}

log();
log( `- cards: ${ cards.slice( 0, n1 ) }` );
log( `\n- (n1,k1): ${ n1 },${ k1 }` );
log( `  comb: ${j1}` );
log( `\n- (n2,k2): ${ n2 },${ k2 }` );
log( `  comb: ${j2 / j1}` );
log( `\n- tot comb: ${j2}` );
log();