## To run in dev env
```
npm install

npm run dev
```
## To run unit tests
Those are kept in __tests__
```
npm run test
```

## To run end to end tests
Those are kept in cypress/integration
```
npm run e2e
```

# Settings configurations
Settings required are currently kept in .env.local (.gitignore). To setup,
1. Copy .env.local.example to .env.local
2. Replace with values your environments such as Azure, Okta, Database, etc

# Appendices
## Project details

[Repo](https://github.com/audaiviet/property-invest-ui.git)
[Work board](https://github.com/audaiviet/property-invest-ui/projects/1)
## Cypress e2e testing configuration
For cypress tests use 'context' instead of 'describe' as this would conflict with jest tests!!!

Add file cypress/tsconfig.json,
```
{
  "compilerOptions": {
    "target": "es6",
    "lib": ["dom", "dom.iterable", "esnext"],
    "noEmit": true,
    // be explicit about types included
    // to avoid clashing with Jest types
    "types": ["cypress"]
  },
  "include": ["./**/*.ts"]
}
```

## Jest unit testing configuration
Add file, jest.config.js, in project folder, to restrict jest to __tests__ folder. So it doesn't run Cypress tests!!!
```
module.exports = {
  roots: ["./__tests__"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
```
## Technologies currently used in this project
- NextJS
- Material UI
- Storybook UI demo
- Jest test runner
- Mongodb
- Faunadb
- Azure blob storage for photos (will later try cloudinary instead)
- React Hook Form
- Okta identity provider