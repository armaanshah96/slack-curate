#slashCurate
####**
#####*21 Dec 2016*

***
####Overview

Curate is a slash command that brings yesterday's news and highlights from your twitter feed to your channel. A bite sized tweet curator that helps you stay in the-know and keeps it seamless by never having to leave your slack environment.

Curate reads the desired users' tweets from the past day, and scores each tweet based on how many Twitter users favorited and retweeted. Only the best tweet from each account will be sent to the Slack channel. 

![slack-currency screenshot example](curate-example.png)

##  Setup
1. Create a Slack [slash command][slack-command] integration. After clicking 'Add Integration', scroll to 'Integration Settings' and note the token provided. Before we proceed, let's complete steps 2 and 3.
2. Create a Twitter [bot][twitter-bot] and leave placeholder text when prompted for a website url. Click create and select the "Keys and Access Tokens" tab. Note the 'Consumer Key', 'Consumer Secret', 'Access Token', and 'Access Token Secret'. 
3. Next, lets must deploy slack-curate on Heroku. To deploy `slack-curate` on Heroku, I recommend using this button to create your own copy of `slack-curate`:


Use the tokens we have generated to fill out of the necessary fields
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/matiassingers/slack-currency)


If you prefer manually deploying (assumes [Heroku CLI Toolbelt][toolbelt] is installed and that you have a [Heroku Account][heroku-account]):
```sh
  $ git clone git@github.com:armaanshah96/slack-curate.git && cd slack-curate
  $ npm install
  $ heroku login
  $ heroku create
  $ git push heroku master
  $ heroku open
```

After deploying (manually or by button), note the URL endpoint that Heroku provides (i.e. https://enigma-forest-61315.herokuapp.com/)


4. Now return to the slack slash command integration and add the URL endpoint under "Integration Settings". Make sure that the 'METHOD' field is set to POST. Otherwise, optionally fill out other fields on the page. Once you are done click 'Save Integration'


## Settings
Unless you used the Heroku button, each of the tokens that you have taken note of will need to be configured if you have manually deployed on heroku. One way to do that is by creating and filling out those fields in the 'Settings' under 'Config' of your heroku dashboard in the browser.

- `SLACK_TOKEN` 
- `TWITTER_CONSUMER_KEY`
- `TWITTER_CONSUMER_SECRET`
- `TWITTER_TOKEN`
- `TWITTER_TOKEN_SECRET`

## License

ISC © [Armaan Shah](http://armaanshah.me)

[twitter-bot]: https://apps.twitter.com/app/new
[slack-command]: https://my.slack.com/services/new/slash-commands
[toolbet]: https://devcenter.heroku.com/articles/heroku-cli
[heroku-account]: https://signup.heroku.com/