$(document).ready(function() {
  // --- our code goes here ---
  $('#tweet-text').on('keypress', function(event) {
    //console.log('keydown');
    let count = $(this).val().length + 1;
    //console.log(count);
    //console.log(this);
    keysLeft = 140 - count;
    const $textArea = $(this);
    const $tweetForm = $textArea.parent();
    const $counter = $tweetForm.find('.counter');
    $counter.html(keysLeft);
    if (keysLeft < 0) {
      $counter.addClass("red");
    } else {
      $counter.removeClass("red");
    }
  });
});