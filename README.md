# rw_frontend
```
todo: 
CREATE TABLE restaurants (
    restaurant_id INT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL, -- STORE HASHED PASSWORD
    address VARCHAR(255),
    phone_number VARCHAR(20),
    email VARCHAR(255),
    cuisine_type VARCHAR(100),
    website VARCHAR(255),
    description TEXT,
    hours_of_operation TEXT
);

restaurant entities for res_waitlist mgmt

```
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).