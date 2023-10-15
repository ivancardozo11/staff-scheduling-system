# Staff-scheduling-system v1.0.0

<div style="max-width: 600px; margin: 0 auto;">
 <p align="center"> 
 <img src="scheduleLogo.jpg" width="500" height="400" alt="Image">
</p>
</div>


</p>
    <p align="center">This code should be reviewed listening the Rainbow 😎🤘🎶🎵</p>
    <p align="center">
        <a href="https://www.youtube.com/watch?v=1P17ct4e5OE" target="_blank">
          Since You've Been Gone
        </a>
    </p>
</div>


# Project Description:

The staff scheduling application allows users to create an account and log in to the system. The application supports two user roles: Staff User and Admin. Staff Users can view their own schedule for any period of time up to one year, and they can see the schedules of their coworkers. Admins, on the other hand, have more powerful permissions. They can edit and delete all users, create, edit, and delete schedules for users, and order the users list by accumulated work hours per arbitrary period up to one year.

Schedules in the application contain the work date, the user assigned to the schedule, and the shift length in hours. The application provides relevant REST endpoints that can be accessed and interacted with via Postman or other similar software. It also includes relevant unit tests and a documentation page using Open API specifications. Finally, the application is dockerized and includes a README file describing how to run the project.



# Installation instructions:

## Check at the code documentation here to see the whole setup:

<p>
  <a href="" target="_blank">
   Link to code documentation
  </a>
</p>

## To install all packages in this project.
```sh
npm install
```

## To run development server🔓🔓🔓🛠🛠

### First run:

```sh
npm run build
```
### and then:

```sh
npm run start:dev 
```
## To run production 👩‍🚀👩‍🚀👩‍🚀🚀:

```sh
npm start:prod
```

## To run test 📕📖🔍🔐:

```sh
npm run test
```

You migth have to configurate dotenv this way couse sometimes the library doenst
work properly couse sometimes the library doenst
work properly.
```sh
dotenv.config({ path: 'C:/your/path/staff-scheduling-system/.env' }); 
```



## Configure your dotenv credentials and route paths.

* This app implements a .env file that store all the database credentials and environment variables and
also,  you need to import dotenv to the database connection, the index.ts file and the JWT file. *

## How to setup docker for this app:

### First, setup inside the .env file the global variable:


Change from : 
```sh
DB_HOST=localhost
```
to
```sh
DB_HOST=host.docker.internal 
```

This is because its necesary for docker to emulate your database address as if its not local.

## To build the docker image:  

```sh
docker build --no-cache -t node-backend .
```

## To build the container:
```sh
docker run --add-host host.docker.internal:host-gateway -p 8080 -d node-backend 
```
This will expose the port from our localserver