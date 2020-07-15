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
      <p>${tweet['content']['text']}</p>
      <footer class='tweet-footer'>
        <p>${String(new Date(tweet.created_at)).slice(3,15)}</p>
        <p>icon</p>
      </footer>
      </article>  
    `;
    const $tweet = element;
    return $tweet;
  };
  const renderTweets = function(tweets) {
    for (let i = 0; i < tweets.length; i++) {
      const theTweet = createTweetElement(tweets[i]);
      $('#tweets-container').append(theTweet);
    }
  };

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  renderTweets(data);
 


});