import $ from 'jquery';
import 'jquery-validation';



$.validator.addMethod('emailId', function (value, element) {

    return this.optional(element) || /^[\w][\w.-]{0,127}$/.test(value)
  
  }, "Please enter a valid Docker image tag, like 'latest' or '1.10.0'");

  $.validator.addMethod( "lettersonly", function( value, element ) {
    return this.optional( element ) || /^[a-z]+$/i.test( value );
  }, "Letters only please" );

  $.validator.addMethod( "integer", function( value, element ) {
    return this.optional( element ) || /^-?\d+$/.test( value );
  }, "A positive or negative non-decimal number please" );
<<<<<<< HEAD

  $.validator.addMethod( "lettersonlywhitespace", function( value, element ) {
    return this.optional( element ) || /^[a-zA-Z\s]*$/.test( value );
  }, "Letters or whitespace only please" );

  $.validator.addMethod( "lettersonlyspecialchar", function( value, element ) {
    return this.optional( element ) || /^\D+$/.test( value );
  }, "Letters or special character  only please" );
  
  $.validator.addMethod( "positiveintegerdecimal", function( value, element ) {
    return this.optional( element ) || /^[+]?([0-9]+(?:[\.][0-9]*)?|\.[0-9]+)$/.test( value );
  }, "Positive integer or decimal number please" );

  
  $.validator.addMethod( "positiveinteger", function( value, element ) {
    return this.optional( element ) || /^[1-9]\d*$/.test( value );
  }, "Positive integer value please" );
=======
  
>>>>>>> 4b02a829c246df966f6e24b1cf2ce67285c00d70
