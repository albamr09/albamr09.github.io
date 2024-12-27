---
title: MongoDB
type: docs
---

## MongoDB Commands

To log into MongoDB with the created user and database:

```console
$ mongo -u <your username> -p <your password> \\
                --authenticationDatabase <your database name>
```

Or

```console
$ mongo -u <your username> \\
        --authenticationDatabase <your database name>
```

To connect to the database use the following URI:

```
mongodb://YourUsername:YourPasswordHere@127.0.0.1:27017/your-database-name
```
