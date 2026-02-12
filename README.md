# Ecommerce Restfull Api Bun + HonoJS
Api Backend untuk sistem Ecommerce menggunakan Bun dan HonoJS sebagai framework, mysql sebagai database serta ORM menggunakan prisma client.

## Fitur
- Role user : admin dan customer
- Authentikasi pengguna: login JWT, register hashing bcrypt
- Manajemen Product : CRUD (admin)
- keranjang : menambah,mengubah dan menghapus item keranjang
- Order : checkout multiple porduct
- validasi form: validasi from input menggunakan zod

## Tech Stack
- Bun
- Hono
- mysql
- ORM prisma client
- JWT (hono/jwt)

## ENV
DATABASE_URL=""
DATABASE_USER=""
DATABASE_PASSWORD=""
DATABASE_NAME=""
DATABASE_HOST=""
DATABASE_PORT=

TOKEN_SECRET=""

NODE_ENV=""


## Instalation
```sh
git clone https://github.com/bambang-sb/ecommerce-restfull-api-bunhono.git
cd ecommerce-restfull-api-bunhono
bun install
```

To run:
```sh
bun run dev
```

open http://localhost:3000

## Api Endpoint
### Auth
POST api/user/register
POST api/user/login

### products
GET api/product
GET api/product/:id
POST api/product
PUT api/product/:id

### Full endpoint + documentasi
- https://ecom-bun-hono.apidog.io/
or
- folder doc/index.html
or 
- https://bambang-sb.github.io/ecommerce-restfull-api-bunhono/

### All endpoints documentasi dan testing dengan apidog
Includes:
- Authentication flow testing
- Role-based access validation
- Error handling scenarios

## Folder Structure
```sh
prisma/
src/
  ├── config
  ├── controllers
  ├── errors
  ├── helpers
  ├── middleware
  ├── models
  ├── routes
  ├── server.ts
  ├── services
  ├── types
  └── validations
uploads/