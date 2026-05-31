# King's Class

Client-facing prototype foundation for a school management application inspired by ClassDojo, built with React, TypeScript, Express, Prisma, and PostgreSQL.

## Structure

- `frontend` - React/Vite app with the login page, protected admin shell, navigation, and mock Class Feed.
- `backend` - Express API with real JWT authentication, Prisma models, and an admin seed.

## Admin Account

- Email: `admin@kingsclass.school`
- Password: `KingsClass!2026`

## Setup

1. Copy environment examples:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

2. Start the local Prisma Postgres dev database:

```bash
npm run db:start --workspace backend
```

3. Update `backend/.env` if the ports are different. Use the `DATABASE_URL` value from Prisma Dev for migrations, and the `TCP` value as `APP_DATABASE_URL` for the Express app.

4. Install dependencies:

```bash
npm install
```

5. Generate Prisma client, sync the local schema, and seed the admin:

```bash
npm run prisma:generate --workspace backend
npm run setup
```

6. Run both apps:

```bash
npm run dev
```
