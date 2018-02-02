/*
 * generate combinations of a multiset, with repetitions <= 256
 */

let log = console.log
    , Geco = require( '../' )
    , k = 3
    , v = 4
    // alloc test buffer setting repetitions to 2 (1 byte) for all elements 
    , brep = Buffer.alloc( v, 2 )
    , iter = Geco.mget( k, v, brep )
    , buff = null
    , cnt = 0
    , num = -1
    , alen = brep.length
    , list = null
    , i = 0
    , arep = []
    ;

for ( ; i < brep.length; ++i ) arep.push( brep[ i ] )

log( `\n- repetitions buffer is:`, brep );
log( `- 1 byte per element, ${arep.length} different types` );

log( `\n- generating all multiset combinations of:` );
log( `  - ${k} elements chosen from ${v} different types` );
log( `  - repetitions for every type are set (at max) to:`, arep, '\n' );

for ( buff of iter ) {
    i = 0;
    list = Array( alen ).fill( 0 )
    for ( ; i < alen ; ++i ) {
        num = buff[ i ];
        if ( num ) list[ i ] = num;
    }
    log( `  ${++cnt}:`, buff, list );
}

log();