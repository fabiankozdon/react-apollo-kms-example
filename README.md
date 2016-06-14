# react-apollo-kms-example
![](http://i.imgur.com/UvGvpwk.png)

## Getting Started

After [downloading this example](https://github.com/graphcool-examples/react-apollo-kms-example/archive/master.zip) please follow these steps.

### 1. Create an account

To run this example, create a [graph.cool](http://graph.cool) account and **copy your `PROJECT_ID`**. This shouldn't take longer than a minute. We promise!

This is how our GraphQL data model looks like:

```graphql
type Kitten {
  name: String!
  pictureUrl: String!
}

type Group {
  name: String!
  kittens: [Kitten]
}
```


### 2. Configure app data endpoint

Open `src/app.js` and paste your `PROJECT_ID` to the following line:

```js
const networkInterface = createNetworkInterface('https://api.graph.cool/simple/v1/__PROJECT_ID__')
```


### 3. Run the example

You're done configuring the example application. Please run the following command and open [localhost:3000](http://localhost:3000) in your browser. Have fun exploring! 🎉

```sh
npm install
npm start
```


## Help & Community [![Slack Status](https://slack.graph.cool/badge.svg)](https://slack.graph.cool)

Join our [Slack community](http://slack.graph.cool/) if you run into issues or have questions. We love talking to you!

![](http://i.imgur.com/5RHR6Ku.png)
