# [Newspaper ![Newspaper Logo](https://img.icons8.com/ultraviolet/40/000000/news.png)](https://ericksosa-newspaper-mini-project.netlify.app/)

This is the repository for the Newspaper project.

## Table of Contents

- [Newspaper ](#newspaper-)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Scripts](#scripts)
  - [Dependencies](#dependencies)
  - [Dev Dependencies](#dev-dependencies)
  - [Contributing](#contributing)
  - [License](#license)

## Description

Newspaper is a user-friendly web application that provides easy access to the latest news and information. It offers a seamless browsing experience to help you stay informed about current events and trends with convenience. Join us in our mission to make news accessible to all.

## Installation

To get started with the Newspaper project, follow these steps:

1. Clone this repository: `git clone https://github.com/ErickDev03/newspaper.git`
2. Change to the project directory: `cd newspaper`
3. Install dependencies: `npm install` or `yarn`

## Usage

**Instructions for use of the web application `Newspaper`**.

1. **Login or Registration:**

   - When opening the web application, users will see the login.
   - To register, users can choose between two options:
     - **Register with Google:** Users can register quickly and easily using their Google account. This requires them to grant permissions to access their Google information.
     - **Manual Registration:** If they prefer not to use Google, they can provide the following information:
       - First Name
       - Last Name
       - Username
       - Valid email address
       - Secure password

2. **Homepage:**

   - After logging in or registering, users will be directed to the homepage.
   - On the homepage, they will find a list of news represented by cards.
   - Each news card displays:
     - A news summary.
     - A featured image.
     - The writer's name.
     - The date of news creation.

3. **Reading News:**

   - To read a complete news article, users can click on the news card they are interested in.
   - They will be redirected to a page that displays the complete news article with text and multimedia.

4. **Profile Update:**

   - Readers have the option to update their profile information.
   - They can change their **first name**, **last name**, **username**, **password**, or **profile picture**.
   - This is done in the account settings section.

5. **Write and manage news:**

   - These features are allowed for **editors** and **administrators**
   - They can **update**, **delete** and **write** their news using the **Markdown editor** provided by ***Newspaper***.
   - They also have the same functionalities as the readers.
   - This is done in the management section.

6. **User Management:**
   - This feature is only allowed to administrators.
   - Administrators are in charge of **managing users**, they are the ones who decide who becomes an **editor** or not.
   - This is done in the management section.

## Scripts

You can run the following scripts in this project:

- **dev:** Start the development server using Vite: `npm run dev` or `yarn dev`
- **build:** Build the project using TypeScript and Vite: `npm run build` or `yarn build`
- **lint:** Lint the TypeScript files using ESLint: `npm run lint` or `yarn lint`
- **preview:** Start a Vite development server to preview the project: `npm run preview` or `yarn  preview`

## Dependencies

The project relies on the following dependencies:

- **@tailwindcss/typography:** A plugin that provides a set of prose classes you can use to add beautiful typographic defaults to any vanilla HTML you don't control, like HTML rendered from Markdown, or pulled from a CMS.
- **@uidotdev/usehooks:** A collection of modern, server-safe React hooks – from the ui.dev team, compatible with React v18.0.0+.
- **dompurify:** DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.
- **firebase:** The official Firebase library that makes it easy to integrate Firebase services into web applications, including authentication, cloud storage, and real-time databases.
- **image-conversion:** Is a simple and easy-to-use JS image convert tools, which provides many methods to convert between Image,Canvas,File and dataURL.
- **highlight.js:** A library for syntax highlighting code in programming languages in your web application.
- **marked:** A library for parsing and rendering Markdown into HTML, making it easy to create formatted Markdown content in your application.
- **node-emoji:** A library for working with emojis in Node.js, which can be useful for adding emojis to your messages or content.
- **react:** React is a JavaScript library for building user interfaces.
- **react-dom:** React DOM is the part of React used to manipulate the browser's Document Object Model (DOM).
- **react-hook-form:** A React library that simplifies form creation and management in your applications.
- **react-hot-toast:** Provides elegant and customizable notifications for your React applications.
- **react-router-dom:** A library for navigation and routing in React applications.
- **react-share:** Makes it easy to embed social media sharing buttons in your web application.
- **reading-time-estimator:** Calculates the estimated time it will take to read an article or content on your website.
- **tailwind-merge:** Adds custom utilities to your Tailwind CSS styles.
- **tailwind-scrollbar:** Provides custom styles for scrollbars in applications using Tailwind CSS.
- **unique-username-generator:** Generates unique usernames, which can be useful for assigning default usernames to users.
- **uuid:** A library for generating Universally Unique Identifiers (UUIDs) commonly used in applications to uniquely identify resources.

## Dev Dependencies

The project uses the following dev dependencies:

- **@types/dompurify:** Type definitions for the dompurify library, which helps sanitize HTML to prevent XSS attacks.
- **@types/marked:** Type definitions for the marked library, used for parsing and rendering Markdown to HTML.
- **@types/react:** Type definitions for the React library, used for building user interfaces.
- **@types/react-dom:** Type definitions for React DOM, the part of React used for manipulating the browser's Document Object Model (DOM).
- **@types/uuid:** Type definitions for the uuid library, which generates Universally Unique Identifiers (UUIDs).
- **@typescript-eslint/eslint-plugin:** ESLint plugin for TypeScript, providing TypeScript-specific linting rules.
- **@typescript-eslint/parser:** Parser for ESLint that allows it to understand TypeScript code.
- **@vitejs/plugin-react:** A Vite plugin for building React applications with Vite.
- **autoprefixer:** A PostCSS plugin for adding vendor prefixes to CSS rules.
- **eslint:** ESLint is a linter tool for identifying and fixing problems in JavaScript code.
- **eslint-config-standard-with-typescript:** ESLint configuration that combines the StandardJS style guide with TypeScript support.
- **eslint-plugin-import:** ESLint plugin for linting ES6 import/export syntax.
- **eslint-plugin-n:** ESLint plugin for detecting usage of Node.js APIs.
- **eslint-plugin-promise:** ESLint plugin for enforcing best practices with Promises.
- **eslint-plugin-react:** ESLint plugin for linting React code.
- **eslint-plugin-react-hooks:** ESLint plugin for enforcing React Hooks rules.
- **eslint-plugin-react-refresh:** ESLint plugin for handling React Fast Refresh.
- **postcss:** A tool for transforming styles with JavaScript plugins, often used with CSS preprocessors.
- **tailwindcss:** A utility-first CSS framework for building user interfaces.
- **typescript:** TypeScript is a superset of JavaScript that adds static typing to the language.
- **vite:** A build tool and development server for web applications.
- **tailwindcss-animated:** Is an add-on for Tailwind CSS that provides predefined classes for animations.

## Contributing

Contributions to the Newspaper project are welcome! If you would like to contribute, please follow these steps:

1. Fork the repository on GitHub.
2. Clone your forked repository: `git clone https://github.com/your-username/newspaper.git`
3. Create a new branch for your feature or bug fix: `git checkout -b feature-name`
4. Make your changes and commit them.
5. Push your changes to your forked repository: `git push origin feature-name`
6. Create a pull request on the original repository.

## License

This project is licensed under the `MIT License`. See the [MIT license](https://opensource.org/license/mit/) file for more details.
