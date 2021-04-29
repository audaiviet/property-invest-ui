# property-invest-ui
## Database
Local mongodb runs on local pc at default location, localhost:27017

## Database service

### Run with docker
```
cd DatabaseService

docker build -t dbservice:v1 .

docker run -p 8080:80 dbservice:v1 --net=host
```
Access the service at http://localhost:8080/api/projects  
Access swagger at http://localhost:8080/swagger

## FrontEnd
```
cd FrontEnd

pnpm install

pnpm run dev
```

Website will be at http://localhost:3000  
You can check out their examples at,
- http://localhost:3000/components
- http://localhost:3000/landing
- http://localhost:3000/profile
- http://localhost:3000/login

Not connected the frontend to the service yet!!!
