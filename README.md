<a ID="readme-top"></a>

<div align="center">

# ⭐ Model-View-Controller (MVC): Tech Blog ⭐

[![Node.js Badge](https://img.shields.io/badge/Node.js-393?style=for-the-badge&logo=nodedotjs&logoColor=fff)](https://nodejs.org/en)
[![MySQL2 Badge](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Express Badge](https://img.shields.io/badge/Express-000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Bcrypt Badge](https://img.shields.io/badge/Bcrypt-338?style=for-the-badge&logo=javascript&logoColor=white)](https://www.npmjs.com/package/bcrypt)
[![Dotenv Badge](https://img.shields.io/badge/Dotenv-000?style=for-the-badge&logo=javascript&logoColor=white)](https://www.npmjs.com/package/dotenv)
[![Sequelize Badge](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white)](https://www.npmjs.com/package/sequelize)
[![Handlebar Badge](https://img.shields.io/badge/Handlebars%20js-f0772b?style=for-the-badge&logo=handlebarsdotjs&logoColor=black)](https://www.npmjs.com/package/handlebars)

</div>

## Outcome <a ID="outcome"></a>

Followings are the outcomes of the challenge 14:

* The URL of the functional, deployed application </br>
[URL of deployed application](https://polar-journey-77005-c598f31c0871.herokuapp.com/) </br>

* The URL of the GitHub repository, with a unique name and a README describing the project </br>
[Repository for this challenge](https://github.com/justinsta624/MVCTechSavvy)

## Table of contents

- [Importance](#importance)
- [Overview](#overview)
- [User Story](#user-story)
- [User Acceptance Critiera](#user-acceptance-criteria)
- [Installation](#installation)
- [License](#license)
- [Technologies Used](#technologies-used)

## Importance <a ID="importance"></a>

* Writing about technology is as crucial as developing it.
* Developers not only create applications and debug code but also dedicate time to reading and writing about technical concepts, recent advancements, and new technologies.
* A simple Google search reveals numerous think pieces and tutorials by developers of varying skill levels on any covered concept.

## Overview <a ID="overview"></a>

* Build a `CMS-style` blog site, akin to `WordPress`, for developers to publish and discuss blog posts.
* The site will be constructed entirely from scratch and deployed on `Heroku`.
* Adopt the `MVC paradigm` for architectural structure.
* Utilize `Handlebars.js` as the templating language, `Sequelize` as the ORM, and `express-session` npm package for authentication.

## User Story <a ID="user-story"></a>

This forum was developed with this user story in mind:

```
AS A developer who writes about tech

I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```
<p align="right">(<a href="#readme-top">back to top</a>)</p>

## User Acceptance Criteria <a ID="user-acceptance-criteria"></a>

```
GIVEN a CMS-style blog site

WHEN I visit the site for the first time
THEN I am presented with the homepage, which includes existing blog posts if any have been posted;
navigation links for the homepage and the dashboard; and the option to log in

WHEN I click on the homepage option
THEN I am taken to the homepage

WHEN I click on any other links in the navigation
THEN I am prompted to either sign up or sign in

WHEN I choose to sign up
THEN I am prompted to create a username and password

WHEN I click on the sign-up button
THEN my user credentials are saved and I am logged into the site

WHEN I revisit the site at a later time and choose to sign in
THEN I am prompted to enter my username and password

WHEN I am signed in to the site
THEN I see navigation links for the homepage, the dashboard, and the option to log out

WHEN I click on the homepage option in the navigation
THEN I am taken to the homepage and presented with existing blog posts that include the post title
and the date created

WHEN I click on an existing blog post
THEN I am presented with the post title, contents, post creator’s username, and date created for
that post and have the option to leave a comment

WHEN I enter a comment and click on the submit button while signed in
THEN the comment is saved and the post is updated to display the comment, the comment creator’s
username, and the date created

WHEN I click on the dashboard option in the navigation
THEN I am taken to the dashboard and presented with any blog posts I have already created and
the option to add a new blog post

WHEN I click on the button to add a new blog post
THEN I am prompted to enter both a title and contents for my blog post

WHEN I click on the button to create a new blog post
THEN the title and contents of my post are saved and I am taken back to an updated dashboard
with my new blog post

WHEN I click on one of my existing posts in the dashboard
THEN I am able to delete or update my post and taken back to an updated dashboard

WHEN I click on the logout option in the navigation
THEN I am signed out of the site

WHEN I am idle on the site for more than a set time
THEN I am able to view posts and comments but I am prompted to log in again before I can add,
update, or delete posts

```

## License <a ID="license"></a>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This application can be used in conjunction with licensing covered in  <b>MIT License</b>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Technologies used <a ID="technologies-used"></a>

- **Node.js**: Runtime environment for executing server-side JavaScript code.
- **Express**: Web application framework for building RESTful APIs.
- **Express-Handlebars**: Template engine for rendering HTML templates.
- **Express-Session**: Middleware for managing user sessions.
- **MySQL2**: MySQL database driver for Node.js.
- **Sequelize**: Promise-based ORM for interacting with databases.
- **Bcrypt**: Library for securely hashing passwords.
- **Dotenv**: Utility for loading environment variables.
- **JawsDB**: Providing managed MySQL databases, ideal for scalable web applications.
- **Heroku**: A cloud platform that offers easy deployment and management of web applications.
- **Nodemon**: Development tool for auto-reloading the server during development.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Review

* The URL of the functional, deployed application.
* The URL of the GitHub repository. Give a unique name & README describing the project.

---

© 2024 Hanbyeol(Justin)Lee. Confidential and Proprietary. All Rights Reserved.
