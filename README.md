# DCRide
* **Purpose of the app:** 
   This app was created to manage 10 cars of the company named 'DCRide' which stands for 'Driverless Car Ride'. The company is targeting to integrate advance driverless car technology into its business with the help of this app in order to make transactions more smooth and provide greater service to their customers.
* **How to use:**
   These app has two authentication interfaces, one is for users and the other one is for admin. Customers should register and log in to be able to make a request for a ride. Once they make a call, they need to fill out a form where they enter their pick up location and drop off destination. The app also provides the option to use the customers's current pick up location if desired. Once they submit the info, the app will calculate the distance between the customer's pick-up location and the location of all 10 cars. The nearest car will then be assigned to pick up the customer. The customer will see three locations (customer location, closest car location and destination) on the google map with the pertinant trip info of duration, distance, and cost from different perspectives.
   In the admin interface, the admin will be able to monitor all cars with the geolocation that changes every 2 seconds on the map and table. In addition, the app provide important booking information of all 10 cars plus the dates, locations and costs.
* **Features on the app:**
   The app is featured with creative designs and functionalities in each page including related animations and an intro video on the home page. The contributers utilized the Google Maps API, Google Distance Matrix API and Google Places API to make distance calculations, demonstrating map, including autocomplete features in the address bars. Another functionality which features the dynamic nature of the app is the changing geolocations of each car where the locations change every 2 seconds.
   From the authentication side, the app is able to distinguish between a regular user and an admin login and subsequently, provide the corresponding dashboard page relative to the respective login. It checks the credentials in registering process to make sure that the credentials were not used before and also perform additional validations.  
   
## Live link: 
Will be available soon...

## User login and dashboard: 
![](dashboard_1.gif)

## Admin login and dashboard: 
![](admin.gif)

## Introduction video of the project: 
https://www.youtube.com/watch?v=Nb-QDNkpJvQ

## Database: 
This project is built using PostgreSQL with Sequelize-Object Relational Mapping
## Featured programs: 
HTML, CSS, Bootstrap, JavaScript, Node.js, Mustache
## External API:
Google Maps API, Google Distance Matrix API and Google Places API
## This site was built by
[Joseph Colca](https://github.com/JGColca), [Beyza Kilickol Akurek](https://github.com/beyzakilickol), [Eslam Amin](https://github.com/EslamAmin151), [Pete Nguyen](https://github.com/pete1130)
