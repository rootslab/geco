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
        ;
    return {
        // CAT generator for combinations without replacement 
        gen : function *( n, k, set, concat ) {
            // k should be < n
            let s = set || 0
                , slen = s.length
                , ok = s && slen && n && ( n >= k ) && ( n <= slen )
                ;
            if ( ! ok  ) throw new RangeError( 'check input values' );
            // colex recursive generator
            const buff = balloc( n, 0 )
                // CAT generator 
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
            for ( const comb of iter ) {
                let c = 0
                    , result = []
                    , el = null
                    ;
                for ( ; c < comb.length; ++c ) {
                    el = concat ? bfrom( set[ c ] ) : set[ c ];
                    if ( comb[ c ] ) result.push( el ); 
                }
                // log( ++cnt, comb, result );
                yield concat ? [ bconcat( result ) ] : result;
            }
        }
    }
    ;

} )();
