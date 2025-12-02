# TRANSFORMERS

**Project:** ITIS 3300 - Software Requirement, Analysis and Testing

## 📋 Project Overview

Inventory & Shipment Management Portal - A shared platform for vendors and engineering teams to track incoming shipments, packing slips, and inventory status in real time.

## 👥 Team Members

- **Jack Helmer** - Programming (SQL, Java, Python), Scripting, Backend, Documentation
- **Dany Babikerali** - Programming (Python, Java, SQL, TS/JS), Frontend, Backend, Database Implementation
- **Preet Raval** - Full-Stack Development, AI/ML, Cybersecurity, Cloud Architecture, DevOps
- **Carlota Najera Alvarez** - UI/UX Design, Technical Documentation, Java, JavaScript, SQL, HTML
- **Yana Batsuk** - Full-Stack Development, System Administration, Database Management

## 🏗️ Project Structure

TRANSFORMERS/
├── src/               # Source code directory (all code organized here)
│   ├── backend/       # Python & FastAPI backend services
│   │   ├── db/        # Database models and classes
│   │   └── routers/   # API routers
│   ├── frontend/      # Next.js frontend application
│   │   ├── src/       # Source code
│   │   │   ├── app/   # App router pages
│   │   │   ├── components/  # React components
│   │   │   ├── contexts/    # React contexts
│   │   │   └── data/        # Mock data and configurations
│   │   ├── public/    # Static assets
│   │   └── Dockerfile # Docker configuration
│   ├── database/      # Database schemas and configurations
│   └── scripts/       # Utility scripts
├── Docker/            # Docker orchestration files
├── Documentation/     # Project documentation and meeting minutes
│   └── Minutes/       # Meeting notes and project planning
├── GROUP-INFO.md      # Detailed team member information
└── README.md          # Project overview and documentation

## 🎯 Core Deliverables

### Security & Access

- Password-protected links for external vendors
- Audit logs for every upload, edit, and access event
- Role-based access (admin, engineer, manager)

### Client Side Features

- **Order Submission Portal**: Upload order details, packing slips, and expected delivery dates
- Auto-generate tracking links with secure password access

### Engineering Team Features

- **Pack Slip Repository**: Centralized access to all packing slips with search and tagging
- **Incoming Inventory Tracker**: Track what's arriving, when, and from whom
- Filter by project, vendor, or urgency

## 🚀 Stretch Goals

- Shipment Status Dashboard with delivery progress tracking
- Low-Stock & Reorder Alerts system
- Barcode Scanning & Tagging functionality
- Real-time notifications and alerts

## 🛠️ Technology Stack

- **Frontend**: Next.js 15.5.4, React 19, Tailwind CSS, JavaScript (JSX)
- **Backend**: Python & FastAPI (planned)
- **Database**: PostgreSQL (planned)
- **Containerization**: Docker & Docker Compose
- **Web Server**: Nginx (production proxy)
- **Authentication**: Context-based with role management
- **CDN/Security**: Cloudflare (planned)

## 🚀 Quick Start

### Frontend Application

1. Navigate to the frontend directory:
   ```bash
   cd src/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser

### Using Docker

```bash
cd Docker
docker-compose up -d
```

Access the application at `http://localhost:4000`

### Test Accounts

- **Admin**: `Preet` / `P@ss123!`
- **Engineer**: `Dany` / `D@ny012$`
- **Manager**: `Jack` / `J@ck345%`

## 📄 Documentation

- **Frontend Documentation**: See `src/frontend/README.md` for detailed setup and usage
- **Meeting Minutes**: Available in `Documentation/Minutes/`
- **Team Information**: Detailed skills and expertise in `GROUP-INFO.md`
- **Project Structure**: Comprehensive structure guide in `PROJECT_STRUCTURE.md`
- **Test Cases**: Complete test suite documentation in `DELIVERABLE_4_TEST_CASES.md`
