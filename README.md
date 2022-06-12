Here is the work that I've done for the backend of the Developers Technical Test.
Since I've never learned Typescript and NestJS before, I only studied a bit of NodeJS and ExpressJS for backend, I couldn't use the .env file correctly.

# auth folder

The auth folder has all the codes that deal with user login, hashing password, nestjs guard, and JWT authentication.

## available http requests

### `http://localhost:5000/auth/all`

to see all 3 accounts (2 users and 1 admin) for the app

### `http://localhost:5000/auth/signin`

to sign in to the app. User must provides username and password in Form URL Encode body.

### `http://localhost:5000/auth/create`

this create login is for developer that wishes to add more login info to the database.

# bookings folder

The bookings folder has all the codes that deal with getting booking data for user to view, let user manipulate booking data (create new, cancel booking, reject, approve)

## available http requests

### `http://localhost:5000/booking/allbookings`

must provide Authorization header with format 'Bearer <token>' to be able to view list of available bookings. Recommended you try to get token by the sigin request first.

### `http://localhost:5000/booking/new`

create new booking using data from the frontend. Must provide 'Bearer <token>'

### `http://localhost:5000/booking/cancel/[id]`

cancel a selected booking, this will also remove it from the database. Need to have a correct id of an existing booking in the database.

### `http://localhost:5000/booking/approve/[id]`

approve a selected booking, this will also remove it from the database. Need to have a correct id of an existing booking in the database.

### `http://localhost:5000/booking/reject/[id]`

reject a selected booking, this will also remove it from the database. Need to have a correct id of an existing booking in the database.

Dung Hong
