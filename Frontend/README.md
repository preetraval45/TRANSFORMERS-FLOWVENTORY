# Flowventory Frontend

A modern inventory management system built with Next.js, featuring role-based authentication and responsive design.

## 🚀 Features

- **Role-based Authentication**: Support for Admin, Engineer, and Manager roles
- **Responsive Design**: Clean, modern UI with Tailwind CSS
- **Inventory Management**: Track shipments, vendors, and inventory items
- **User Management**: Admin panel for managing users (admin-only access)
- **File Upload**: Drag & drop functionality for packing slips
- **Real-time Updates**: Live inventory tracking and status updates
- **Docker Ready**: Containerized deployment with Nginx

## 📁 Project Structure

```
Frontend/
├── flowventory-app/           # Main Next.js application
│   ├── src/
│   │   ├── app/              # App router pages
│   │   │   ├── login/        # Login page
│   │   │   ├── dashboard/    # Dashboard page
│   │   │   ├── inventory/    # Inventory management
│   │   │   ├── shipments/    # Shipment tracking
│   │   │   ├── uploads/      # File upload (redirects to shipments)
│   │   │   └── admin/        # User management (admin only)
│   │   ├── components/       # Reusable React components
│   │   │   ├── Layout.jsx    # Main layout wrapper
│   │   │   └── Navigation.jsx # Navigation bar
│   │   ├── contexts/         # React contexts
│   │   │   └── AuthContext.jsx # Authentication context
│   │   ├── data/             # Mock data and user information
│   │   │   └── users.js      # User accounts and inventory data
│   │   └── utils/            # Utility functions
│   ├── public/               # Static assets
│   ├── Dockerfile            # Docker container configuration
│   ├── docker-compose.yml    # Docker Compose setup
│   ├── nginx.conf            # Nginx configuration
│   └── package.json          # Dependencies and scripts
└── UI/                       # Design mockups and wireframes
    ├── Dashboard.png
    ├── Inventory 1.png
    ├── Inventory 2.png
    ├── Shipping.png
    └── Usermanagement.png
```

## 🔐 User Accounts

The system comes with pre-configured test accounts:

### Admin Users
- **Username**: `Preet` | **Password**: `P@ss123!`
- **Username**: `Carlotta` | **Password**: `C@rl456@`
- **Username**: `Yana` | **Password**: `Y@na789#`

### Engineer Users
- **Username**: `Dany` | **Password**: `D@ny012$`
- **Username**: `Yana` | **Password**: `Y@na789#`

### Manager Users
- **Username**: `Jack` | **Password**: `J@ck345%`
- **Username**: `Sarah` | **Password**: `S@rah567&`

## 🛠 Tech Stack

- **Frontend Framework**: Next.js 15.5.4
- **Styling**: Tailwind CSS
- **Authentication**: Custom context-based auth
- **Containerization**: Docker + Docker Compose
- **Web Server**: Nginx (for production)
- **Language**: JavaScript (JSX)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Docker and Docker Compose (for containerized deployment)

### Development Setup

1. **Navigate to the project directory**:
   ```bash
   cd Frontend/flowventory-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and visit `http://localhost:3000`

### Production Build

1. **Build the application**:
   ```bash
   npm run build
   ```

2. **Start the production server**:
   ```bash
   npm start
   ```

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. **Build and start the containers**:
   ```bash
   docker-compose up -d
   ```

2. **Access the application**:
   - HTTP: `http://localhost`

### Using Docker Only

1. **Build the Docker image**:
   ```bash
   docker build -t flowventory-app .
   ```

2. **Run the container**:
   ```bash
   docker run -p 3000:3000 flowventory-app
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NODE_ENV=development
NEXT_PUBLIC_APP_NAME=Flowventory
```

### Nginx Configuration

The included `nginx.conf` provides:
- HTTPS redirect
- Security headers
- Gzip compression
- Static file caching
- SSL configuration (requires certificates)

## 🎨 Design System

The application uses a consistent color scheme:
- **Primary Blue**: `#2563eb` (blue-600)
- **Success Green**: `#16a34a` (green-600)
- **Warning Red**: `#dc2626` (red-600)
- **Background White**: `#ffffff`
- **Text Gray**: `#374151` (gray-700)

## 📱 Pages Overview

### Login Page (`/login`)
- User authentication
- Password reset functionality
- Role-based redirects

### Dashboard (`/dashboard`)
- Key metrics and statistics
- Recent activity feed
- Quick actions panel
- File upload form

### Inventory (`/inventory`)
- Searchable inventory table
- Status filtering
- Item details modal
- Export functionality

### Shipments (`/shipments`)
- Drag & drop file upload
- Shipment tracking
- Upload history

### Admin Panel (`/admin`)
- User management (admin only)
- Audit logs
- System settings
- Add new users with auto-generated passwords

## 🔐 Security Features

- Role-based access control
- Secure password generation
- Input validation
- XSS protection headers
- HTTPS enforcement (production)
- Session management

## 📄 License

This project is part of the Transformers team deliverable for UNC Charlotte.

## 👥 Contributors

- Preet (Admin)
- Carlotta (Admin)
- Yana (Admin)
- Dany (Engineer)
- Jack (Manager)

For technical support or feature requests, please contact the development team.