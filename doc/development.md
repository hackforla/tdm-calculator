# Setting up your development environment

### Install a Microsoft SQL Docker Container

```
docker-compose up db
```

On Windows, I would recommend installing MS SQL Server Express Edition locally. You can install the database engine as well as SQL Server Management Studio (SSMS), and this will also install a command line utility, `sqlcmd`, which provides a CLI for interacting with the database, like so:

```
$ sqlcmd -U sa -S localhost,1434 -P Dogfood1!
1> select name from sys.databases
2> go
name
--------------------------------------------------------------------------------------------------------------------------------
master
tempdb
model
msdb

(5 rows affected)
1> exit

darra@Lenovo MINGW64 /c/git/hackforla/tdm-calculator (531-jwt-cookie-expires)
$
```

On a Mac or Linux box, you can install [mssql-cli](https://docs.microsoft.com/en-us/sql/tools/mssql-cli?view=sql-server-ver15) and run it to verify a connection:

```
$ mssql-cli -U sa -S localhost,1434 -P Dogfood1!
master> select name from sys.databases
Time: 0.561s
+--------+
| name   |
|--------|
| master |
| tempdb |
| model  |
| msdb   |
+--------+
(5 rows affected)
master> exit

darra@Lenovo MINGW64 /c/git/hackforla/tdm-calculator (531-jwt-cookie-expires)
$

darra@Lenovo MINGW64 /c/git/hackforla/tdm-calculator (531-jwt-cookie-expires)
$
```

Then we can import a copy of the starter database to the db container like this:

```
sqlcmd -U sa -S localhost,1434 -P Dogfood1! -i "db/tdm.sql"
```

or on Mac like this:

```
mssql-cli -U sa -S localhost,1434 -P Dogfood1! -i "db/tdm.sql"
```
