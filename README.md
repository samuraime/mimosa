# Mimosa

The application is written in modern Javascript without Typescript.
It is a basic CRUD application with authentication, inspired by [Pocket](https://getpocket.com/).
The boilerplate starter is forked from [angular2-babel-esnext-starter](https://github.com/blacksonic/angular2-babel-esnext-starter)


### Concepts covered

- Creating components with directives
- Communication between child and parent components
- Dependency injection for services
- Change detection strategies
- Using custom pipes in templates
- Handling HTTP calls
- Using observables
- Routing
- Authentication and restricting access to routes
- Form handling

### Quick Start

```bash

git clone https://github.com/samuraime/mimosa.git
cd mimosa
npm install

gulp serve

```

It bundles the application, copies the static files and starts the webserver with Nodemon.
The transpiled application will have two separate ES5 compatible files: ```vendor.js``` for vendor libraries, ```main.js``` for application logic.
Server side changes restart the server, client side changes rebundle the Angular 2 application and refresh the page with Livereload.

Note: The application needs at least Node 7+ (async/await) installed.

### Deployment

It bundles the client application and copies static files and server files to the ```dist``` directory along with ```package.json```.

```bash

gulp dist

cd dist
npm start

```

## License

MIT