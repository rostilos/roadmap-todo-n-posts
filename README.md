# PET application implemented as part of the roadmap.

The application is containerized, .sh scripts are used to use and run docker containers.

## Used stack
Frontend : React \
Backend : php \
DB : MySQL \
Web Server : Nginx

## Running the project : 

First you need to set read and execute permissions to .sh scripts : 

### `chmod u+r+x -R ./scripts`

Then you can run the application: 

### `cd ./scripts`
### `sudo ./run_app.sh`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Available Scripts

Access to the backend portion of the container : 
### `./backend-bash.sh`

Access to mysql :
### `./mysql-bash.sh`

Rebuild app :
### `./rebuild-and-run-app.sh`



