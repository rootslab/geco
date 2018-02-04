/*
 * Geco, a CAT (Constant Amortized Time) recursive generator* 
 * for k-combinations, chosen from a given set S of n elements,
 * with and without replacement.
 *
 * https://en.wikipedia.org/wiki/Lexicographical_order#Colexicographic_order
 *
 * Copyright(c) 2018-present Guglielmo Ferri <44gatti@gmail.com>
 * MIT Licensed
 */

exports.Geco = ( function () {

    const balloc = Buffer.alloc
        , Toni = require( 'toni' )
        , comb = require( './comb-set' )
        , multi = require( './comb-multiset' )
        ;
    return Object.assign( comb, multi )
    ;

} )();
