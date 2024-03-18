# Social-Network-API

## Description

The Challenge is to build an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. It’ll use Express.js for routing, a MongoDB database, and the Mongoose ODM.

## Demo

<a href="">Social Network API Demo Video</a>

## Installation

In order for this application to function properly you must have Mongoose, Express.js, and Moment. You will also need to have MongoDB in order to store the API's data. Optionally, you can also install nodemon that will automatically restart your application when there are changes to your code, helping with debugging.

## Usage

Run `npm install` in the integrated terminal to install/update any dependencies needed. Then enter `npm start` to initiate your server. Once your server is running, navigate to Insomnia. In Insomnia, you will be able to see the full functionality of this API. You will be able to find, create, update, and delete all users and thoughts. You will also be able to add and remove friends and reactions.

## Credits

I wrote this code with the help of Wash U in Saint Louis coursework, Stack Overflow, and W3Schools.

## User Story

As a social media startup, I want an API for my social network that uses a NoSQL database so that my website can handle large amounts of unstructured data.

## Acceptance Criteria

GIVEN a social network API

WHEN I enter the command to invoke the application

THEN my server is started and the Mongoose models are synced to the MongoDB database

WHEN I open API GET routes in Insomnia for users and thoughts

THEN the data for each of these routes is displayed in a formatted JSON

WHEN I test API POST, PUT, and DELETE routes in Insomnia

THEN I am able to successfully create, update, and delete users and thoughts in my database

WHEN I test API POST and DELETE routes in Insomnia

THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list

## Contact Me

Email: [devinjl665@gmail.com](mailto:devinjl665@gmail.com?subject=[GitHub]%20Source%20Han%20Sans)