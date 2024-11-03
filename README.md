# Firebase CRUD Backend

A simple CRUD (Create, Read, Update, Delete) backend application built with Node.js and Firebase. This application manages basic user data with fields for ID, name, and age.

## Prerequisites

- Node.js (v14 or higher)
- Firebase account
- Firebase project setup

## Installation

1. Clone the repository:
```bash
git clone https://github.com/GauravVKulkarni/firebase-crud-backend.git
cd firebase-crud-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Firebase configuration:
```env
FIREBASE_API_KEY=your_api_key
FIREBASE_AUTH_DOMAIN=your_auth_domain
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_storage_bucket
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id
```

## API Endpoints

- **GET** `/read` - Get all users
- **POST** `/create` - Create a new user
- **PUT** `/update/:id` - Update a user
- **DELETE** `/delete/:id` - Delete a user

### Request Body Format (POST/PUT)

```json
{
  "name": "John Doe",
  "age": 25
}
```

## Usage

1. Start the server:
```bash
npm start
```

2. The API will be available at `http://localhost:3000` (or your configured port)

## Example Requests

### Create a User
```bash
curl -X POST http://localhost:3000/create \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "age": 25}'
```

### Get All Users
```bash
curl http://localhost:3000/read
```

## Project Structure
```
├── views/
│   └── page.ejs
├── app.js
├── package.json
├── package-lock.json
├── .env
└── .gitignore
├── README.md
└── LICENCE
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
