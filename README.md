# node-express-starter

A Dockerized Node-Express starter project that includes authentication, authorization, file upload, user management and role management.

# Setup

## Copy env file
```
cp .env.example .env
```
## Running with Docker
```
docker-compose build
docker-compose up
```

## Running with Nodemon
```
npm i -g nodemon
npm install
nodemon bin/www
```

## Test

```
npm run test
```

## Seed

```
npm run seed
```


# API Endpoints
```
POST /api/login
GET /api/roles

POST /api/users
GET /api/users
GET /api/users/:id
PUT /api/users/:id
DELETE /api/users/:id


POST /api/file-upload
GET /api/file-upload/:id
DELETE /api/file-upload/:id
```

# Third Party Packages
* Passport
* passport-jwt
* passport-local
* jsonwebtokens
* mongoose
* multer
* loadash
* bcrypt
* joi
* faker
* dotenv


