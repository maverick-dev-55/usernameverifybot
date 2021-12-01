# Discord Username verification
Simple discord bot used for verifying usernames for your game (or other service) that is already optimized to run on heroku, all you need to do is create the bots account in the developer portal (there are many tutorials like [this one](https://www.youtube.com/watch?v=b61kcgfOm_4)), then copy your discord bot token (youll need it later)
if you dont already have a heroku account go to [The signup page](https://signup.heroku.com/)  
this should take you to to [the dashboard](https://dashboard.heroku.com/), now create an app [**use this tutorial**](https://devcenter.heroku.com/articles/creating-apps), after you have installed the heroku CLI
run this command
```
heroku config:set PASSWORD=[bot token you copied earlier]
```
and now to publish your app you need to push to git (run build.bat "Initial Commit", if you are on linux (or MacOS), create a new file called build.sh, open it and copy the contents from build.bat without "@echo off") [make sure you install git first](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)