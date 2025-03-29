# Assignment(Backend) BinBag API

### Postman Collection Url - https://www.postman.com/docking-module-geoscientist-45208416/ajay/documentation/lxwlsk6/binbag-assignment-postman-collection

## Overview
Assignment BinBag is a user authentication and profile management API. It allows users to:
- Register an account
- Authenticate using JWT tokens
- Retrieve their own profile
- Update their profile (excluding email and password for security reasons)

## Features
- Secure user authentication using JWT
- Profile retrieval (only for authenticated users)
- Profile update (excluding email & password)
- MongoDB as the database
- Postman collection provided for API testing

---

## Getting Started
### 1️⃣ Setup & Installation

#### **Option 1: Download the ZIP File**
1. Download the repository as a ZIP file.
2. Extract the ZIP and open the project in an IDE (e.g., VS Code).
3. Navigate to the project folder:
   ```sh
   cd Assignment_BinBag
   ```
4. Install dependencies:
   ```sh
   npm install
   ```
5. Start the server:
   ```sh
   npm start
   ```
6. The server will run on the configured port.

#### **Option 2: Clone from GitHub**
1. Open Git Bash and run:
   ```sh
   git clone git@github.com:ajaysaraswat/Assignment_BinBag.git
   ```
2. Navigate to the project directory:
   ```sh
   cd Assignment_BinBag
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the server:
   ```sh
   npm start
   ```

---

### 2️⃣ Environment Configuration
1. Create a `.env` file in the project root.
2. Copy the content from `.env.sample`:
   ```env
   PORT = 8000
   MONGO_URL = mongodb://localhost:27017/BinBag
   JWT_SECRET_KEY = $BinBag123
   ```

---

### 3️⃣ API Documentation
Base URL: `/api/user`

#### **User Registration**
- **Endpoint:**  `POST /api/user/register`
- **Request Body:**
  ```json
  {
    "name": "Ajay Kumar Saraswat",
    "email": "ajaykumar@example.com",
    "password": "SecurePass123",
    "address": "123 Hostel Street, City",
    "bio": "Computer Engineer passionate about AI and Web Development",
    "profileImageURL": "https://example.com/profile.jpg"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### **User Login**
- **Endpoint:** `POST /api/user/login`
- **Request Body:**
  ```json
  {
    "email": "ajaykumar@example.com",
    "password": "SecurePass123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "<your jwt token>"
  }
  ```

---

### 4️⃣ Profile Management (Authenticated Users Only)
#### **Retrieve Profile**
- **Endpoint:** `GET /api/user/profile`
- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Response:**
  ```json
  {
    "_id": "67e7d335c78b608518b348d4",
    "name": "Ajay Kumar Saraswat",
    "email": "ajaykumar@example.com",
    "profileImageURL": "https://example.com/profile.jpg",
    "bio": "Computer Engineer passionate about AI and Web Development",
    "address": "123 Hostel Street, City",
    "createdAt": "2025-03-29T11:02:13.334Z",
    "updatedAt": "2025-03-29T11:11:54.612Z",
    "__v": 0
  }
  ```
- **Error Response:**
  ```json
  {
    "error": "Unauthorized access"
  }
  ```
  provided Authorization as seen in the image ![Screenshot 2025-03-29 193547](https://github.com/user-attachments/assets/21cd9dcb-229b-4849-85a7-faa3d0fe27aa)


#### **Update Profile**
- **Endpoint:** `PUT /api/user/update`
- **Headers:**
  ```
  Authorization: Bearer <token>
  ```
- **Request Body:**
  ```json
  {
    "address": "House 3, Palam, Aligarh",
    "bio": "Computer Engineer passionate about AI and Web Development in current scenario"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Profile updated successfully",
    "user": {
      "_id": "67e7d335c78b608518b348d4",
      "name": "Ajay Kumar Saraswat",
      "email": "ajaykumar@example.com",
      "profileImageURL": "https://example.com/profile.jpg",
      "bio": "Computer Engineer passionate about AI and Web Development in current scenario",
      "address": "House 3, Palam, Aligarh",
      "createdAt": "2025-03-29T11:02:13.334Z",
      "updatedAt": "2025-03-29T11:11:54.612Z",
      "__v": 0
    }
  }
  ```
provided Authorization as seen in the image ![Screenshot 2025-03-29 193833](https://github.com/user-attachments/assets/d30c45a1-ebe2-4b72-b989-a08fdbc9f26a)

---

## Postman Collection
For easier API testing, use the provided [Postman Collection](#https://www.postman.com/docking-module-geoscientist-45208416/ajay/documentation/lxwlsk6/binbag-assignment-postman-collection) (link to be added).

---



