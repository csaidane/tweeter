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
  //returns element to be displayed on the page
  const createTweetElement = function(tweet) {
    const tweetDate = new Date(tweet.created_at);
    const oneDay = 24 * 60 * 60 * 1000; // hoursminutesseconds*milliseconds
    const firstDate = new Date(tweetDate);
    const secondDate = new Date();
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    let daysAgo = "";
    diffDays === 0 ? daysAgo = "Today" : daysAgo = diffDays + " Day(s) Ago";
    
    const element = `
    <article class="tweet">
      <header class='tweet-header'>
        <div class="user-tag">
          <img class="avatar" src=${tweet.user.avatars}>
          <p class='nameUser'>${tweet.user.name}</p>
        </div>
        <p class='userhandle'>${tweet.user.handle}</p>
      </header>
      <p class='user-text'>${htmlEncode(tweet['content']['text'])}</p>
      <footer class='tweet-footer'>
        <p>${daysAgo}</p>
        <div>
        <img class="icon" src="/images/icon-flag.png">
        <img class="icon" src="/images/icon-heart.png">
        <img class="icon" src="/images/icon-retweet.png">
        </div>
      </footer>
      </article>  
    `;
    const $tweet = $(element);
    return $tweet;
  };
  //displays all tweets, including new additions (prepends for chronology)
  const renderTweets = function(tweets) {
    for (let i = 0; i < tweets.length; i++) {
      const theTweet = createTweetElement(tweets[i]);
      $('#tweets-container').prepend(theTweet);
    }
  };
  
  //makes post request for launching a new tweet, implements display or error messages if the input is inadequate
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
          $("#tweet-text").val("");
          loadTweets();
        });

    } else if (data.slice(5).length > 140) {
      console.log(data.slice(5));
      console.log(data.slice(5).length);
      $('.error-length').slideDown("slow");
    } else if (data.slice(5) === null || data.slice(5) === "") {
      $('.error-empty').slideDown("slow");
    }
  });
  //loads and renders all tweets
  const loadTweets = function() {
    $('#tweets-container').empty();
    $.get('/tweets/')
      .then((tweetArray)=>{
        renderTweets(tweetArray);
      });
  };

  loadTweets();
 
});