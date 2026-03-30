Perfect. Below is a **production-ready MySQL database schema design** for **Reign Ads Limited**, built specifically for:

* React frontend
* Laravel backend (API-driven)
* Admin dashboard management
* Portfolio-heavy content
* SEO optimization
* Scalability

This schema supports:

* Services management
* Portfolio/projects
* Clients
* Blog (optional but recommended)
* Contact submissions
* Media uploads
* Admin users & roles
* Homepage content control

---

# 🗄 DATABASE: `reign_ads_db`

---

# 1️⃣ USERS TABLE (Admin Authentication)

```sql
CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('super_admin', 'admin', 'editor') DEFAULT 'admin',
    is_active BOOLEAN DEFAULT TRUE,
    email_verified_at TIMESTAMP NULL,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

# 2️⃣ SERVICES TABLE

```sql
CREATE TABLE services (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    short_description TEXT,
    description LONGTEXT,
    category ENUM('out_of_home', 'branding', 'production', 'agency') NOT NULL,
    icon VARCHAR(255),
    featured_image VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    status ENUM('draft', 'published') DEFAULT 'draft',
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

# 3️⃣ PROJECTS (PORTFOLIO)

```sql
CREATE TABLE projects (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    client_id BIGINT UNSIGNED NULL,
    service_id BIGINT UNSIGNED NULL,
    short_description TEXT,
    description LONGTEXT,
    location VARCHAR(255),
    completion_date DATE,
    featured_image VARCHAR(255),
    video_url VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    status ENUM('draft', 'published') DEFAULT 'draft',
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL
);
```

---

# 4️⃣ PROJECT GALLERY (Multiple Images per Project)

```sql
CREATE TABLE project_images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id BIGINT UNSIGNED NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
```

---

# 5️⃣ CLIENTS TABLE

```sql
CREATE TABLE clients (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(255),
    website_url VARCHAR(255),
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

# 6️⃣ BLOG POSTS (Optional but Recommended for SEO)

```sql
CREATE TABLE posts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content LONGTEXT NOT NULL,
    featured_image VARCHAR(255),
    author_id BIGINT UNSIGNED,
    status ENUM('draft', 'published') DEFAULT 'draft',
    published_at TIMESTAMP NULL,
    seo_title VARCHAR(255),
    seo_description TEXT,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);
```

---

# 7️⃣ CONTACT FORM SUBMISSIONS

```sql
CREATE TABLE contact_submissions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

# 8️⃣ MEDIA LIBRARY (Centralized File Management)

```sql
CREATE TABLE media (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    file_type VARCHAR(100),
    file_size INT,
    uploaded_by BIGINT UNSIGNED,
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE SET NULL
);
```

---

# 9️⃣ HOMEPAGE SETTINGS (Dynamic Content Control)

```sql
CREATE TABLE homepage_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hero_title VARCHAR(255),
    hero_subtitle TEXT,
    hero_video_url VARCHAR(255),
    about_section TEXT,
    tagline VARCHAR(255),
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

# 🔟 SITE SETTINGS (Company Info Management)

```sql
CREATE TABLE site_settings (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(255),
    address VARCHAR(255),
    phone VARCHAR(50),
    email VARCHAR(150),
    secondary_email VARCHAR(150),
    website_url VARCHAR(255),
    facebook VARCHAR(255),
    instagram VARCHAR(255),
    linkedin VARCHAR(255),
    twitter VARCHAR(255),
    logo VARCHAR(255),
    favicon VARCHAR(255),
    created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

---

# 📊 RELATIONSHIP OVERVIEW

* One Client → Many Projects
* One Service → Many Projects
* One Project → Many Images
* One User → Many Posts
* One User → Many Media Uploads

---

# ⚡ INDEXING (IMPORTANT FOR PERFORMANCE)

Add indexes for:

```sql
CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_services_status ON services(status);
```

---

# 🚀 SCALABILITY READY

This structure allows:

* Easy expansion into multiple countries
* Multi-branch support
* Role-based admin expansion
* API-first architecture
* Headless CMS model (React consuming Laravel API)

---

If you'd like next, I can:

* Design the Laravel Eloquent model relationships
* Write migration files for Laravel
* Create API route structure
* Design admin dashboard architecture
* Design full ER diagram explanation
* Or optimize this schema for high traffic scaling

Tell me what you want next.
