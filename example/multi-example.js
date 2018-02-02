/*
 * generate combinations of a multiset, with repetitions > 256
 */

let log = console.log
    , Geco = require( '../' )
    , k = 2
    , v = 3
    , el_bytes = 2
    // alloc test buffer setting repetitions to 257 (2 bytes) for every element 
    , brep = Buffer.alloc( v * el_bytes, 1 )
    , iter = Geco.mget( k, v, brep )
    , buff = null
    , cnt = 0
    , num = -1
    , alen = brep.length / el_bytes
    , list = null
    , i = 0
    , arep = []
    ;

for ( ; i < brep.length; i += el_bytes ) arep.push( brep.readIntBE( i, el_bytes ) )

log( `\n- repetitions buffer is:`, brep );
log( `- ${el_bytes} bytes per element, ${arep.length} different types` );

log( `\n- generating all combinations of:` );
log( `  - ${k} elements chosen from ${v} different types` );
log( `  - repetitions for every type are set (at max) to:`, arep, '\n' );

for ( buff of iter ) {
    i = 0;
    list = Array( alen ).fill( 0 )
    for ( ; i < alen ; ++i ) {
        num = buff.readIntBE( i * el_bytes, el_bytes );
        if ( num ) list[ i ] = num;
    }
    log( `  ${++cnt}:`, buff, list );
}

log();