// A $( document ).ready() block.
$( document ).ready(function() {
  $( ".new-tweet textarea" ).on( "keyup", function() {
    var max = 140;
    var len = $(this).val().length;
    var char = max - len;
    if (len > max) {
      var color = "red";
    } else {
      var color = "black";
    }
    $('.counter').text(char).css({ color: color });

  });


});