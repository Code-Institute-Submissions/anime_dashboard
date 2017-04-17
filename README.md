# anime_dashboard

## Overview

### What is this website for?
This is a Japanese animation dashboard. It helps users find information on random anime titles. 

### What does it do?
It gives users the ability to look through anime titles, either by type (movie, TV, ONA, OVA or special) via the pie chart, or by average user rating via the line chart. Users are also able to select specific titles in the select menu and see the correspoding data which includes genre, episodes, number of members in it's 'group', type and average user rating. Users can refer to the reference page to look at terminology of some unique to anime genres.

### How does it work?
Anime_dashboard.py calls index() then The render_template() function redirects to the index.html page. At the bottom of this page graph.js gets loaded, then inside graph.js the queue() function calls back to the anime_data() function in the anime_dashboard.py. Anime_data then gets data from the database and sends it back to the queue() which passes the data to the makeGraphs() function. The data is then filtered using crosfilter.js before being bound to the charts with d3.js and dc.js.

## Features

### Existing featurs
- Dashboard features
 - Interactive pie chart
 - Interactive line chart
 - Interactive select menu
 - Data table
- Site features
 - Nav bar Navigation
 - Scrollable data tables
 
### Features left to implement
- Site features
 Select random anime for user

## Tech Used

### Tech used includes:
- [Flask microframework for python](http://flask.pocoo.org/)
 - **Flask** handles page routing, calls to the database and loading libraries.
- [Bootstrap](http://getbootstrap.com/)
 - **Bootstrap** is used for a simple, responsive layout.
- [Keen-dashboard](https://github.com/keen/dashboards)
 - **Keen-dashboard** is used in conjunction with bootstrap for responsive layout
- [D3](https://d3js.org/)
 - **D3** is used in conjunction with DC to render the charts.
- [DC](https://dc-js.github.io/dc.js/)
 - **DC** is used in conjunction with D3 to render the charts
- [Crossfilter](http://square.github.io/crossfilter/)
 - **Crosfilter** is used to sort data.
- [Jquery](https://jquery.com/)
 - **Jquery** is used for more interactiveness.
 
## Contributing

### Getting the code up and running
1. First you will need to clone this repository by running the '''git clone <https://github.com/OMC86/anime_dashboard>''' command.
2. After that you will need to...
