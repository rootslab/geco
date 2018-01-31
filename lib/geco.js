/*
 * Geco, a CAT (Constant Amortized Time) recursive generator* 
 * for k-combinations, chosen from a given set S of n elements.
 *
 * https://en.wikipedia.org/wiki/Lexicographical_order#Colexicographic_order
 *
 * Copyright(c) 2018-present Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.Geco = ( function () {

    const balloc = Buffer.alloc
        , Toni = require( 'toni' )
        ;
    return {
        // CAT generator for combinations without replacement 
        getbuff : function ( n, k ) {
            if ( ! n || ( n < k ) )
                throw new RangeError( 'check input values' )
                ;
            // buffer for generating combinations
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
                ;
            return ( k > n / 2 ) ?
                colex_gen( n , k ) :
                colex_gen_2( n, k )
                ;
        }
        , getbmap : function ( n, k ) {
            if ( ! n || ( n < k ) )
                throw new RangeError( 'check input values' )
                ;
            // bitmap for generating combinations
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
                ;
            return ( k > n / 2 ) ?
                colex_gen( n , k ) :
                colex_gen_2( n, k )
                ;
        }
        , gen : function *( n, k, set, bitmap ) {
            // k should be < n
            let list = set || 0
                , llen = list.length
                , ok = list && llen && n && ( n >= k ) && ( n <= llen )
                , result, comb, c, bm, b
                , iter = null
                ;
            if ( ! ok  )
                throw new RangeError( 'check input values' )
                ;
            // iterate on current result
            if ( bitmap ) {
                // use Toni bitmap
                iter = this.getbmap( n, k );
                for ( bm of iter ) {
                    result = [];
                    b = 0;
                    for ( ; b < n; ++b )
                        if ( bm.chk( b ) ) result.push( list[ b ] ); 
                    yield result;
                }
                return;
            }
            // use a Buffer
            iter = this.getbuff( n, k );
            for ( comb of iter ) {
                result = [];
                c = 0;
                for ( ; c < n; ++c )
                    if ( comb[ c ] ) result.push( list[ c ] ); 
                yield result;
            }
        }
        // get total number of combinations
        , count : ( n, k ) => {
            let p = [ 1, 1 ]
                , c = 0
                ;
            for ( ; c < k; ++c ) {
                p[ 0 ] *= n - c;
                p[ 1 ] *= k - c;
            }
            return p[ 0 ] / p[ 1 ];
        }
    }
    ;

} )();
