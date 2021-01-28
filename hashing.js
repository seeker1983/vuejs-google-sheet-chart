var hashing = {
  encode : function(str) {
   var cipher = new Cipher(hashing.KEY);
   var encryptedMessage = cipher.encrypt(str);
   
   return encryptedMessage;
  },
  
  decode: function (str) {
   var cipher = new Cipher(hashing.KEY);
   var decryptedMessage = cipher.decrypt(str);
   
   return decryptedMessage;
  },
  
  MD5:function ( input, isShortMode )
  {
      var isShortMode = !!isShortMode; // Be sure to be bool
      var txtHash = '';
      var rawHash = Utilities.computeDigest(
                        Utilities.DigestAlgorithm.MD5,
                        input );
   
      if ( ! isShortMode ) {
          for ( i = 0; i < rawHash.length; i++ ) {
  
              var hashVal = rawHash[i];
  
              if ( hashVal < 0 ) {
                  hashVal += 256;
              };
              if ( hashVal.toString( 16 ).length == 1 ) {
                  txtHash += '0';
              };
              txtHash += hashVal.toString( 16 );
          };
      } else {
          for ( j = 0; j < 16; j += 8 ) {
  
              hashVal = ( rawHash[j]   + rawHash[j+1] + rawHash[j+2] + rawHash[j+3] )
                      ^ ( rawHash[j+4] + rawHash[j+5] + rawHash[j+6] + rawHash[j+7] );
  
              if ( hashVal < 0 ) {
                  hashVal += 1024;
              };
              if ( hashVal.toString( 36 ).length == 1 ) {
                  txtHash += "0";
              };
  
              txtHash += hashVal.toString( 36 );
          };
      };
  
      // change below to "txtHash.toUpperCase()" if needed
      return txtHash;
  
  },

  
  KEY : 'WWEEDASKHDGLKAHSDUTUKDJLJAGASNMMLQWIURNR'

};

function test_hashing() {
  var str = 'krupod@gmail.com';
  var enc = hashing.encode(str);
  var dec = hashing.decode(enc);
  
  Logger.log([str, enc, dec, str===dec]);
}