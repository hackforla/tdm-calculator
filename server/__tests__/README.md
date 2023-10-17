# Testing the TDM Server API

## Running the tests
On Windows:

Start up your Docker Desktop to make sure your daemon is running

then run from the 'server' directory `npm test`  

## Troubleshooting

Test your docker daemon from linux command line:
`sudo docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=tdmTestingPassword1!"    -p 1435:1435 --name sql3 --hostname sql3    -d    mcr.microsoft.com/mssql/server`


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