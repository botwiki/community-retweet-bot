# Community Retweet Bot

## About

A simple node.js-based Twitter bot (it uses the [ttezel/twit](https://github.com/ttezel/twit) node.js library) that retweets @ mentions (you can also modify it to use hashtags) from whitelisted accounts. To add an account to the whitelist, simply follow it while logged into Twitter as the bot.

A typical use case would be a group of people running a community who want to use a single Twitter account to share news. Instead of having to share passwords and switch accounts, each person can simply send out a tweet while @ mentioning the bot, who will automatically retweet the message.

You can also avoid the situation where someone follows both the "community account" and one (or more) of the community maintainers and sees the same tweet twice (or more times). By starting their tweet with ```@[bot's name]```, the original tweet is hidden from the followers' timelines as a part of a "private" conversation. 

This is essentially the source code of [@botwikidotorg](https://twitter.com/botwikidotorg), the official [Botwiki](http://botwiki.org/) Twitter bot.

## Customization

There is really no need to change the ```community-retweet-bot.js``` file name, as it doesn't really show up anywhere. You can name your actual Twitter bot anything you want.

If you do decide to rename the file, you will also need to change it in the following places:

- ```gulpfile.js``` -- lines 9 and 10
- ```package.json``` -- lines 2 and 5

Next, you will have to update the name of your Twitter bot inside ```community-retweet-bot.js``` on line 53. Note that it's also possible to track hashtags -- see line 54 in the same file.

## Running your bot

If you're completely new to running Twitter bots, oh well, you will need to be familiar with the following:

- [node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/)
- [express](http://expressjs.com/)
- [gulp.js](http://gulpjs.com/)
- [Setting up a node.js app on Digital Ocean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-14-04) -- or you can use [OpenShift](https://developers.openshift.com/en/node-js-overview.html), which is free (Digital Ocean starts at $5/month)

After you download this repo, first rename the file ```config-example.js``` to ```config.js``` and put your  [Twitter API keys/secrets](https://apps.twitter.com/) here.

After this, you will just need to run ```sudo npm install``` and then ```gulp``` to get this bot running locally. Refer to the tutorials above to learn how to run it on a server.

I created this bot mainly for people who have basic experience with the things mentioned above, so don't hesitate to reach out to me via [email](mailto:stefan@fourtonfish.com) or [Twitter](https://twitter.com/fourtonfish) if you have any questions that I can help you with.

## Notes and technical details

I might need to clean up the codebase a bit as I've been pretty much just reusing the same *gulpfile* since I learned about gulp. I am also reusing a modified code for the [bartleby_scrvnr](http://botwiki.org/bots/twitterbots/bartleby_scrvnr) bot, which does one neat thing where it loads the Tweets into a queue before actually posting them after a randomized delay.

This was done for two reasons: to avoid hitting the [API rate limits](https://support.twitter.com/articles/15364), but also to make it more "human" (it doesn't just immediately respond, it actually takes its time to "read your tweet and respond").


Now, I left this delay (without the randomization) in the code, although it may not really be necessary for your particular use case. If you know what you're doing, you can modify the line 39 in ```community-retweet-bot.js``` to something like:

```
  setTimeout(function(){
    checkTweetQueue();
  }, 1000);
```

Or simply:

```
  checkTweetQueue();
```

(Or you can just rewrite the whole thing so it doesn't use a queue at all.)
