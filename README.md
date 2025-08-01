



# ✅ Fullstack Todo Application (TypeScript Powered)

A production-ready, full-featured Fullstack Todo App built using **TypeScript**, **REST API**, and modern frontend/backend best practices. This application is designed with performance, scalability, and developer experience in mind — including reusable UI components, API caching, input validation, and clean code structure.

---

## 🚀 Features

### 🌐 Frontend (React + TypeScript)
- [x] Built using **React** with **TypeScript**
- [x] UI powered by **ShadCN UI** (Radix + Tailwind)
- [x] Optimized component structure using reusable `Checkbox`, `Input`, `Label`
- [x] Edit `title` and `description` inline per todo (independently!)
- [x] Optimistic UI updates with local state sync
- [x] Toast notifications for feedback (`react-hot-toast`)
- [x] Strict typing for props, states, and API responses
- [x] Clean folder structure and separation of concerns

### 🖥️ Backend (Node.js + Express + TypeScript)
- [x] Built with **Express.js** and **TypeScript**
- [x] Fully RESTful API (CRUD operations)
- [x] MongoDB with **Mongoose** ODM and schema validation
- [x] Input validation and error handling
- [x] Separation of routes, controllers, models, and utils
- [x] Clean architecture (Controller-Service-Model pattern)
- [x] Cross-Origin Resource Sharing (CORS) enabled
- [x] Uses async/await with try/catch for API safety

---

## 🛠️ Tech Stack

| Layer         | Tech Used                          |
|---------------|------------------------------------|
| Frontend      | React, TypeScript, ShadCN UI, Vite |
| Backend       | Node.js, Express.js, TypeScript    |
| Database      | MongoDB + Mongoose                 |
| Styling       | Tailwind CSS                       |
| Utilities     | React Hot Toast, Lucide Icons      |
| API Protocol  | REST                               |
| Dev Tools     | Nodemon, ESLint, Prettier          |

---

## 📂 Folder Structure

```

fullstack-todo/
├── client/                    # Frontend (React + Vite)
│   ├── components/
│   ├── pages/
│   ├── types/
│   └── ...
├── server/                    # Backend (Express + TypeScript)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── ...
├── .env
├── package.json
└── README.md

````

---

## 🧑‍💻 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/gmprinceyt/fullstack-todo-application
cd fullstack-todo-application
````

### 2️⃣ Setup the Backend

```bash
cd server
npm install
```

Create `.env` file inside `server/` with the following:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/todo-app
```

Start development server:

```bash
npm run dev
```

---

### 3️⃣ Setup the Frontend

```bash
cd ../client
npm install
npm run dev
```

Your app will now be running at `http://localhost:5173` and connected to the backend at `http://localhost:3000`.

---

## ✨ Advanced Features

* 🔄 **Live sync** between UI and API
* 🎯 **Edit-mode tracking** per todo using field-specific state
* ⚡ **Optimistic updates** to improve UX and perceived speed
* ❌ **API error handling** with user feedback via toasts
* 🔐 **Type safety** everywhere: props, API payloads, form values
* ♻️ **Reusability** through modular component design

---

## 🧪 Example API Endpoints

| Method | Endpoint           | Description       |
| ------ | ------------------ | ----------------- |
| GET    | `/api/v1/todo`     | Get all todos     |
| POST   | `/api/v1/todo/new` | Create a new todo |
| PATCH  | `/api/v1/todo/:id` | Update a todo     |
| DELETE | `/api/v1/todo/:id` | Delete a todo     |

---



## 👨‍💻 Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'add feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a pull request

---

## ⚡ Future Plans

* [ ] Add authentication (JWT + roles)
* [ ] Filter by status (completed/pending)
* [ ] Drag-and-drop reordering
* [ ] Deploy to Vercel + Render/MongoDB Atlas
* [ ] Add testing (Jest + React Testing Library)

---


## 🧠 Inspiration

Built as part of a **200 Days of Code Challenge** to demonstrate real-world fullstack app building using **clean code**, **scalable patterns**, and **industry-ready TypeScript**.

---

## 🙌 Author

Made with 💻 by [Prince Shah](https://github.com/gmprinceyt)


---
