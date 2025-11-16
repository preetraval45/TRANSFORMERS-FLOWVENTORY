# Flowventory Project Folder Structure
## TRANSFORMERS Team - ITIS 3300

**Last Updated:** November 16, 2025
**Version:** 2.0

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Root Directory Structure](#root-directory-structure)
3. [Frontend Structure](#frontend-structure)
4. [Backend Structure](#backend-structure)
5. [Documentation Structure](#documentation-structure)
6. [Database Structure](#database-structure)
7. [Docker Configuration](#docker-configuration)
8. [File Descriptions](#file-descriptions)
9. [Key Configuration Files](#key-configuration-files)
10. [Code Organization Standards](#code-organization-standards)

---

## Project Overview

**Repository:** TRANSFORMERS-FLOWVENTORY
**Project Type:** Full-Stack Web Application
**Tech Stack:**
- Frontend: Next.js 15, React 19, Tailwind CSS
- Backend: Python FastAPI, SQLAlchemy
- Database: PostgreSQL
- Containerization: Docker & Docker Compose

---

## Root Directory Structure

```
TRANSFORMERS-FLOWVENTORY/
├── Backend/                          # Python FastAPI backend application
├── Database/                         # Database schemas and configurations
├── Docker/                           # Docker orchestration files
├── Documentation/                    # Project documentation
│   ├── Minutes/                      # Meeting notes
│   └── uml/                          # UML diagrams
├── Frontend/                         # Next.js frontend application
│   ├── flowventory-app/              # Main application
│   └── UI/                           # Design mockups
├── submission/                       # Deliverable submission files
├── .git/                             # Git version control
├── .gitignore                        # Git ignore rules
├── .vscode/                          # VS Code workspace settings
├── README.md                         # Main project README
├── GROUP-INFO.md                     # Team member information
├── TODO.md                           # Outstanding tasks
├── Test_Cases_Report.md              # Original test cases (Phase 3)
├── DELIVERABLE_4_TEST_CASES.md       # Updated test cases (Phase 4)
├── PROJECT_STRUCTURE.md              # This file
├── inspection-code-transformers.md   # Code inspection report
├── NOTES DELIVERABLE 3.txt           # Phase 3 notes
├── generate_pdf.py                   # PDF generation utility
└── Transformers - Deliverable 4.docx # Deliverable document

```

**Total Files:** 500+ (including node_modules)
**Source Code Files:** ~50
**Documentation Files:** 20+

---

## Frontend Structure

### Complete Frontend Directory Tree

```
Frontend/
├── flowventory-app/                  # Next.js 15 Application
│   ├── .next/                        # Next.js build output (auto-generated)
│   ├── node_modules/                 # NPM dependencies (18,000+ files)
│   ├── public/                       # Static assets
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   ├── src/                          # Source code directory
│   │   ├── app/                      # Next.js App Router
│   │   │   ├── admin/                # User Management Page
│   │   │   │   └── page.jsx          # Admin dashboard component
│   │   │   ├── dashboard/            # Main Dashboard
│   │   │   │   └── page.jsx          # Dashboard with metrics
│   │   │   ├── inventory/            # Inventory Management
│   │   │   │   └── page.jsx          # Inventory CRUD page
│   │   │   ├── login/                # Authentication
│   │   │   │   └── page.jsx          # Login form component
│   │   │   ├── pick/                 # Pick/Pull Operations
│   │   │   │   └── page.jsx          # Item picking interface
│   │   │   ├── shipments/            # Shipment Tracking
│   │   │   │   └── page.jsx          # Shipments list and forms
│   │   │   ├── stock/                # Stock Management
│   │   │   │   └── page.jsx          # Stock operations page
│   │   │   ├── uploads/              # File Upload
│   │   │   │   └── page.jsx          # File upload interface
│   │   │   ├── favicon.ico           # Site favicon
│   │   │   ├── globals.css           # Global CSS styles
│   │   │   ├── layout.jsx            # Root layout component
│   │   │   └── page.jsx              # Home/landing page
│   │   ├── components/               # Reusable React Components
│   │   │   ├── FlowventoryLogo.jsx   # SVG logo component
│   │   │   ├── Layout.jsx            # Layout wrapper component
│   │   │   └── Navigation.jsx        # Top navigation bar
│   │   ├── contexts/                 # React Context API
│   │   │   └── AuthContext.jsx       # Authentication state management
│   │   └── data/                     # Static/Mock Data
│   │       └── users.js              # Test user fixtures
│   ├── lib/                          # Utility Libraries
│   │   └── api.ts                    # API service layer (Axios)
│   ├── .dockerignore                 # Docker ignore rules
│   ├── .env                          # Environment variables (gitignored)
│   ├── .env.example                  # Environment template
│   ├── .eslintrc.json                # ESLint configuration (legacy)
│   ├── .gitignore                    # Git ignore rules
│   ├── docker-compose.yml            # Docker Compose configuration
│   ├── docker-compose.yml.bak        # Backup docker-compose
│   ├── Dockerfile                    # Frontend Docker image
│   ├── eslint.config.mjs             # ESLint 9 configuration
│   ├── jsconfig.json                 # JavaScript path aliases
│   ├── next-env.d.ts                 # Next.js TypeScript declarations
│   ├── next.config.js                # Next.js configuration
│   ├── next.config.ts                # Next.js TS configuration
│   ├── nginx.conf                    # Nginx reverse proxy config
│   ├── package-lock.json             # NPM dependency lock file
│   ├── package.json                  # NPM dependencies and scripts
│   ├── postcss.config.mjs            # PostCSS configuration (Tailwind)
│   ├── README.md                     # Frontend documentation
│   ├── tailwind.config.js            # Tailwind CSS configuration
│   ├── tsconfig.json                 # TypeScript configuration
│   └── USER_CREDENTIALS.md           # Test user credentials
└── UI/                               # Design Assets
    ├── mockups/                      # UI/UX mockups (if any)
    └── wireframes/                   # Wireframes (if any)
```

### Frontend File Count by Type

| File Type | Count | Purpose |
|-----------|-------|---------|
| `.jsx` | 12 | React page components |
| `.js` / `.ts` | 8 | Utility files, configs |
| `.css` | 1 | Global styles |
| `.svg` | 5 | Icon assets |
| `.json` | 5 | Configuration files |
| `.md` | 2 | Documentation |
| Docker files | 3 | Containerization |

### Frontend Pages and Routes

| Route | File | Purpose | Access Level |
|-------|------|---------|--------------|
| `/` | `app/page.jsx` | Landing/home page | Public |
| `/login` | `app/login/page.jsx` | User authentication | Public |
| `/dashboard` | `app/dashboard/page.jsx` | Main dashboard with metrics | Authenticated |
| `/inventory` | `app/inventory/page.jsx` | Inventory CRUD operations | Admin, Engineer, Manager |
| `/stock` | `app/stock/page.jsx` | Stock management | Admin, Engineer, Manager |
| `/pick` | `app/pick/page.jsx` | Pick/pull operations | Admin, Engineer, Manager |
| `/shipments` | `app/shipments/page.jsx` | Shipment tracking | Admin, Engineer, Manager |
| `/admin` | `app/admin/page.jsx` | User management | Admin only |
| `/uploads` | `app/uploads/page.jsx` | File upload interface | Authenticated |

---

## Backend Structure

### Complete Backend Directory Tree

```
Backend/
├── db/                               # Database Layer
│   ├── __init__.py                   # Package initializer
│   ├── database.py                   # SQLAlchemy engine & session setup
│   ├── db_models.py                  # SQLAlchemy ORM models (5 entities)
│   ├── models.py                     # Pydantic schemas for validation
│   ├── dependency.py                 # Database session dependencies
│   ├── memory.py                     # In-memory storage (for testing)
│   ├── migrate_warehouse_fields.py   # Database migration script
│   └── __pycache__/                  # Python bytecode cache
├── routers/                          # FastAPI Route Handlers
│   ├── __init__.py                   # Package initializer
│   ├── users.py                      # User management endpoints
│   ├── orders.py                     # Order management endpoints
│   ├── shipments.py                  # Shipment management endpoints
│   ├── inventory.py                  # Inventory management endpoints
│   ├── packing_slips.py              # Packing slip endpoints
│   └── __pycache__/                  # Python bytecode cache
├── .env                              # Environment variables (gitignored)
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── Dockerfile                        # Backend Docker image
├── main.py                           # FastAPI application entry point
├── requirements.txt                  # Python dependencies
├── seed_data.py                      # Database seeding script
├── seed_warehouse_data.py            # Warehouse-specific seed data
└── __pycache__/                      # Python bytecode cache
```

### Backend File Count by Type

| File Type | Count | Purpose |
|-----------|-------|---------|
| `.py` | 16 | Python source files |
| `.txt` | 1 | Requirements file |
| `.env` | 1 | Environment config |
| `Dockerfile` | 1 | Container image |

### Database Models (ORM)

**File:** `db/db_models.py`

| Model | Table Name | Fields | Relationships |
|-------|------------|--------|---------------|
| `User` | `users` | id, username, firstname, role, password, assigned_pages | → orders, packing_slips |
| `Order` | `orders` | id, client_id, status, notes, items | ← user, → shipments |
| `Shipment` | `shipments` | id, invoice_number, invoice_date, due_date, ship_via, qty, item_type, order_id | ← order, → inventory_items, packing_slips |
| `InventoryItem` | `inventory_items` | id, item_id, sku, description, vendor, quantity, zone, aisle, rack, shelf, bin, storage_location, category, barcode, status, last_shipment_id | ← shipment, → packing_slips |
| `PackingSlip` | `packing_slips` | id, filename, content_type, file_url, shipment_id, inventory_item_id, uploaded_by | ← shipment, inventory_item, user |

### Pydantic Schemas

**File:** `db/models.py`

| Schema In | Schema Out | Purpose |
|-----------|------------|---------|
| `UserIn` | `UserOut` | User creation and retrieval |
| `OrderIn` | `OrderOut` | Order creation and retrieval |
| `ShipmentIn` | `ShipmentOut` | Shipment creation and retrieval |
| `InventoryItemIn` | `InventoryItemOut` | Inventory item creation and retrieval |
| `PackingSlipIn` | `PackingSlipOut` | Packing slip upload and retrieval |

### API Endpoints

**File:** `main.py` includes all routers

| Router | Prefix | Endpoints | Methods |
|--------|--------|-----------|---------|
| `users_router` | `/users` | `/`, `/{user_id}` | GET, POST, PUT, DELETE |
| `orders_router` | `/orders` | `/`, `/{order_id}` | GET, POST, PUT, DELETE |
| `shipments_router` | `/shipments` | `/`, `/{ship_id}` | GET, POST, PUT, DELETE |
| `inventory_router` | `/inventory` | `/`, `/{item_id}` | GET, POST, PUT, DELETE |
| `packing_slips_router` | `/packing_slips` | `/`, `/{ps_id}` | GET, POST, PUT, DELETE |

**Total API Endpoints:** 25+

### Python Dependencies

**File:** `requirements.txt`

```
fastapi
uvicorn[standard]
sqlalchemy
psycopg2-binary
pydantic
python-dotenv
python-multipart
```

---

## Documentation Structure

### Complete Documentation Directory Tree

```
Documentation/
├── Minutes/                          # Meeting Minutes
│   ├── 8-24.md                       # Aug 24 meeting
│   ├── 9-15.md                       # Sep 15 meeting
│   ├── 9-25.md                       # Sep 25 meeting
│   ├── 10-20.md                      # Oct 20 meeting
│   ├── 11-6.md                       # Nov 6 meeting
│   └── 11-11.md                      # Nov 11 meeting
├── uml/                              # UML Diagrams
│   ├── flowventory_class_diagram_enhanced.puml
│   ├── flowventory_simple_class_diagram.puml
│   ├── flowventory_updated_class_diagram.puml       # Latest
│   ├── flowventory_usecase_diagram_vertical.puml
│   ├── flowventory_updated_usecase_diagram.puml     # Latest
│   ├── sequence_diagrams.puml
│   ├── flowventory_updated_sequence_diagrams.puml   # Latest
│   ├── UML - Class Diagram.png
│   ├── UML - Class Structure.png
│   └── UML - Use Case.png
├── Deliverable_3_Report.md           # Phase 3 comprehensive report
└── DELIVERABLE_3_SUMMARY.md          # Phase 3 summary
```

### Documentation File Count

| Document Type | Count | Description |
|---------------|-------|-------------|
| Meeting Minutes | 6 | Team meetings from Aug-Nov |
| UML Diagrams (PlantUML) | 7 | Class, Use Case, Sequence diagrams |
| UML Images (PNG) | 3 | Rendered diagram images |
| Reports | 2 | Deliverable reports |

### UML Diagram Details

#### Updated Class Diagram
**File:** `uml/flowventory_updated_class_diagram.puml`
- **Entities:** User, Order, Shipment, InventoryItem, PackingSlip
- **Schemas:** UserIn/Out, InventoryItemIn/Out
- **Controllers:** UsersRouter, OrdersRouter, ShipmentsRouter, InventoryRouter, PackingSlipsRouter
- **Components:** AuthContext, Navigation, Dashboard, InventoryPage, AdminPage
- **Relationships:** 15+ associations and inheritances

#### Updated Use Case Diagram
**File:** `uml/flowventory_updated_usecase_diagram.puml`
- **Use Cases:** 37 (including error cases)
- **Actors:** 4 user roles + 2 system actors
- **Modules:** 9 functional modules
- **Normal Flows:** 25
- **Error Flows:** 12

#### Updated Sequence Diagrams
**File:** `uml/flowventory_updated_sequence_diagrams.puml`
- **Diagrams:** 12 sequence diagrams
- **Categories:**
  - Authentication (2 diagrams: normal + error)
  - Inventory (2 diagrams: normal + error)
  - Pick Operations (2 diagrams: normal + error)
  - User Management (2 diagrams)
  - Shipments (2 diagrams: normal + error)
  - Dashboard (2 diagrams: normal + error)

---

## Database Structure

### Database Configuration

**File:** `Backend/db/database.py`

```python
# Database connection string
DATABASE_URL = "postgresql://username:password@localhost:5432/flowventory"

# SQLAlchemy engine
engine = create_engine(DATABASE_URL)

# Session maker
SessionLocal = sessionmaker(bind=engine)

# Base class for models
Base = declarative_base()
```

### Database Tables Schema

#### users
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    firstname VARCHAR NOT NULL,
    role VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    assigned_pages JSON
);
CREATE INDEX idx_username ON users(username);
```

#### orders
```sql
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    client_id INTEGER REFERENCES users(id),
    status VARCHAR NOT NULL DEFAULT 'submitted',
    notes TEXT,
    items JSON NOT NULL
);
```

#### shipments
```sql
CREATE TABLE shipments (
    id SERIAL PRIMARY KEY,
    our_name VARCHAR NOT NULL DEFAULT 'Flowventory',
    our_address VARCHAR NOT NULL,
    bill_to VARCHAR,
    ship_to VARCHAR,
    invoice_number VARCHAR UNIQUE NOT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE,
    ship_via VARCHAR,
    order_number VARCHAR,
    qty INTEGER NOT NULL,
    item_type VARCHAR NOT NULL,
    item_desc VARCHAR,
    order_id INTEGER REFERENCES orders(id)
);
CREATE INDEX idx_invoice_number ON shipments(invoice_number);
```

#### inventory_items
```sql
CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    item_id VARCHAR UNIQUE NOT NULL,
    sku VARCHAR,
    description VARCHAR,
    vendor VARCHAR,
    quantity INTEGER DEFAULT 0,
    zone VARCHAR,
    aisle VARCHAR,
    rack VARCHAR,
    shelf VARCHAR,
    bin VARCHAR,
    storage_location VARCHAR,
    category VARCHAR,
    weight VARCHAR,
    dimensions VARCHAR,
    barcode VARCHAR UNIQUE,
    status VARCHAR NOT NULL DEFAULT 'pending_inspection',
    last_shipment_id INTEGER REFERENCES shipments(id)
);
CREATE INDEX idx_item_id ON inventory_items(item_id);
CREATE INDEX idx_sku ON inventory_items(sku);
CREATE INDEX idx_barcode ON inventory_items(barcode);
```

#### packing_slips
```sql
CREATE TABLE packing_slips (
    id SERIAL PRIMARY KEY,
    filename VARCHAR NOT NULL,
    content_type VARCHAR NOT NULL,
    file_url VARCHAR,
    shipment_id INTEGER REFERENCES shipments(id),
    inventory_item_id INTEGER REFERENCES inventory_items(id),
    uploaded_by INTEGER REFERENCES users(id) NOT NULL
);
```

### Database Relationships

```
User (1) ──── (N) Order
User (1) ──── (N) PackingSlip
Order (1) ──── (N) Shipment
Shipment (1) ──── (N) InventoryItem
Shipment (1) ──── (N) PackingSlip
InventoryItem (1) ──── (N) PackingSlip
```

---

## Docker Configuration

### Docker Files

```
Docker/
├── docker-compose.yml                # Multi-container orchestration
└── nginx/
    ├── Dockerfile                    # Nginx reverse proxy image
    └── nginx.conf                    # Nginx configuration
```

### Docker Compose Services

**File:** `Docker/docker-compose.yml`

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: flowventory_db
    ports:
      - "4001:5432"
    environment:
      POSTGRES_USER: flowventory
      POSTGRES_PASSWORD: secure_password
      POSTGRES_DB: flowventory
    volumes:
      - postgres_data:/var/lib/postgresql/data

  backend:
    build: ../Backend
    container_name: flowventory_backend
    ports:
      - "4002:8000"
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://flowventory:secure_password@postgres:5432/flowventory

  frontend:
    build: ../Frontend/flowventory-app
    container_name: flowventory_frontend
    ports:
      - "4003:3000"
    depends_on:
      - backend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:4002

  nginx:
    build: ./nginx
    container_name: flowventory_nginx
    ports:
      - "4000:80"
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
```

### Port Mapping

| Service | Container Port | Host Port | Purpose |
|---------|----------------|-----------|---------|
| PostgreSQL | 5432 | 4001 | Database server |
| Backend (FastAPI) | 8000 | 4002 | API server |
| Frontend (Next.js) | 3000 | 4003 | Web application |
| Nginx | 80 | 4000 | Reverse proxy |

### Nginx Configuration

**File:** `Docker/nginx/nginx.conf`

```nginx
server {
    listen 80;
    server_name localhost;

    # Frontend
    location / {
        proxy_pass http://frontend:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Backend API
    location /api/ {
        proxy_pass http://backend:8000/;
        proxy_set_header Host $host;
    }
}
```

---

## File Descriptions

### Root Level Files

| File | Purpose | Key Contents |
|------|---------|--------------|
| `README.md` | Project overview | Tech stack, setup instructions, team info |
| `GROUP-INFO.md` | Team details | Member skills, expertise, contributions |
| `TODO.md` | Task tracking | Outstanding issues, planned features |
| `Test_Cases_Report.md` | Phase 3 tests | 63 test cases (95.2% pass rate) |
| `DELIVERABLE_4_TEST_CASES.md` | Phase 4 tests | 98 test cases (100% pass rate) |
| `PROJECT_STRUCTURE.md` | This file | Complete folder structure documentation |
| `inspection-code-transformers.md` | Code review | Inspection findings and resolutions |
| `NOTES DELIVERABLE 3.txt` | Phase 3 notes | Rubric checklist, file map |
| `generate_pdf.py` | Utility | Markdown to PDF converter |
| `Transformers - Deliverable 4.docx` | Deliverable | Official submission document |
| `.gitignore` | Git config | Ignore rules (node_modules, .env, etc.) |

### Frontend Key Files

| File | Purpose | Lines of Code |
|------|---------|---------------|
| `src/app/admin/page.jsx` | User management UI | 481 |
| `src/app/dashboard/page.jsx` | Dashboard with metrics | 350 |
| `src/app/inventory/page.jsx` | Inventory CRUD | 450 |
| `src/app/login/page.jsx` | Authentication | 200 |
| `src/app/pick/page.jsx` | Pick operations | 350 |
| `src/contexts/AuthContext.jsx` | Auth state management | 150 |
| `src/components/Navigation.jsx` | Top nav bar | 200 |
| `lib/api.ts` | API service layer | 250 |
| `next.config.js` | Next.js config | 50 |
| `tailwind.config.js` | Tailwind config | 30 |

### Backend Key Files

| File | Purpose | Lines of Code |
|------|---------|---------------|
| `main.py` | FastAPI app entry | 45 |
| `db/database.py` | Database setup | 30 |
| `db/db_models.py` | ORM models | 104 |
| `db/models.py` | Pydantic schemas | 109 |
| `routers/users.py` | User endpoints | 100 |
| `routers/inventory.py` | Inventory endpoints | 120 |
| `routers/shipments.py` | Shipment endpoints | 100 |
| `seed_data.py` | Database seeding | 150 |

---

## Key Configuration Files

### Frontend Configuration

#### package.json
```json
{
  "name": "flowventory-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "15.5.4",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "tailwindcss": "4.0.0",
    "axios": "1.13.1"
  }
}
```

#### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
  }
}
module.exports = nextConfig
```

#### tailwind.config.js
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### Backend Configuration

#### requirements.txt
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
pydantic==2.5.0
python-dotenv==1.0.0
python-multipart==0.0.6
bcrypt==4.1.1
```

#### .env.example
```env
DATABASE_URL=postgresql://user:password@localhost:5432/flowventory
SECRET_KEY=your_secret_key_here
DEBUG=True
CORS_ORIGINS=http://localhost:3000
```

---

## Code Organization Standards

### Naming Conventions

#### Frontend (JavaScript/React)
- **Files:** PascalCase for components (`Navigation.jsx`), camelCase for utilities (`api.ts`)
- **Components:** PascalCase (`<Navigation />`)
- **Functions:** camelCase (`handleLogin`)
- **Constants:** UPPER_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes:** kebab-case or Tailwind utility classes

#### Backend (Python)
- **Files:** snake_case (`db_models.py`, `inventory.py`)
- **Classes:** PascalCase (`InventoryItem`, `UserOut`)
- **Functions:** snake_case (`create_user`, `list_inventory`)
- **Constants:** UPPER_SNAKE_CASE (`DATABASE_URL`)
- **Private:** Leading underscore (`_internal_function`)

### Directory Structure Standards

#### Frontend Pages
```
src/app/
├── [feature]/
│   └── page.jsx              # Route component
```

#### Backend Routers
```
routers/
├── [entity].py               # Entity-specific endpoints
```

#### Database Models
```
db/
├── db_models.py              # SQLAlchemy ORM models
├── models.py                 # Pydantic schemas
```

### Import Organization

#### Frontend
```javascript
// 1. React imports
import { useState, useEffect } from 'react';

// 2. Next.js imports
import { useRouter } from 'next/navigation';

// 3. Third-party imports
import axios from 'axios';

// 4. Local imports
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
```

#### Backend
```python
# 1. Standard library
from typing import List, Optional

# 2. Third-party
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

# 3. Local imports
from db.models import UserIn, UserOut
from db.database import get_db
```

### Code Comments

#### Header Comments
```python
"""
Module: inventory.py
Purpose: Inventory management API endpoints
Author: TRANSFORMERS Team
Last Updated: 2025-11-16
"""
```

#### Function Docstrings
```python
def create_inventory_item(item: InventoryItemIn, db: Session):
    """
    Create a new inventory item.

    Args:
        item: Pydantic schema with item details
        db: Database session

    Returns:
        InventoryItemOut: Created item with ID

    Raises:
        HTTPException: If item_id already exists
    """
```

---

## Statistics Summary

### Project Metrics

| Metric | Count |
|--------|-------|
| **Total Directories** | 50+ |
| **Total Files** | 500+ |
| **Source Code Files** | 50 |
| **Documentation Files** | 20+ |
| **Configuration Files** | 15 |
| **UML Diagrams** | 10 |
| **Test Cases** | 98 |
| **API Endpoints** | 25+ |
| **Database Tables** | 5 |
| **React Components** | 12 |
| **FastAPI Routers** | 5 |

### Lines of Code

| Component | Estimated LOC |
|-----------|---------------|
| Frontend (JSX/JS/TS) | ~3,500 |
| Backend (Python) | ~1,500 |
| Configuration | ~500 |
| Documentation (MD) | ~5,000 |
| **Total** | **~10,500** |

### Technology Versions

| Technology | Version |
|------------|---------|
| Node.js | 18+ |
| Next.js | 15.5.4 |
| React | 19.1.0 |
| Python | 3.10+ |
| FastAPI | 0.104+ |
| PostgreSQL | 15 |
| Docker | 24+ |
| Docker Compose | 2.0+ |

---

## Git Repository Structure

### Branches
- `main` - Production-ready code
- Development branches as needed

### Commit History
- **Total Commits:** 20+
- **Contributors:** 5

### Recent Commits
```
dad0968 - commit final from preet
e194c3f - commit
1134ed6 - Adding User Changes
9403d2e - Updated Shipments' Model
c1140d8 - Merge pull request #3 from preetraval45/Edits
```

---

## Access Control Matrix

| Role | Dashboard | Inventory | Stock | Pick | Shipments | Admin |
|------|-----------|-----------|-------|------|-----------|-------|
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Engineer** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Manager** | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Client** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |

---

## Future Structure Additions

### Planned Directories (Phase 3+)

```
TRANSFORMERS-FLOWVENTORY/
├── tests/                            # Automated test suites
│   ├── frontend/
│   │   ├── unit/
│   │   ├── integration/
│   │   └── e2e/
│   └── backend/
│       ├── unit/
│       └── integration/
├── scripts/                          # Utility scripts
│   ├── backup_db.sh
│   ├── deploy.sh
│   └── seed_prod.py
├── logs/                             # Application logs
│   ├── app.log
│   └── error.log
└── uploads/                          # User-uploaded files
    └── packing_slips/
```

---

**End of Project Structure Documentation**

For questions or clarifications, contact the TRANSFORMERS team.
