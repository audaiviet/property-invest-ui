```
npm install

npm run dev
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

# Cypress tests 
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

# Jest tests
Add file, jest.config.js, in project folder, to restrict jest to __tests__ folder. So it doesn't run Cypress tests!!!
```
module.exports = {
  roots: ["./__tests__"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
```
