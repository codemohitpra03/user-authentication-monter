
# User authentication and login mechanism

Allows user to register on the service securely and allows them to add their details.

Registers the user through OTP verification.





## API Reference

#### Home Route (Introductory info about application)

```http
  GET /
```


#### Register User

```http
  POST /auth/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of the user to be registered |
| `password`      | `string` | **Required**. Password of the user to be registered |

After successfully registering, ```POST /auth/register``` API endpoint automatically sends OTP to the user's email.

#### But due to some reason if user want to complete it's verification in future, then the below API endpoint is used to send OTP for verification to a particular user

#### Send OTP

```http
  POST /auth/send-otp
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of the user who needs to be verified through OTP verification |

This API endpoint sends OTP to user's email explicitly

#### Verify OTP

```http
  POST /auth/verify-otp
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `user_email`      | `string` | **Required**. Email of the user who needs to be verified through OTP verification |
| `otp`      | `string` | **Required**. OTP received on user's mail|

#### This verifies the user and enables it to login.

### Without OTP verification, User won't be able to Login !!! ⚠️


#### Login

```http
  POST /auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of the user trying to login |
| `password`      | `string` | **Required**. Password of the user |

#### Generates a JWT token which is stored inside cookies.

#### Logout

```http
  GET /auth/logout
```


#### Logs the user out


#### Add Details

```http
  POST /user/details
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of the user trying to login |
| `location`      | `string` |  Location of user |
| `age`      | `number` |  Age of user |
| `workDetails`      | `string` |  Work related info of user |


#### Get Details

```http
  GET /user/details?email=${user_email}
```
#### Retrieves saved user information .



## Tech Stack

**Server:** Node, Express, Nodemailer

**Database:** MongoDB


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI` MongoDB connection string

`JWT_SECRET` Secret for signing JWT token

`MY_EMAIL` Email address from which email will be sent (Required by nodemailer)

`MY_EMAIL_PASSWORD` Password credential for the email (Required by nodemailer)


## Run Locally

Clone the project

```bash
  git clone https://github.com/codemohitpra03/user-authentication-monter
```

Go to the project directory

```bash
  cd user-authentication-monter
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Live Deployment Link

https://user-authentication-monter-mohit-kanojia.onrender.com/

## Author

- [@codemohitpra03](https://www.github.com/codemohitpra03)

