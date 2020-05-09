# Quiz Node

Quiz | Developed with ♡

## Technologies

- Postgres database with Sequelize as ORM
- JsonWebToken for authentication
- Nodemailer to handle with emails
- Handlebars as emails template engine
- Sentry for error analytics
- Youch to handle errors
- date-fns to handle dates
- yup for schema validation

# Getting started

1. after cloning the repository, use `yarn` to download dependencies
2. You need these docker containers `redis:alpine` and `postgres`
3. Run docker containers `docker start <redis-container-name> <postgres-container-name>`
4. Copy the file `.env.example` as `.env` and make sure you filled all the fields correctly
5. run it locally using `yarn dev`
6. run queue by typing `yarn queue`

> Don't forget to start docker containers before running the server

# App responsibility

The backend handles all the database, background proccess.
