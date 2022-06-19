<h1 align="center" id="top">A simple repository to challenge what can I do on a Back-End</h1>

- - -

## What is it?

This project is a simple RestAPI, It's also my first backend project in typescript.
You can see the table model with the file `tables.sql`

- - -

## What did I use?

##### App

- Visual Studio Code
- Insomnia
- Windows Terminal
- Mysql Console

##### Language

- Typescript
- NodeJS
- pnpm

##### Packages

- Express
- http-errors
- morgan
- jsonwebtoken
- mysql2
- dotenv
- cookie-parser
- bcrypt

##### Test Packages

- vite
- vitest
- axios

##### Helping Packages

- eslint
- prettier
- nodemon
- ts-node
- tsconfig-paths

- - -

### Launch App

```sh
pnpm run dev
```

### Launch tests

```sh
pnpm run test
```

- - -

## All routes

<table>
  <thead>
    <tr>
      <th>
        Route
      </th>
      <th>
        Method
      </th>
      <th>
        Path
      </th>
      <th>
        JSON Data
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Login
      </td>
      <td>
        POST
      </td>
      <td>
        <code>/api/auth/login</code>
      </td>
      <td>email, password</td>
    </tr>
    <tr>
      <td>
        Logout
      </td>
      <td>
        GET
      </td>
      <td>
        <code>/api/auth/logout</code>
      </td>
      <td>-</td>
    </tr>
    <tr>
      <td>
        Register
      </td>
      <td>
        POST
      </td>
      <td>
        <code>/api/auth/register</code>
      </td>
      <td>email, password</td>
    </tr>
    <tr>
      <td>
        Register admin
      </td>
      <td>
        POST
      </td>
      <td>
        <code>/api/auth/register/admin</code>
      </td>
      <td>email, password</td>
    </tr>
    <tr>
      <td>
        List users
      </td>
      <td>
        GET
      </td>
      <td>
        <code>/api/user</code>
      </td>
      <td>-</td>
    </tr>
    <tr>
      <td>
        One user
      </td>
      <td>
        GET
      </td>
      <td>
        <code>/api/user/[user_id]</code>
      </td>
      <td>-</td>
    </tr>
    <tr>
      <td>
        Update an user
      </td>
      <td>
        PUT
      </td>
      <td>
        <code>/api/user/[user_id]</code>
      </td>
      <td>name</td>
    </tr>
    <tr>
      <td>
        Delete an user
      </td>
      <td>
        DELETE
      </td>
      <td>
        <code>/api/user</code>
      </td>
      <td>email</td>
    </tr>
    <tr>
      <td>
        Show musics of the logged user
      </td>
      <td>
        GET
      </td>
      <td>
        <code>/api/user/music</code>
      </td>
      <td>-</td>
    </tr>
    <tr>
      <td>
        Add a music to an user
      </td>
      <td>
        POST
      </td>
      <td>
        <code>/api/user/music</code>
      </td>
      <td>music_id</td>
    </tr>
    <tr>
      <td>
        Remove a music from an user
      </td>
      <td>
        DELETE
      </td>
      <td>
        <code>/api/user/music</code>
      </td>
      <td>music_id</td>
    </tr>
    <tr>
      <td>
        List all musics
      </td>
      <td>
        GET
      </td>
      <td>
        <code>/api/music</code>
      </td>
      <td>-</td>
    </tr>
    <tr>
      <td>
        Add a music
      </td>
      <td>
        POST
      </td>
      <td>
        <code>/api/music</code>
      </td>
      <td>artist, title</td>
    </tr>
    <tr>
      <td>
        Update a music
      </td>
      <td>
        PUT
      </td>
      <td>
        <code>/api/music/[music_id]</code>
      </td>
      <td>artist | title</td>
    </tr>
    <tr>
      <td>
        Delete a music
      </td>
      <td>
        DELETE
      </td>
      <td>
        <code>/api/music/[music_id]</code>
      </td>
      <td>-</td>
    </tr>
    <tr>
      <td>
        Search a music
      </td>
      <td>
        POST
      </td>
      <td>
        <code>/api/search</code>
      </td>
      <td>search</td>
    </tr>
  </tbody>
</table>

- - -

## Test output

![preview test](https://i.imgur.com/giHb1vc.png)

<a href="#top"><< TOP >></a>
