# Testing the TDM Server API
If on windows: 
You must have docker-desktop up and running.  If you are using WSL2, you must have the docker daemon running in WSL2.  You can test this by running `sudo docker run hello-world` from the command line.  If you get an error, you need to start the docker daemon.  If you get a success message, you are good to go.

## Running the tests
On Windows:

Start up your Docker Desktop to make sure your daemon is running

Comment out all variables above 'testing' in the .env file

then run from the 'server' directory `npm test`  

## Troubleshooting

Test your docker daemon from linux command line:
`sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=tdmTestingPassword1!"    -p 1435:1435 --name sql3 --hostname sql3    -d    mcr.microsoft.com/mssql/server`

# Testing Notes
These tests are manually configured to connect the docker container to port 1433 and map it to the host's port 1433.
It will create a containerized SQL Server and then a database within it. It wil run the migrations and seed the database. We will reuse this same container for all tests.


## TDM Databse Further Info
[Local Database Information](https://github.com/hackforla/tdm-calculator/wiki/Local-Database)

```javascript
//Example Test
 function add(a, b) {
     return a + b;
 }
 describe('add function', () => {
     test('adds 1 + 2 to equal 3', () => {
         expect(add(1, 2)).toBe(3);
     });
 });
```
## Testing Tools
- jest, supertest, testcontainer