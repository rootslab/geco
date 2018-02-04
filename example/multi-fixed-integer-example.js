/*
 * generate combinations of a multiset, using a single integer
 * for specifying the same number of repetitions, for every type.
 */

let log = console.log
    , Geco = require( '../' )
    , k = 3
    , v = 4
    , r = 2
    // alloc test buffer setting repetitions to 2 (1 byte) for all elements 
    , iter = Geco.mget( k, v, r )
    , buff = null
    , cnt = 0
    , num = -1
    , list = null
    , i = 0
    // only for logging
    // byte(s) for representing v
    , blen = ( r - 1 ) >> 16 ? 4 : ( r - 1 ) >> 8 ? 2 : 1
    , arep = Array( v ).fill( r )
    ;

log( `\n- repetitions are represented by a single integer: ${r}` );
log( `- ${blen} byte(s) per element, ${v} different types` );
log( '\n- generating all multiset combinations of:' );
log( `  - ${k} elements chosen from ${v} different types` );
log( '  - for every type, repetitions are (at max):', arep );
log();

for ( buff of iter ) {
    i = 0;
    list = Array( v * blen ).fill( 0 )
    for ( ; i < v * blen ; i += blen ) {
        num = buff[ i ];
        if ( num ) list[ i ] = num;
    }
    log( `  ${++cnt}:`, buff, list );
}

log();