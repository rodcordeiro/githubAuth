# To get a token you must follow a few steps
## Creat an OAuth app
[Here's the github doc](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps/#2-users-are-redirected-back-to-your-site-by-github)
 - Follow the instructions on the documentation to create your OAuth App ([follow this link to create](https://github.com/settings/applications/new)).
 - On your app create a redirection to:
`https://github.com/login/oauth/authorize?client_id=YOUR_APP_CLIENT_ID&redirect_uri=YOUR_CALLBACK_URL&scope=THE_ACCESS_SCOPE&state=YOUR_STRING&allow_signup=true`
The **YOUR_CALLBACK_URL** is the url off your app site, on this case it will be *http://localhost:3333/user*
- It will be redirected to the *YOUR_CALLBACK_URL* with the query params **code** and **state**. You will use the *code* to make a POST request to: `https://github.com/login/oauth/access_token` with some params on the body:
```Json
{
  "client_id": "YOUR_APP_CLIENT_ID",
  "client_secret": "YOUR_APP_CLIENT_SECRET",
  "code": "THE_CODE_RECEIVED",
  "state":"YOUR_STRING",
  "redirect_uri":"YOUR_CALLBACK_URL"
}
```
- It will return a Json or xml with the following spec:
```Json
{
  "access_token":"SOME_TOKEN",
  "scope":"THE_ACCESS_SCOPE",
  "token_type":"bearer"
}
```
