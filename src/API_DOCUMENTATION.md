# 📝 Nice Recruitment API Documentation

---

## 🔐 AUTH ROUTES

### ✍️ Signup
- **Endpoint:** `/api/v1/nice_recuirement/auth/signup`
- **Method:** `POST`
- **Description:** Register a new user.

### 🔑 Signin
- **Endpoint:** `/api/v1/nice_recuirement/auth/signin`
- **Method:** `POST`
- **Description:** Login an existing user.

### 🚪 Logout
- **Endpoint:** `/api/v1/nice_recuirement/auth/logout`
- **Method:** `POST`
- **Description:** Logout the current user.

### 🔄 Reset Password
- **Endpoint:** `/api/v1/nice_recuirement/auth/reset-password`
- **Method:** `POST`
- **Description:** Reset a user's password.

---

## 🖼️ GALLERY ROUTES

### ➕ Create Gallery Item
- **Endpoint:** `/api/v1/nice_recuirement/gallery/create`
- **Method:** `POST`
- **Description:** Add a new gallery item.

### ✏️ Update Gallery Item
- **Endpoint:** `/api/v1/nice_recuirement/gallery/update/:id`
- **Method:** `PATCH`
- **Description:** Update an existing gallery item.

### 📋 Get All Gallery Items
- **Endpoint:** `/api/v1/nice_recuirement/gallery/find-all`
- **Method:** `GET`
- **Description:** Retrieve all gallery items.

### 🗑️ Delete Gallery Item
- **Endpoint:** `/api/v1/nice_recuirement/gallery/remove/:id`
- **Method:** `DELETE`
- **Description:** Delete a gallery item.

---

## 📰 NEWSLETTER ROUTES

### ➕ Subscribe / Create Newsletter
- **Endpoint:** `/api/v1/nice_recuirement/news-letter/subscribe`
- **Method:** `POST`
- **Description:** Subscribe to or create a newsletter.

### 📋 Get All Newsletters
- **Endpoint:** `/api/v1/nice_recuirement/news-letter/find-all`
- **Method:** `GET`
- **Description:** Retrieve all newsletters.

### ✏️ Update Newsletter
- **Endpoint:** `/api/v1/nice_recuirement/news-letter/update/:id`
- **Method:** `PATCH`
- **Description:** Update a newsletter.

### 🗑️ Delete Newsletter
- **Endpoint:** `/api/v1/nice_recuirement/news-letter/remove/:id`
- **Method:** `DELETE`
- **Description:** Delete a newsletter.

### 📤 Send Newsletter
- **Endpoint:** `/api/v1/nice_recuirement/news-letter/send`
- **Method:** `POST`
- **Description:** Send a newsletter to all subscribers.

---

## ⚙️ SERVICES ROUTES

### ➕ Create Service
- **Endpoint:** `/api/v1/nice_recuirement/services/create`
- **Method:** `POST`
- **Description:** Create a new service.

### ✏️ Update Service
- **Endpoint:** `/api/v1/nice_recuirement/services/update/:id`
- **Method:** `PATCH`
- **Description:** Update an existing service.

### 📋 Get All Services
- **Endpoint:** `/api/v1/nice_recuirement/services/find-all`
- **Method:** `GET`
- **Description:** Retrieve all services.

### 🗑️ Delete Service
- **Endpoint:** `/api/v1/nice_recuirement/services/remove/:id`
- **Method:** `DELETE`
- **Description:** Delete a service.

---

## 💼 JOBS ROUTES

### ➕ Create Job
- **Endpoint:** `/api/v1/nice_recuirement/jobs/create`
- **Method:** `POST`
- **Description:** Add a new job listing.

### ✏️ Update Job
- **Endpoint:** `/api/v1/nice_recuirement/jobs/update/:id`
- **Method:** `PATCH`
- **Description:** Update an existing job listing.

### 📋 Get All Jobs
- **Endpoint:** `/api/v1/nice_recuirement/jobs/find-all`
- **Method:** `GET`
- **Description:** Retrieve all job listings.

