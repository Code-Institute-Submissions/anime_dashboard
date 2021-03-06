# Anime Dashboard

## Overview

### What is this website for?
This is a Japanese animation (anime) dashboard. It helps users find information on random titles which helps them find
 anime to watch. 

### What does it do?
It gives users the ability to look through anime titles, either by type (movie, TV, ONA, OVA or special) via the pie
 chart, or by average user rating via the line chart. Users are also able to select specific titles in the select menu 
 and see the corresponding data which includes genre, episodes, number of members in it's 'group', type and average user rating. Users can refer to the reference page to look at terminology of some unique to anime genres.

### How does it work?
Anime_dashboard.py makes use of the flask framework for routing. First home() is called, then The render_template() function redirects to the home.html page. At the bottom of this page home.js gets loaded. When the dashboard button is clicked from the home page dash() gets called in the anime_dashboard.py file, which then calls render_template() which redirects to the dashboard page. At the bottom of this page graph.js gets loaded. Next inside graph.js the queue() function calls back to the anime_data() function in the anime_dashboard.py. Anime_data() then gets data from the database and sends it back to the queue() which passes the data to the makeGraphs() function. The data is then filtered using crosfilter.js before being bound to the charts with d3.js and dc.js.

## Features

### Existing features
- Dashboard features
   - Interactive pie chart
   - Interactive line chart
   - Interactive select menu
   - Data table
- Site features
   - Nav bar Navigation
   - Scrollable data tables
   - Random select option
 
### Features to improve
- Site features
   - I have not been able to find a perfect solution in making the dc charts responsive. This results in some empty space
   in the chart's svg at some screen sizes. I've tried to mitigate this effect by creating three different line charts with varying widths
   which will display on media query break points however this has made loading time slower.
   - The lucky dip button on the home page might not work if it is pressed too soon after page load. This issue only 
   seems to arise on the deployed version.


## Tech Used

### Tech used includes:
- [Flask microframework for python](http://flask.pocoo.org/)
  - **Flask** handles page routing, calls to the database and loading libraries.
- [Bootstrap](http://getbootstrap.com/)
  - **Bootstrap** is used for a simple, responsive layout.
- [D3](https://d3js.org/)
  - **D3** is used in conjunction with DC to render the charts.
- [DC](https://dc-js.github.io/dc.js/)
  - **DC** is used in conjunction with D3 to render the charts
- [Crossfilter](http://square.github.io/crossfilter/)
  - **Crosfilter** is used to sort data.
- [Jquery](https://jquery.com/)
  - **Jquery** is used for more interactiveness.
- [Intro](http://introjs.com/)
  - **Intro** is used for the step by step guide feature on the dashboard.


## Testing
Some of the validation tests I used include
- [W3C](http://validator.w3.org/)
    - **W3C** validates html.
- [jigsaw](https://jigsaw.w3.org)
    - **Jigsaw** validates css
- [pep8](http://pep8online.com/)
    - **pep8** validates python code
- [jshint](http://jshint.com/)
    - **jshint** validates javascript

A lot of my testing was aided by the chrome developer javascript console. I used the console to read errors which
helped me fix code. I also created a test.js file in which I wrote and edited functions to later incorporate into
 my staging files. Unfortunately I deleted this file so am unable to show you.
 
 To make sure my dashboard was working as expected I would render the project in the browser and use each chart to determine
 if the expected behavior was occurring. If there was an issue I went back to the code and made amendments mostly 
 through trial and error until i got the expected behaviour 
 

## Getting the code up and running
1. First you will need to clone this repository by running the ```git clone <https://github.com/OMC86/anime_dashboard>``` command and install the modules listed in the requirements.txt file.
2. The anime.csv file has been included in this repository but if you would like to take a look at the original, you can find it at [kaggle](https://www.kaggle.com/CooperUnion/anime-recommendations-database).
- Please note the original csv file form [kaggle](https://www.kaggle.com/CooperUnion/anime-recommendations-database) includes some null values and may need some cleaning for optimal use with Anime Dashboard.
    - In the 'rating' column have edited null values to int 0.
    - Have removed 'Music' from the 'type' column.
3. Next if you don't have mongo, install [MongoDb document database](https://www.mongodb.com/download-center#production).
4. Once you have installed and configured mongo, upload anime.csv to mogodb with the following command ```mongoimport -d animeData -c anime --type csv --file anime.csv --headerline```
4. You will need to have mongodb running in order to retrieve data for the charts
5. Run the anime_dashboard.py file and go to 127.0.0.1:5000 in your browser.
