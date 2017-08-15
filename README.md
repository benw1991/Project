# A template for web application project

## Before we start
You need to know:
  - HTML5
  - CSS3
  - JavaScript
  - Jquery
  - Bootstrap

## Cloning the project
- You should be provided with a new repo at github.
- Clone this repo to your local machine: *git clone https://github.com/TechnionTDK/tdk-web-template1.git*
- Rename the remote origin: *git remote rename origin upstream*
- Set the new remote origin: *git remote add origin URL_TO_YOUR_GITHUB_REPO*
- Push to your repo: *git push origin master*

Now you can work with it just like any other github repo. To pull in patches from upstream, simply run:
- git pull upstream master
- git push origin master

[Source: [stackoverflow](https://stackoverflow.com/questions/5181845/git-push-existing-repo-to-a-new-and-different-remote-repo-server)] 

## Execute the project
The project contains a simple web app that communicates with our SPARQL endpoint. To execute the app:
- cd to your project's directory.
- install express as explained [here](http://expressjs.com/en/starter/installing.html).
- Execute: *npm start*

## Project structure

### Folders

| name | purpose |
| ------ | ------ |
| css | css files for your project |
| images | image files for your project |
| js | js (javascript) files for your project |

### Files
| name | purpose |
| ------ | ------ |
| css/style.css | main style of the page |
| js/apiHandler.js | send request to server and handle them |
| js/wrapperHandler.js | wrapper js system.  |
| index.html | main page of your site |
| server.js | node.js file that start the server |

## Themes & Templates
You could find great `FREE` Themes & Templates in this site : [https://startbootstrap.com/]

## Useful libraries
Libraries that will help you in your project

| name | purpose | link |
| ------ | ------ | ------ |
| Bootstrap | help you build responsive website + mobile friendly | [http://getbootstrap.com/] |
| jQuery |Make your life easier with JS | [https://jquery.com/] |
| jQuery UI | UI (user interface) tools for jQuery | [https://jqueryui.com/] |
| Font Awesome | Give you all the icons you need to design your website | [http://fontawesome.io/] |
| Amcharts | give you charts that work with json | [https://www.amcharts.com/] |
| Datatables | great tables with all the tools that you need for tables | [https://datatables.net/] |
| D3 |  chart and visualize data | [https://d3js.org/] |
| Select2 |  make select input better with more options | [https://select2.github.io/] |
| Bootstrap 3 Typeahead |  give bootstrap autocomplete | [https://github.com/bassjobsen/Bootstrap-3-Typeahead] |
