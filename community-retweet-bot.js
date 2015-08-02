var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.Server(app),
    Twit = require('twit'),
    tweetQueue = [];

var loggingEnabled = true;

function checkTweetQueue(){
  if (tweetQueue.length > 0){
    var newTweet = tweetQueue.shift();
    if (loggingEnabled === true){
      console.log('Posting new tweet:');
      console.log(newTweet);    
    }

    twitter.post('statuses/retweet/:id',
    {
      id: newTweet.id
    }, function(err, data, response) {
      if (loggingEnabled === true){
        if (err){
          console.log('ERROR');
          console.log(err);          
        }
        else{
          console.log('NO ERROR');          
        }
      }
    });
  }

  setTimeout(function(){
    checkTweetQueue();
  }, 36000);
}

var twitter = new Twit({
  consumer_key: 'LOREM',
  consumer_secret: 'IPSUM',
  access_token: 'DOLOR',
  access_token_secret: 'SIT'
});


var stream = twitter.stream('statuses/filter', { track: [
                                                    '@botwikidotorg'
//                                                  '#botally'
                                                  ]
                                                });

stream.on('tweet', function (tweet) {
  var whiteList = [];
  twitter.get('friends/ids', { screen_name: 'botwikidotorg', stringify_ids: true },  function (err, data, response) {
    (function(tweet){
      if (data.ids.indexOf(tweet.user.id_str) > -1){
        if (loggingEnabled === true){
          console.log('New Tweet!');
          console.log(tweet.id + ': ' + tweet.text);
        }
        tweetQueue.push({
          id: tweet.id_str
        });    
      }
      else{
        if (loggingEnabled === true){
          console.log('User not whitelisted.');
        }
      }
    })(tweet);
  });
});

checkTweetQueue();


app.get('/', function (req, res) {
  res.send('Hello, I\'m running the <a href="https://twitter.com/botwikidotorg">@botwikidotorg</a> bot!');
});

app.use(express.static(__dirname + '/public'));

server.listen(3007, function(){
  console.log('Express server listening on port 3007');
});
