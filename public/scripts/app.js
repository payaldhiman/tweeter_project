/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  $('#addtweet').submit(function(event) {
    event.preventDefault();
    if (validate($(this))) {
      $.ajax({
        url: '/tweets/',
        method: 'POST',
        data: $(this).serialize(),
        success: (s) => {
          loadTweets()
          $('#addtweet').find('textarea').val("");
        }
      });
    } else {
      alert("Invalid input");
    }
  });

  function validate(target) {
    var input = target.find('textarea').val();
    return input.length <= 140 && input.trim().length !== 0;
  }

  $('.input').on('click', function() {
    $('.new-tweet').slideToggle(function() {
      $(this).find('textarea').select();
    });
  });

  function loadTweets() {
    $.ajax({
      method: 'GET',
      url: '/tweets'
    })
    .done(renderTweets);
  }

  $('.new-tweet').hide();
  loadTweets();
});

function renderTweets(tweets) {
  // loops through tweets
  tweets.forEach(function(tweet) {
    var $newTweet = createTweetElement(tweet);
    $('#tweets-container').prepend($newTweet);
  });
}

function createTweetElement(data) {
  var $img = $("<img>").addClass("avatars");
  $img.attr('src', data.user.avatars.small);
  var $h3 = $("<h3>");
  $h3.text(data.user.name);
  var $headerP = $("<p>");
  $headerP.text(data.user.handle);
  var $header = $("<header>").addClass("tweet-header");
  $header.append($img);
  $header.append($h3);
  $header.append($headerP);

  var $sectionP = $("<p>");
  $sectionP.text(data.content.text);
  var $section = $("<section>").addClass("tweet-section");
  $section.append($sectionP);

  var $footerP = $("<p>");
  $footerP.text(moment(data.created_at).format('llll'));
  var $footer = $("<footer>").addClass("tweet-footer");
  var $iconsflag = $("<i>").addClass("fa fa-flag");
  var $iconsretweet = $("<i>").addClass("fa fa-retweet");
  var $iconsheart = $("<i>").addClass("fa fa-heart");
  var $footerdiv = $("<div>").text(data.likes).addClass("likecounter").attr("data-like", "like");
  $footer.append($footerdiv);
  $footer.append($footerP);
  $footer.append($iconsheart);
  $footer.append($iconsretweet);
  $footer.append($iconsflag);


  var $article = $("<article>").addClass("new-article");
  $article.append($header);
  $article.append($section);
  $article.append($footer);
  $article.data('id', data._id)

  return $article;
}