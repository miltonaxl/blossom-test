# Blossom test

## Installation

1. I using nodejs version v16.14.0 you can change the version using [nvm](https://github.com/nvm-sh/nvm)

2. Install [redis](https://redis.io/docs/install/install-redis/) and activate the service

3. Install [postgres](https://www.postgresql.org/download/) for use a database

4. Create a file .env with the next environment:

` # App env variables
NODE_ENV=development
PORT=3000

    # Database env variables
    DB_HOST=x
    DB_PORT=5432
    DB_USERNAME=x
    DB_PASSWORD=x
    DB_NAME=x

`

5. Now, install all the dependencies that need the project with the next command

```bash
npm install
```

or

```bash
yarn
```

6. fFor start running the project run first the migration using the next commands

```bash
npm run migrate
```

if you want revert the migration run:

```bash
npm run migrate:revert

```

and if you want create a new file for create a new migration run:

```bash
npm run migrate:file name-of-file

```

7. now run the application with the next command:

```bash
npm run dev

```

8. the application running in this url locally
   http://localhost:3000/graphql

   The console show up the same link when application is running

9. In the root of project you can find the ERD

# How test the app from apollo server

When you opened the link you can going to have different queries parameter that type provide example

for getCharacters you can make something like this

    query getValues {
        getCharacters {
        name
        status
        # Add other fields you want to retrieve
        }
    }

for make a query or by id you can make something like:

    query getValues {
        queryCharacters(query: { name: "Anchosnake" }) {
            id
            name
            # Add other fields you want to retrieve
        }
    }

or

    query getValues {
        getCharacter(query: { id: "uuid" }) {
            id
            name
            # Add other fields you want to retrieve
        }
    }
