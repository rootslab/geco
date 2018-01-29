/*
 * Geco, a CAT (Constant Amortized Time) recursive generator* 
 * for k-combinations, chosen from a given set S of n elements.
 *
 * Copyright(c) 2018-present Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.Geco = ( function () {

    const log = console.log
        , balloc = Buffer.alloc
        , bfrom = Buffer.from
        , bconcat = Buffer.concat
        , isBuffer = Buffer.isBuffer
        , Toni = require( 'toni' )
        ;
    return {
        // CAT generator for combinations without replacement 
        gen : function *( n, k, set ) {
            // k should be < n
            let list = set || 0
                , llen = list.length
                , ok = list && llen && n && ( n >= k ) && ( n <= llen )
                ;
            if ( ! ok  ) throw new RangeError( 'check input values' );
            const buff = balloc( n, 0 )
                // colex recursive generator
                , colex_gen = function *( n, k ) {
                    if ( n === 0 ) yield buff;
                    else {
                        if ( k < n ) {
                            buff[ n - 1 ] = 0;
                            yield* colex_gen( n - 1, k );
                        }
                        if ( k > 0 ) {
                            buff[ n - 1 ] = 1;
                            yield* colex_gen( n - 1, k - 1 );
                        }
                    }
                }
                // generating colex order for k <= n/2.
                , colex_gen_2 = function *( n, k ) {
                    if ( k === 0 ) yield buff;
                    else {
                        if ( k < n ) {
                            buff[ n - 1 ] = 0;
                            yield* colex_gen_2( n - 1, k );
                        }
                        buff[ n - 1 ] = 1;
                        yield* colex_gen_2( n - 1, k - 1);
                        buff[ n - 1 ] = 0;
                    }
                }
                // get iterator
                , iter = k > n / 2 ? colex_gen( n , k ) : colex_gen_2( n, k )
                ;
            // iterate on current result
            let result, comb, c
                ;
            for ( comb of iter ) {
                result = [];
                c = 0;
                for ( ; c < n; ++c )
                    if ( comb[ c ] ) result.push( list[ c ] ); 
                yield result;
            }
        }
        // CAT generator for combinations without replacement 
        , bgen : function *( n, k, set ) {
            // k should be < n
            let list = set || 0
                , llen = list.length
                , ok = list && llen && n && ( n >= k ) && ( n <= llen )
                ;
            if ( ! ok  ) throw new RangeError( 'check input values' );
            const bmap = Toni( n )
                // colex recursive generator
                , colex_gen = function *( n, k ) {
                    if ( n === 0 ) yield bmap;
                    else {
                        if ( k < n ) {
                            bmap.del( n - 1 );
                            yield* colex_gen( n - 1, k );
                        }
                        if ( k > 0 ) {
                            bmap.add( n - 1 );
                            yield* colex_gen( n - 1, k - 1 );
                        }
                    }
                }
                // generating colex order for k <= n/2.
                , colex_gen_2 = function *( n, k ) {
                    if ( k === 0 ) yield bmap;
                    else {
                        if ( k < n ) {
                            bmap.del( n - 1 );
                            yield* colex_gen_2( n - 1, k );
                        }
                        bmap.add( n - 1 );
                        yield* colex_gen_2( n - 1, k - 1);
                        bmap.del( n - 1 );
                    }
                }
                // get iterator
                , iter = k > n / 2 ? colex_gen( n , k ) : colex_gen_2( n, k )
                ;
            // iterate on current result
            let result, bm, b
                ;
            for ( bm of iter ) {
                result = [];
                b = 0;
                for ( ; b < n; ++b )
                    if ( bm.chk( b ) ) result.push( list[ b ] ); 
                yield result;
            }
        }
    }
    ;

} )();
