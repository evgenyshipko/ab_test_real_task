###  A/B TEST REAL TEST TASK

#### Task
Calculate rolling retention 7 day and build user lifetime histogram
for data in specified table.

#### Get started
- Create .env file in project directory and write the following into
it (asterisks is your DB settings):

```$xslt
PORT=4000
API_PORT=4001
HOST=http://localhost

POSTGRES_DB=***
POSTGRES_USER=***
POSTGRES_PASSWORD=***
POSTGRES_PORT=***
```

- run `docker-compose build` in project directory
- run `docker-compose up` in project directory

#### Stack:
- React + Typescript
- mobx
- styled components
- express
- postgres + sequelize
- docker
- webpack
