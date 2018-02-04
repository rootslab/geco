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
        , isBuffer = Buffer.isBuffer
        , isInteger = Number.isInteger
        , mgen = function ( k, v, rep ) {
            const rlen = rep.length
                // get the total number of elements
                , total = ( () => {
                    let [ i, t ] = [ 1, rep[ 0 ] ];
                    if ( rlen > 1 )
                        for ( ; i < rlen; ++i ) t += rep[ i ];
                    return t;
                } )()
                // choose the correct fn
                , up = k > total >> 1
                // init the correct gen buffer ( v === rlen )
                , buff = up ? bfrom( rep ) : balloc( v, 0 )
                // k > n/2
                , colex_gen = function *( k, v, tot ) {
                    if ( k === tot ) yield buff;
                    else {
                        let c = v - 1
                            , occ = rep[ c ]
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
                            , occ = rep[ c ]
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
            // check k range
            if ( k >= total ) new RangeError( 'k value should be lesser than total elements' );
            return up ?
                colex_gen( k, v, total ) :
                colex_gen_2( k, v, total )
                ;
        }
        ;
    return {
        mget : function ( k, v, rep ) {
            let rlen = -1
                , b = -1
                , read = null
                , write = null
                // get the total number of elements
                , total = -1
                , ok = k && v && rep
                ;
            if ( ! ok ) return new RangeError( 'missing or wrong input values' );
            // check repetitions type
            if ( isBuffer( rep ) && ( rlen = rep.length ) ) {
                b = rlen / v;
                if ( b === 1 ) return mgen( k, v, rep );
                if ( ( b !== 2 ) && ( b !== 4 ) )
                    return new RangeError( 'repetitions buffer length should be a multiple of v' );
                // set the correct read/write fn, only 4, 2, 1 bytes are allowed
                [ read, write ] = [ `readUInt${ b << 3 }BE`, `writeUInt${ b << 3 }BE` ];
                // get the total number of elements
                total = ( () => {
                    let [ i, t ] = [ b, rep[ read ]( 0 ) ];
                    if ( rlen > b )
                        for ( ; i < rlen; i += b ) t += rep[ read ]( i );
                    return t;
                } )();
            } else if ( isInteger( rep ) ) {
                // use rep value as default repetitions for every value, build a buffer accordingly
                if ( rep < 257 ) return mgen( k, v, balloc( v, rep ) );
                if ( rep < 65537 ) b = 2;
                else if ( rep < 4294967297 ) b = 4;
                else return new RangeError( 'repetitions should be < 2^32 + 1' );
                rlen = v << ( b >>> 1 );
                total = v * rep;
                // set the correct read/write fn, only 4, 2, 1 bytes are allowed
                [ read, write ] = [ `readUInt${ b << 3 }BE`, `writeUInt${ b << 3 }BE` ];
                rep = balloc( rlen );
                // fill the reference buffer of repetitions with v identical values
                for ( let i = 0; i < rlen; i += b ) rep[ write ]( v );
            } else return new RangeError( 'repetitions should be represented as: a buffer or an integer' );
            // check k range
            if ( k >= total ) new RangeError( 'k should be lesser than the total sum of repetitions' );
            // choose the correct colex fn
            let up = k > total >> 1
                // init the correct gen buffer
                , buff = up ? bfrom( rep ) : balloc( rlen, 0 )
                // k > n/2
                , colex_gen = function *( k, v, tot ) {
                    if ( k === tot ) yield buff;
                    else {
                        let c = v - 1
                            , occ = rep[ read ]( c * b )
                            , r = tot - occ
                            , l = k > r ? k - r : 0
                            , m = occ < k ? occ : k
                            ;
                        for ( ; l <= m; ++l ) {
                            buff[ write ]( l, c * b );
                            yield* colex_gen( k - l, c, r );
                            buff[ write ]( 0, c * b );
                        }
                    }
                }
                // k <= n/2
                , colex_gen_2 = function *( k, v, tot ) {
                    if ( k === 0 ) yield buff;
                    else {
                        let c = v - 1
                            , occ = rep[ read ]( c * b )
                            , r = tot - occ
                            , l = k > r ? k - r : 0
                            , m = occ < k ? occ : k
                            ;
                        for ( ; l <= m; ++l ) {
                            buff[ write ]( l, c * b );
                            yield* colex_gen_2( k - l, c, r );
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
