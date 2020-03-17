# How to setup Facebook Login natively in your React Native app

![Facebook Login](./docs/add-facebook-login.png 'Add FB login')

## Start a new project

```
git clone https://github.com/ykbryan/react-native-navigation-starter-app YOUR-PROJECT-NAME
rm -Rf .git
```

## Check if you can run the project

```
yarn && yarn start
```

note: if you see the screenshot below, select the correct version as shown in the screenshot

![native-base version](./docs/select-native-base-version.png 'Select nativebase version')

## Setup Facebook App

Go to https://developers.facebook.com/ and create your app

![FB App](./docs/create-fb-app.png 'Sample FB App')

![FB Credentials](./docs/app-id-secret.png 'FB App Credentials')

## Setup AWS via Amplify CLI

```
amplify init

```

Enter your App information:

```
? Enter a name for the project amplifyauthdemo
? Enter a name for the environment prod
? Choose your default editor: Visual Studio Code
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using react-native
? Source Directory Path:  /
? Distribution Directory Path: /
? Build Command:  npm run-script build
? Start Command: npm run-script start
Using default provider  awscloudformation

For more information on AWS Profiles, see:
https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html

? Do you want to use an AWS profile? Yes
? Please choose the profile you want to use default
```

## Add FB Auth

```
amplify add auth
```

```
Using service: Cognito, provided by: awscloudformation

 The current configured provider is Amazon Cognito.

 Do you want to use the default authentication and security configuration?
 Default configuration with Social Provider (Federation)
 Warning: you will not be able to edit these selections.
 How do you want users to be able to sign in? Username
 Do you want to configure advanced settings? No, I am done.
 What domain name prefix you want us to create for you? amplifyauthdemo
 Enter your redirect signin URI: http://localhost/
? Do you want to add another redirect signin URI No
 Enter your redirect signout URI: http://localhost/
? Do you want to add another redirect signout URI No
 Select the social providers you want to configure for your user pool: Fac
ebook

 You've opted to allow users to authenticate via Facebook.  If you haven't
 already, you'll need to go to https://developers.facebook.com and create
an App ID.

 Enter your Facebook App ID for your OAuth flow:  xxxxx
 Enter your Facebook App Secret for your OAuth flow:  xxxxx
d416afc55a6f
Successfully added resource amplifyauthdemo00e40f7e locally
```

```
amplify push
```

## Go to Facebook and update the URLs

Copy your cognito hosted endpoints
It should look something like this https://amplifyauthdemo-prod.auth.us-east-1.amazoncognito.com/

Go back to your Facebook dashboard and update the basic Settings

![Update FB Settings](./docs/update-basic-settings.png 'Update FB Settings')

SCroll down and update

![Update more info below](./docs/update-data-protection.png 'Update more info below')

## Add Facebook Login

Select Facebook Login

![Select FB Login](./docs/select-facebook-login.png 'Select Facebook Login')

Select WWW/Web

![Select web](./docs/select-web.png 'Select WWW')

input the OAuth Endpoint URL with /oauth2/idpresponse appended into Site URL:

```
https://amplifyauthdemo-prod.auth.us-east-1.amazoncognito.com/oauth2/idpresponse
```

![Enter Info](./docs/enter-website-info.png 'Enter more information')
![Enter Oauth](./docs/enter-valid-oauth.png 'Enter Valid Oauth')

Go "Live" and press "Switch" on the popup.

Press **SAVE** and **NEXT** all the way

![Go live](./docs/facebook-go-live.png 'Go Live')

## Go to AWS Console and update info in Federated Identity

Go to https://us-west-2.console.aws.amazon.com/cognito/federated/

Select the right region

Select the correct identity pool

Select **Edit identity pool**

![Cognito Identity Pool](./docs/cognito-identity-pool.png 'Cognito Identity Pool')

Go to Authentication providers
Select **Facebook** in the tabs
Press UNLOCK and add your Facebook App ID

![Update FB App ID](./docs/update-federated-app-id.png 'Update FB App ID')

Scroll down and press SAVE

## Go back to your app

```
yarn start
```

## FAQ

Token is not from a supported provider of this identity pool.

You have not added the Facebook App Id in the identity pool at Federated Identities

## References

https://aws-amplify.github.io/docs/js/authentication
https://docs.expo.io/versions/latest/sdk/facebook/
https://dev.to/dabit3/the-complete-guide-to-user-authentication-with-the-amplify-framework-2inh
