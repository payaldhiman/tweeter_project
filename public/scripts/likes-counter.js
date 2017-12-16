// A $( document ).ready() block.
$( document ).ready(function() {


  $( "body" ).on('click', '.fa-heart', function() {
    var likeCounter = $(this).closest('article').find('.likecounter');
    var count = likeCounter.html();
    var tweetid = $(this).closest('article').data('id');
    console.log(tweetid);
    if(likeCounter.attr('data-like') == "unlike") {
      count--;
      likeCounter.html(count);
      likeCounter.attr('data-like', "like");
    } else {
      count++;
      likeCounter.html(count);
      likeCounter.attr('data-like', "unlike");
    }

    console.log(count);

    $.ajax({
      url: `/tweets/${tweetid}/likes`,
      method: 'POST',
      data: {"likes": count},
      success: (s) => {
        console.log("data added ");
      }
    });

  });
});