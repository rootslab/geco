/*
 * Geco, a CAT (Constant Amortized Time) recursive generator* 
 * for k-combinations, chosen from a given set S of n elements.
 *
 * https://en.wikipedia.org/wiki/Lexicographical_order#Colexicographic_order
 *
 * Copyright(c) 2018-present Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

module.exports = ( function () {

    const balloc = Buffer.alloc
        , bfrom = Buffer.from
        , Toni = require( 'toni' )
        , mgen = function ( k, v, brep ) {
            const blen = brep.length
                // get the total number of elements
                , total = ( () => {
                    let [ i, t ] = [ 1, brep[ 0 ] ];
                    if ( blen > 1 )
                        for ( ; i < blen; ++i ) t += brep[ i ];
                    return t;
                } )()
                // choose right fn
                , up = k > total >> 1
                // init the correct gen buffer ( v === blen )
                , buff = up ? bfrom( brep ) : balloc( v, 0 )
                // k > n/2
                , colex_gen = function *( k, v, tot ) {
                    if ( k === tot ) yield buff;
                    else {
                        let c = v - 1
                            , occ = brep[ c ]
                            , r = tot - occ
                            , l = k > r ? k - r : 0
                            , m = occ < k ? occ : k
                            ;
                        for ( ; l <= m; ++l ) {
                            buff[ c ] = l;
                            yield* colex_gen( k - l, c, r );
                            buff[ c ] = 0;
                        }
                    }
                }
                // k <= n/2
                , colex_gen_2 = function *( k, v, tot ) {
                    if ( k === 0 ) yield buff;
                    else {
                        let c = v - 1
                            , occ = brep[ c ]
                            , r = tot - occ
                            , l = k > r ? k - r : 0
                            , m = occ < k ? occ : k
                            ;
                        for ( ; l <= m; ++l ) {
                            buff[ c ] = l;
                            yield* colex_gen_2( k - l, c, r );
                            buff[ c ] = 0;
                        }
                    }
                }
            ;
            return up ?
                colex_gen( k, v, total ) :
                colex_gen_2( k, v, total )
                ;
        }
        ;
    return {
        mget : function ( k, v, brep ) {
            let blen = brep.length
                , b = blen / v
                , read = null
                , write = null
                // get the total number of elements
                , total = -1
                ;

            // TODO, check b, brep length
            // choose the correct read fn
            if ( b === 4 ) [ read, write ] = [ 'readUInt32BE', 'writeUInt32BE' ];
            else if ( b === 2 ) [ read, write ] = [ 'readUInt16BE', 'writeUInt16BE' ];
            // else return the 1-byte version 
            else return mgen( k, v, brep );
            // get the total number of elements
            total = ( () => {
                let [ i, t ] = [ b, brep[ read ]( 0 ) ];
                if ( blen > b )
                    for ( ; i < blen; i += b ) t += brep[ read ]( i );
                return t;
            } )();
            // choose right fn
            let up = k > total >> 1
                // init the correct gen buffer
                , buff = up ? bfrom( brep ) : balloc( blen, 0 )
                // k > n/2
                , colex_gen = function *( k, v, tot ) {
                    if ( k === tot ) yield buff;
                    else {
                        let c = v - 1
                            , occ = brep[ read ]( c * b )
                            , r = tot - occ
                            , l = k > r ? k - r : 0
                            , m = occ < k ? occ : k
                            ;
                        for ( ; l <= m; ++l ) {
                            // buff[ c ] = l;
                            buff[ write ]( l, c * b );
                            yield* colex_gen( k - l, c, r );
                            // buff[ c ] = 0;
                            buff[ write ]( 0, c * b );
                        }
                    }
                }
                // k <= n/2
                , colex_gen_2 = function *( k, v, tot ) {
                    if ( k === 0 ) yield buff;
                    else {
                        let c = v - 1
                            , occ = brep[ read ]( c * b )
                            , r = tot - occ
                            , l = k > r ? k - r : 0
                            , m = occ < k ? occ : k
                            ;
                        // log( c, occ, tot, r, l, m )
                        for ( ; l <= m; ++l ) {
                            // buff[ c ] = l;
                            buff[ write ]( l, c * b );
                            yield* colex_gen_2( k - l, c, r );
                            // buff[ c ] = 0;
                            buff[ write ]( 0, c * b );
                        }
                    }
                }
                ;
            return up ?
                colex_gen( k, v, total ) :
                colex_gen_2( k, v, total )
            ;
        }
        
    }
    ;

} )();
