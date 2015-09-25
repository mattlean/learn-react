learn-react
======

### About this App
This is an example React app that mimics the frontend of an online restaurant ordering system.

### Technologies Used
* JavaScript
* React
* jQuery
* localStorage
* History
* AJAX
* HTML5
* CSS3
* JSON

### Support
Only tested and known to work on Chrome 44, Firefox 41, Opera 31, and Internet Explorer 11.
Properly supports screen sizes larger than 317 pixels.

### How to Run
Because the app uses AJAX, the app must be hosted on a server. You can upload the files to a server, or use the project's server to run the app.

If you don't want to deal with all of the dependency setup, you can download the prepackaged source with all of the dependencies ready [here](http://mattlean.com/downloads/learn-react.zip).

If you don't want to deal with any of this, you can just view the [live version here](http://learnreact.mattlean.com). ;)

The project uses [npm](https://docs.npmjs.com/getting-started/installing-node), [Bower](http://bower.io/#getting-started), and [Grunt](http://gruntjs.com/getting-started), so you will need those to get the project environment running.

Once they are installed, to install the dependencies all you need to do is run the following commands in this order:
```
npm install
bower install
```

Once all of the dependencies are installed, to run the server use this grunt command:
```grunt serve```

Now you should be able to view the app in the browser at this URI: [http://localhost:9000](http://localhost:9000)

### To-Do List
* Make better forms that function consistently across browsers
* Style forms
* Animated checkout progress bar at top-right corner
* SASS mixins for better browser compatibility on CSS3 properties that require browser prefixes
* Show running total on first menu page
* Have onClick() on payment table rows trigger corresponding radio buttons
* Have pop-up with add-on items for customizable items (ex. customized pizza toppings)
* Responsive image to go with each food item
* Use better routing system like [react-router](https://github.com/rackt/react-router)
