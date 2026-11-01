# Shohay

Shohay is a community service events platform for Bangladesh. People can find winter clothes drives, food drives, cleanups, plantation days, health camps and education drives near them, join in one tap, or host an event of their own.

**Live site:** https://shohay-client.vercel.app/

## Features

- Browse upcoming events without an account. Past events are hidden automatically.
- Filter by cause (type), search by title, and sort by date or title.
- Event details page with date countdown, host info, share link, Add to Google Calendar, and related events.
- Sign up and log in with email and password, or with Google.
- Join events and see everything you have joined in one list.
- Host events: create, update and delete your own events from the Manage events page.
- Edit your profile (name and photo).
- Light and dark theme, saved per device.
- Responsive layout with a mobile menu, loading skeletons and toast notifications.

## Tech stack

| Part     | Tools                                                                               |
| -------- | ----------------------------------------------------------------------------------- |
| Client   | Next.js (App Router), React, Tailwind CSS v4, daisyUI, react-icons, react-hot-toast |
| Auth     | BetterAuth (email/password and Google OAuth, JWT plugin)                            |
| Server   | Node.js, Express, `jose` for JWT verification                                       |
| Database | MongoDB                                                                             |
| Hosting  | Vercel                                                                              |

## How it works

1. The client signs users in with BetterAuth, which stores users and sessions in MongoDB.
2. For protected actions, the client asks BetterAuth for a JWT and sends it to the API as `Authorization: Bearer <token>`.
3. The Express API verifies the token against the client's JWKS endpoint (`<CLIENT_URL>/api/auth/jwks`) and then reads or writes events and joins in MongoDB.

## Pages

| Route                 | Access  | Purpose                                                         |
| --------------------- | ------- | --------------------------------------------------------------- |
| `/`                   | Public  | Home: hero, causes, upcoming events, how it works, gallery, FAQ |
| `/events`             | Public  | All upcoming events with search, type filter and sorting        |
| `/events/[id]`        | Public  | Event details and Join button                                   |
| `/login`, `/register` | Public  | Authentication                                                  |
| `/create-event`       | Private | Host a new event                                                |
| `/manage-events`      | Private | Update or delete your events                                    |
| `/joined-events`      | Private | Events you have joined                                          |
| `/profile`            | Private | Edit your name and photo                                        |

## API endpoints

| Method | Path               | Auth | Description                                       |
| ------ | ------------------ | ---- | ------------------------------------------------- |
| GET    | `/`                | No   | Health check                                      |
| GET    | `/events`          | No   | Upcoming events. Query: `type`, `search`, `limit` |
| GET    | `/events/:id`      | No   | Single event                                      |
| POST   | `/events`          | Yes  | Create an event                                   |
| GET    | `/my-events`       | Yes  | Events created by the current user                |
| PUT    | `/events/:id`      | Yes  | Update your own event                             |
| DELETE | `/events/:id`      | Yes  | Delete your own event and its sign-ups            |
| POST   | `/events/:id/join` | Yes  | Join an upcoming event (once per user)            |
| GET    | `/joined`          | Yes  | Events the current user has joined                |

## Validation rules

- Event title: at least 5 characters.
- Event description: at least 20 characters.
- Event type: one of Cleanup, Plantation, Donation, Food Drive, Health Camp, Education.
- Thumbnail: a valid image URL.
- Event date: must be in the future.
- Password: at least 6 characters, with one uppercase and one lowercase letter.

## Getting started

You need Node.js 18 or newer, a MongoDB database, and a Google OAuth client.

### 1. Client

```bash
npm install
npm run dev
```

Create `.env.local` in the client folder:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=a_long_random_string
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=http://localhost:5000
```

In the Google Cloud console, add this authorized redirect URI:

```
http://localhost:3000/api/auth/callback/google
```

### 2. Server

```bash
npm install
npm run dev
```

Create `.env` in the server folder:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
```

`CLIENT_URL` is used for CORS and to find the JWKS endpoint, so it must be the address where the client runs. Several origins can be separated with commas, but the first one is used for JWKS.

### 3. Sample data (optional)

If you have the `seed.js` script in the server folder, it adds six sample events (one per type):

```bash
node seed.js
```

To make the sample events editable from your account, add these to the server `.env` first:

```env
SEED_EMAIL=your_login_email
SEED_NAME=Your Name
```

## Project structure

```
client/
  app/                 Pages (App Router) and the BetterAuth route
  components/          Navbar, Footer, EventCard, EventForm, Private, ThemeToggle
  lib/                 API helper, auth config, event types and helpers

server/
  index.js             Express API
  vercel.json          Vercel deployment config
```

## Deployment

Both parts are deployed on Vercel as separate projects.

- Client: set all client environment variables, with `BETTER_AUTH_URL` and the Google redirect URI pointing to the live client URL.
- Server: set `MONGODB_URI` and set `CLIENT_URL` to the live client URL. Set the client's `NEXT_PUBLIC_API_URL` to the deployed server URL.

Never commit `.env` files. They contain database and OAuth secrets.

## Contributing

Issues and pull requests are welcome. For larger changes, please open an issue first to discuss what you would like to change.

## License

Add a license of your choice (for example MIT) before publishing the repository.
