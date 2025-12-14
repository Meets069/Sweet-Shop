#  Sweet Shop Management System

# Project Overview

The **Sweet Shop Management System** is a full-stack web application designed to manage sweets, inventory, and user interactions efficiently. It provides a secure and user-friendly platform where customers can browse, search, and purchase sweets, while administrators can manage inventory by adding, updating, restocking, or deleting sweets.

The project demonstrates real-world full-stack development skills, including RESTful API design, database integration, authentication, role-based access control, frontend development, testing, and the responsible use of AI tools.
# Key Features

* User registration and login with JWT-based authentication
* Role-based access (User & Admin)
* View all available sweets
* Search sweets by name, category, or price range
* Purchase sweets (auto-decreases stock)
* Admin-only features:

  * Add new sweets
  * Update sweet details
  * Restock sweets
  * Delete sweets
* Responsive and modern UI
* Fully tested backend using Test-Driven Development (TDD)

---

# Tech Stack

###Backend

* **Technology:** Node.js with Express
* **Authentication:** JSON Web Tokens (JWT)
* **Database:** MongoDB
* **Testing:** Jest / Supertest

### Frontend

* **Framework:** React
* **Styling:** CSS / Tailwind / Material UI (as applicable)
* **State Management:** React Hooks

---

##  Setup & Run Locally

###  Prerequisites

Make sure you have the following installed:

* Node.js (v18+ recommended)
* npm or yarn
* MongoDB (local or MongoDB Atlas)

---

###  Backend Setup

1. Clone the repository:


git clone https://github.com/your-username/sweet-shop.git
cd sweet-shop/backend
```

2. Install dependencies:
npm install

3. Create a `.env` file in the backend folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

4. Run the backend server:
npm start

5. Backend will run at:

http://localhost:5000

###  Frontend Setup

1. Navigate to the frontend directory:


cd ../frontend


2. Install dependencies:


npm install


3. Start the frontend application:

npm start


4. Frontend will run at:


http://localhost:3000


## 🧪 Running Tests

To run backend tests:

```bash
cd backend
npm test
```

Test results will be displayed in the terminal with coverage details.

---