### 🗑️ Delete Job
- **Endpoint:** `/api/v1/nice_recuirement/jobs/remove/:id`
- **Method:** `DELETE`
- **Description:** Delete a job listing.

---

## 📢 ADVERTISE ROUTES

### ➕ Create Advertisement
- **Endpoint:** `/api/v1/nice_recuirement/advertise/create`
- **Method:** `POST`
- **Description:** Add a new advertisement.

### ✏️ Update Advertisement
- **Endpoint:** `/api/v1/nice_recuirement/advertise/update/:id`
- **Method:** `PATCH`
- **Description:** Update an existing advertisement.

### 📋 Get All Advertisements
- **Endpoint:** `/api/v1/nice_recuirement/advertise/find-all`
- **Method:** `GET`
- **Description:** Retrieve all advertisements.

### 🗑️ Delete Advertisement
- **Endpoint:** `/api/v1/nice_recuirement/advertise/remove/:id`
- **Method:** `DELETE`
- **Description:** Delete an advertisement.

---

## 🎓 CERTIFICATES ROUTES

### ➕ Create Certificate
- **Endpoint:** `/api/v1/nice_recuirement/certificate/create`
- **Method:** `POST`
- **Description:** Add a new certificate.

### ✏️ Update Certificate
- **Endpoint:** `/api/v1/nice_recuirement/certificate/update/:id`
- **Method:** `PATCH`
- **Description:** Update an existing certificate.

### 📋 Get All Certificates
- **Endpoint:** `/api/v1/nice_recuirement/certificate/find-all`
- **Method:** `GET`
- **Description:** Retrieve all certificates.

### 🗑️ Delete Certificate
- **Endpoint:** `/api/v1/nice_recuirement/certificate/remove/:id`
- **Method:** `DELETE`
- **Description:** Delete a certificate.

---

## 📝 BLOG ROUTES

### ➕ Create Blog
- **Endpoint:** `/api/v1/nice_recuirement/blog/create`
- **Method:** `POST`
- **Description:** Add a new blog post.

### ✏️ Update Blog
- **Endpoint:** `/api/v1/nice_recuirement/blog/update/:id`
- **Method:** `PATCH`
- **Description:** Update an existing blog post.

### 📋 Get All Blogs
- **Endpoint:** `/api/v1/nice_recuirement/blog/find-all`
- **Method:** `GET`
- **Description:** Retrieve all blog posts.

### 🗑️ Delete Blog
- **Endpoint:** `/api/v1/nice_recuirement/blog/remove/:id`
- **Method:** `DELETE`
- **Description:** Delete a blog post.

---

## 🏢 CLIENTS ROUTES

### ➕ Add Client
- **Endpoint:** `/api/v1/nice_recuirement/clients/create`
- **Method:** `POST`
- **Description:** Add a new client.

### ✏️ Update Client
- **Endpoint:** `/api/v1/nice_recuirement/clients/update/:id`
- **Method:** `PATCH`
- **Description:** Update client information.

### 📋 Get All Clients
- **Endpoint:** `/api/v1/nice_recuirement/clients/find-all`
- **Method:** `GET`
- **Description:** Retrieve all clients.

### 🗑️ Delete Client
- **Endpoint:** `/api/v1/nice_recuirement/clients/remove/:id`
- **Method:** `DELETE`
- **Description:** Delete a client.

---

## 💬 TESTIMONIALS ROUTES

### ➕ Create Testimonial
- **Endpoint:** `/api/v1/nice_recuirement/testimonials/create`
- **Method:** `POST`
- **Description:** Add a new testimonial.

### ✏️ Update Testimonial
- **Endpoint:** `/api/v1/nice_recuirement/testimonials/update/:id`
- **Method:** `PATCH`
- **Description:** Update an existing testimonial.

### 📋 Get All Testimonials
- **Endpoint:** `/api/v1/nice_recuirement/testimonials/find-all`
- **Method:** `GET`
- **Description:** Retrieve all testimonials.

### 🗑️ Delete Testimonial
- **Endpoint:** `/api/v1/nice_recuirement/testimonials/remove/:id`
- **Method:** `DELETE`
- **Description:** Delete a testimonial.