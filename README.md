# **Northcoders News**

Introducing my Northcoders News React App; a front-end platform for users to post news articles, post/delete comments and vote on posted content.

Created using [Node.js](https://nodejs.org/en/) v10.4.0 and [React](https://reactjs.org/) v16.4.1; styled using CSS and [Bulma](https://bulma.io/) v0.7.1.

## **Getting Started**

These instructions will get you a copy of the project up and running on your local machine, for development purposes.

## **Setup Instructions**

1.  Fork this repository to your own GitHub account.

2.  Clone your fork of this repository to your local machine and `cd` into it:

```
$ git clone <your fork's URL>
$ cd FE-FT-Northcoders-News
```

3.  Open the cloned repository in your preferred program, such as Visual Studio Code.

4.  Using the integrated terminal in your chosen program, install all dependencies by entering `npm install`. A list of all requirements can be found in the `package.json` file.

## **API**

The `api.js` file makes GET, PUT, POST and DELETE requests to my previously developed and hosted api url, available to view here:

- [https://github.com/hannahbennett27/BE-FT-Northcoders-News](https://github.com/hannahbennett27/BE-FT-Northcoders-News)

- [https://hb-northcoders-news-api.herokuapp.com/api](https://hb-northcoders-news-api.herokuapp.com/api)

If you want to amend the `api.js` file to interact with your own/a different api, change the variable url (line 2) and ensure all Axios calls reflect the respective url paths in the amended api:

```js
const url = '<your-api-url>';
```

NB: Be careful to ensure the new api receives and responds with data in the same format, to avoid errors.

## **Development Instructions**

To run the app in development mode, run the following command in your integrated terminal:

```
$ npm start
```

A live version of Northcoders News will open in your browser on the elected port:

```
http://localhost:3000/
```

You'll notice the integrated terminal states `Compiled successfully!`; if you make changes, the terminal will offer helpful advice to locate any errors, if they occur.

## **Updates**

If you make changes to your repo, don't forget to `add`, `commit` and `push` your edits to your forked repo:

```
$ git add .
$ git commit -m "<commit message>"
$ git push origin master
```

## **Production**

Northcoders News has been deployed to a `production` environment using [Heroku](https://www.heroku.com/).

Please check out my Northcoders News at:

[**tbc**](tbc)

## **Authors**

**Hannah Bennett**

[GitHub](https://github.com/hannahbennett27)

[Twitter](https://twitter.com/hanjben27)

## **Acknowledgments**

[Northcoders!](https://northcoders.com)
