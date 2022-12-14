# Partytivity:

## Live Version:

### [Partytivity](https://partytivity.tk)

## About the project:

My party management app is a web app application that assists
party lovers with organizing events in a more accessible and efficient way.

## Why I chose this project:

The truth is that there is no specific reason that concerns my personal world,
I thought about a problem, a solution and a need and tried to find a way to bridge all of these.
I see this project as something that could absolutely work in the real world.

## Technologies:

- **[React](https://reactjs.org/)**
- **[TypeScript](https://www.typescriptlang.org/)**
- **[Sass](https://www.npmjs.com/package/sass)**
- **[Express](https://www.npmjs.com/package/express)**
- **[PostgreSQL](https://www.postgresql.org/)**

## Packages:

### Front-end:

- **[Recoil](https://www.npmjs.com/package/recoil)** - For global states management.
- **[React Router](https://www.npmjs.com/package/react-router-dom)** - For routes management.
- **[Workbox](https://www.npmjs.com/package/workbox-sw)** - For making the app progressive.
- **[React Bootstrap](https://www.npmjs.com/package/react-bootstrap)** - For design purposes.
- **[React Lottie](https://www.npmjs.com/package/react-lottie-player)** - For displaying animations.
- **[React Share](https://www.npmjs.com/package/react-share)** - For social media share buttons.
- **[MaterialUI](https://www.npmjs.com/package/@mui/material)** - For design purposes.

### Back-end:

- **[Node-postgres](https://www.npmjs.com/package/pg)** - For DB management.
- **[Nodemailer](https://www.npmjs.com/package/nodemailer)** - For email sending.
- **[JsonWebToken](https://www.npmjs.com/package/jsonwebtoken)** - For authentication.
- **[Multer](https://www.npmjs.com/package/multer)** - For easily manage the images uploaded to the server.
- **[Cloudinary](https://www.npmjs.com/package/cloudinary)** - For uploading photos to the cloud.
- **[Bcrypt](https://www.npmjs.com/package/bcrypt)** - For encryption purposes.
- **[Cookie-Parser](https://www.npmjs.com/package/cookie-parser)** - For the ability to read cookies and use them.
- **[Webpack](https://www.npmjs.com/package/webpack)** - For modules bundling and build the server side.
- **[Dotenv](https://www.npmjs.com/package/dotenv)** - For the ability to read environment variables and use them.
- **[Zod](https://www.npmjs.com/package/zod)** - For TypeScript validation with static type inference.

## Local installation without Docker

1. **Clone the repo**

```
git clone https://github.com/itay-meitav/partytivity.git
```

2. **Install all the dependencies**

```
npm run init-p
```

3. **Run server**

```
npm run server
```

4. **Run Client**

```
npm run client
```

5. **Go to http://localhost:3000 and have fun**!

## Local installation with Docker

1. **Clone the repo**

```
git clone https://github.com/itay-meitav/partytivity.git
```

2. **In the main root directory**

```
docker-compose build
```

```
docker-compose up
```

3. **Go to http://localhost:3000 and have fun**!

# Important Note

In both methods, in order for you to experience all the features of the application, the local variables specified in the docker-compose file must be entered.

## Main Features:

1. **Registration system including email verification** is fully functional.
2. **Modify App's Data** - Create/Read/Update/Delete users, parties, services and more.
3. **Party invitation** - Inviting unregistered external users and registering them for events.
4. **Autocomplete Search Input** - In the new party view when you add new services.

## Coming soon:

1.  **Notifications System** - Notifications Will display for various user activities.
2.  **Sort Services** - In the new party view when you add new services.
3.  **Partyier Profile Page** - The page will display all his personal data.
4.  **Additional System Data** - Events statistics with graphical overview.
