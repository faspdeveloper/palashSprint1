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
  