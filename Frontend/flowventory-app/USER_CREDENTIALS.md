# Flowventory User Credentials

## Login Access

Use these credentials to test the Flowventory application:

### Admin Users (Full Access)
- **Username**: `Preet`
  **Password**: `P@ss123!`
  **Role**: Admin
  **Access**: All pages including User Management

- **Username**: `Carlotta`
  **Password**: `C@rl456@`
  **Role**: Admin
  **Access**: All pages including User Management

### Engineer Users (Technical Access)
- **Username**: `Yana`
  **Password**: `Y@na789#`
  **Role**: Engineer
  **Access**: Dashboard, Stock, Pick, Shipments, Inventory

- **Username**: `Dany`
  **Password**: `D@ny012$`
  **Role**: Engineer
  **Access**: Dashboard, Stock, Pick, Shipments, Inventory

- **Username**: `Mike`
  **Password**: `M!ke890*`
  **Role**: Engineer
  **Access**: Dashboard, Stock, Pick, Shipments, Inventory

- **Username**: `Emily`
  **Password**: `Em!ly234#`
  **Role**: Engineer
  **Access**: Dashboard, Stock, Pick, Shipments, Inventory

### Manager Users (Management Access)
- **Username**: `Jack`
  **Password**: `J@ck345%`
  **Role**: Manager
  **Access**: Dashboard, Stock, Pick, Shipments, Inventory

- **Username**: `Sarah`
  **Password**: `S@rah567&`
  **Role**: Manager
  **Access**: Dashboard, Stock, Pick, Shipments, Inventory

- **Username**: `Alex`
  **Password**: `Al3x567$`
  **Role**: Manager
  **Access**: Dashboard, Stock, Pick, Shipments, Inventory

## Navigation Guide

1. **Login Page**: Enter username and password to access the system
2. **Dashboard**: Overview with statistics, recent activity, and quick actions
3. **Stock**: Add new items to inventory with warehouse location tracking
4. **Pick**: Search and pick items from inventory for orders
5. **Shipments**: Create and manage packing slips with CRUD operations
6. **Inventory**: View all inventory items with search and filter capabilities
7. **User Management**: Manage users, roles, and permissions (Admin only)

## Features by Role

### Admin
- ✅ Full access to all pages
- ✅ User Management (Create, Read, Update, Delete users)
- ✅ Assign pages to users
- ✅ Change user roles
- ✅ Manage inventory, shipments, and orders

### Engineer
- ✅ Dashboard access
- ✅ Add/edit inventory items
- ✅ Pick items from inventory
- ✅ Create/manage packing slips
- ✅ View all inventory
- ❌ No User Management access

### Manager
- ✅ Dashboard access
- ✅ View and manage inventory
- ✅ Create/manage packing slips
- ✅ Pick items from inventory
- ✅ Add new stock items
- ❌ No User Management access

## Database Information

- **Total Users**: 9
- **Total Inventory Items**: 100 (with fake data)
- **Total Packing Slips**: 3
- **Warehouse Zones**: A, B, C, D, E
- **Item Categories**: Network Equipment, Servers, Storage, Semiconductors, PCB Components, Passive Components, Cables, Infrastructure

## Access the Application

- **Main URL**: http://localhost:4000
- **Backend API**: http://localhost:4002
- **Frontend Dev**: http://localhost:4003
- **Database**: PostgreSQL on port 4001

## Color Scheme

- **Primary**: Blue (#2563eb) & Purple (#7c3aed)
- **Success**: Green (#16a34a)
- **Warning**: Red (#dc2626)
- **Background**: White (#ffffff)

## Start the Application

```bash
cd Docker
docker-compose up -d
```

Then visit: `http://localhost:4000`

## Seeding the Database

To reset and reseed the database with fake data:

```bash
docker exec flowventory-backend python seed_data.py
```
