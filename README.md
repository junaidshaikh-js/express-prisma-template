# Express-Prisma API Template

A modern, scalable Express.js API template using Prisma ORM, leveraging **native Node.js TypeScript support** (no separate compiler required for development).

## ✨ Features

- **Native TypeScript**: Run `.ts` files directly in development using Node.js `--experimental-strip-types`.
- **API Versioning**: Scalable route and controller structure with versioning (e.g., `/api/v1/...`).
- **Prisma ORM**: Modern database access with type-safety and easy migrations.
- **Environment Management**: Validation and multi-environment support using `Zod` and `custom-env`.
- **Import Aliases**: Clean imports using the native `#/` alias (e.g., `import app from '#/app.ts'`).
- **Production Built**: Fast production bundling using `esbuild` with ESM output.
- **Logging**: Structured logging with `Winston`.
- **Quality Assurance**: ESLint, Prettier, Husky, and `lint-staged` pre-configured.
- **Health Check**: Comprehensive health checkpoint with database connectivity verification.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v24.14.0 (See [.nvmrc](.nvmrc))
- **Yarn**: Recommended package manager

### Installation

1. Clone the repository and navigate to the project directory.
2. Install dependencies:
   ```bash
   yarn install
   ```

### Development

Run the development server with hot-reloading:

```bash
yarn dev
```

### Production Build

Create a bundled production build in the `dist` directory:

```bash
yarn build
```

Run the production build:

```bash
yarn start
```

## 📂 Project Structure

```bash
src/
├── controllers/
│   └── v1/             # V1 Controllers
├── routes/
│   ├── v1/             # V1 Routes
│   │   ├── index.ts    # V1 Route aggregator
│   │   └── health.routes.ts
│   └── index.ts        # Main route aggregator
├── lib/
│   └── prisma.ts       # Prisma client singleton
├── utils/
│   └── logger.ts       # Winston logger configuration
├── env.ts              # Environment variable validation
├── app.ts              # Express application configuration
└── index.ts            # Server entry point
prisma/
└── schema.prisma       # Prisma schema
```

## 🛠 Scripts

- `yarn dev`: Start the dev server using Node's native TS support.
- `yarn build`: Create a production bundle with `esbuild`.
- `yarn start`: Run the production build.
- `yarn lint`: Run ESLint.
- `yarn format`: Format code with Prettier.
- `yarn prisma:migrate`: Run database migrations.
- `yarn prisma:studio`: Open Prisma Studio.

## 🏥 Health Check

The API includes a specialized health check route:

- **Endpoint**: `GET /api/v1/health`
- **Features**: Verifies database connectivity and returns system uptime.
