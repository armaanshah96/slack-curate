#slashCurate
####**
#####*21 Dec 2016*

***
####Overview
cuRate is a Slack bot that automatically curates your Twitter feed. 

Get the relevant info for your team sent straight to the channel of your choice! 

cuRate reads the desired users' tweets from the past day, and scores each tweet based on how many Twitter users favorited and retweeted. Only the best tweet from each account will be sent to the Slack channel. 

# slack-currency [![Build Status][travis-badge]][travis] [![Coverage Status][coveralls-badge]][coveralls]
> slack command for converting currency

![slack-currency screenshot example](screenshot-slack-reply.png)


## Running locally
```sh
$ git clone git@github.com:matiassingers/slack-currency.git && cd slack-currency
$ npm install
$ npm start
```

Your local copy should now be running at [`localhost:1337`](http://localhost:1337).

## Deploying to Heroku
```sh
$ heroku create
$ git push heroku master
$ heroku open
```

## Slack setup
1. Create a Slack [slash command][slack-command] integration. After clicking 'Add Integration', scroll to 'Integration Settings' and note the token provided. Before we proceed, let's complete steps 2 and 3.
2. Create a Twitter [bot][twitter-bot] and leave placeholder text when prompted for a website url. Click create and select the "Keys and Access Tokens" tab. Note the 'Consumer Key', 'Consumer Secret', 'Access Token', and 'Access Token Secret'. 
3. Before we finish adding the slack integration, we must deploy slack-curate on Heroku. To deploy your copy of `slack-curate` on Heroku, I recommend using this easy button to create your own copy of `slack-curate`:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/matiassingers/slack-currency)

If you prefer manually deploying your own (assumes [Heroku CLI Toolbelt][:
  * heroku create
  * git push heroku master

After deploying (manually or by button), note the URL endpoint that Heroku provides (i.e. https://enigma-forest-61315.herokuapp.com/ <- heroku randomly generates urls)


4. Now return to the slack slash command integration and add the URL endpoint


## Settings
The following environment variables needs to be set for the command to work, if you use the Heroku Button above it'll ask for these automatically.

- `SLACK_HOOK_URL` - *Slack [incoming WebHook][slack-webhook] URL*
- `USERNAME` - *Username to use when replying with the conversion result (default: dorrars)*
- `EMOJI` - *Emoji icon to use when replying with the conversion result (default: :moneybag:)*
- `DEFAULT_CURRENCY` - *Default currency to convert to if no second currency is specified (default: DKK)*
- `SLACK_TOKEN` - *Additional security step: Slack [slash command][slack-command] token for verification that the request came from your Slack team (not required)*
- `OPENEXCHANGERATES_APP_ID` - *Specify a different key for openexchangerates.org in case the already provided key has been revoked (not required)*


## Related
- [`generator-slack-command`](https://github.com/matiassingers/generator-slack-command)
- [`slack-movie`](https://github.com/matiassingers/slack-movie)
- [`currency`](https://github.com/srn/currency)


## License

MIT © [Matias Singers](http://mts.io)

[twitter-bot]: https://apps.twitter.com/app/new
[slack-command]: https://my.slack.com/services/new/slash-commands
[travis]: https://travis-ci.org/matiassingers/slack-currency
[travis-badge]: http://img.shields.io/travis/matiassingers/slack-currency.svg?style=flat-square
[coveralls]: https://coveralls.io/r/matiassingers/slack-currency
[coveralls-badge]: http://img.shields.io/coveralls/matiassingers/slack-currency.svg?style=flat-square
[toolbet]: https://devcenter.heroku.com/articles/heroku-cli