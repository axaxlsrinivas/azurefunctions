# Login API with JWT Authentication

This project is an Azure Function App that provides a simple login API using JWT-based authentication. It accepts user credentials (email and password), validates them, and returns a JWT token upon successful authentication.

## Project Structure

```
login-api
├── LoginFunction
│   ├── index.js          # Main logic for the HTTP trigger function
│   ├── function.json     # Configuration for the Azure Function
├── shared
│   └── auth.js           # User validation and JWT generation functions
├── host.json             # Global configuration options for Azure Functions
├── local.settings.json    # Local development settings
├── package.json          # npm configuration file
└── README.md             # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd login-api
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure local settings:**
   Update the `local.settings.json` file with your environment variables, including the JWT secret key.

4. **Run the Azure Function locally:**
   ```
   func start
   ```

## Usage

To authenticate a user, send a POST request to the `/api/LoginFunction` endpoint with the following JSON body:

```json
{
  "email": "user@example.com",
  "password": "yourpassword"
}
```

### Response

On successful authentication, the API will return a JWT token:

```json
{
  "token": "your_jwt_token"
}
```

## Dependencies

- **jsonwebtoken**: For generating and verifying JWT tokens.
- **bcryptjs**: For hashing and comparing passwords.
- **dotenv**: For loading environment variables from a `.env` file.

## License

This project is licensed under the MIT License.