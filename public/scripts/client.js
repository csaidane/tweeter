/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  /*
  const calculateDate = function(date){
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const firstDate = new Date(Date.now());
  const secondDate = new Date(date);
  const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
  return diffDays;
  }*/

  const htmlEncode = function(str) {
    return String(str).replace(/[^\w. ]/gi, function(c) {
      return '&#' + c.charCodeAt(0) + ';';
    });
  };

  const createTweetElement = function(tweet) {
    const element = `
    <article class="tweet">
      <header class='tweet-header'>
        <div class="user-tag">
          <img class="avatar" src=${tweet.user.avatars}>
          <p>${tweet.user.name}</p>
        </div>
        <p class='usertag'>${tweet.user.handle}</p>
      </header>
      <p>${htmlEncode(tweet['content']['text'])}</p>
      <footer class='tweet-footer'>
        <p>${String(new Date(tweet.created_at)).slice(3,15)}</p>
        <p>icon</p>
      </footer>
      </article>  
    `;
    const $tweet = $(element);
    return $tweet;
  };
  const renderTweets = function(tweets) {
    for (let i = 0; i < tweets.length; i++) {
      const theTweet = createTweetElement(tweets[i]);
      $('#tweets-container').prepend(theTweet);
    }
  };
  
  
  $('.tweet-form').on('submit', function(event) {
    event.preventDefault();
    let data = $(this).serialize();
    if (data.slice(5) !== null && data.slice(5) !== "" && data.slice(5).length < 140) {
      $.ajax({
        type: "POST",
        url: '/tweets/',
        data: data,
      })
        .then(()=> {
          if (('.error-empty').length) {
            $('.error-empty').slideUp('slow');
          }
          if (('.error-length').length) {
            $('.error-length').slideUp('slow');
          }
          loadTweets();
        });
    } else if (data.slice(5).length > 140) {
      $('.error-length').slideDown("slow");
    } else if (data.slice(5) === null || data.slice(5) === "") {
      $('.error-empty').slideDown("slow");
    }
  });

  const loadTweets = function() {
    $('#tweets-container').empty();
    $.get('/tweets/')
      .then((tweetArray)=>{
        renderTweets(tweetArray);
      });
  };

  loadTweets();
 
});