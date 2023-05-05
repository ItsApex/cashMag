# CS50 WEB PROGRAMMING FINAL PROJECT: CASHISH

The project video is: https://youtu.be/QrzhOK-Gubc

## Main idea
A website tool that allows you to view and compare your expenses. You can also include your expenses and have everything on one page.

* Login/Logout/Register
* Add Expense page allows you to enter your expenses as well as the type of expenses that will be grouped together.
* Home page with a graph that displays all expenses and a limited number of options, as seen in the video.


## Distinctiveness and Complexity
The page is not similar to anything we have already created. It's not a social media app nor an e-commerce. It's not similar to other years projects either. 

In terms of complexity, I used Django with more than one model (explained below) and several javascript files to the frontend with chart.js for making the charts. 
Moreover, all of the web application is responsive to the different screen sizes (mainly mobile phones and computers).

## Files information

* In views.py there is all of the backend code. The main functions are:
    * Class collect_info which is called in the javascript to collect the users info.
    * Class addexp for adding data in the database
    * Login, logout and register functions copied from project 4

* Models.py. The different models are:
    * A users model
    * A model for Expenses

* addexp.html : page for adding new expense
* index.html : used for showing all the expense
* layout.html : describes the layout of the whole page 
* login.html : the login layout 
* register.html : the register layout 

* charts.js: Used for creating the chart on the web page.

* Templates for all of the different html pages explained above (5 in total including a layout file)
* A css file with all of the css used in the web application. Techniques like flexbox and grid are used
* Other less important files like urls, admin, settings, static images...

## How to run the application
* Make and apply migrations by running python manage.py makemigrations and python manage.py migrate.
* And start the server using python manage.py runserver