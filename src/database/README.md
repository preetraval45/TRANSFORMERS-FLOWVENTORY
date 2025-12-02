# Database Documentation

## Overview

The Flowventory database uses **PostgreSQL** with **SQLAlchemy ORM** for data modeling and management.

## Database Location

**Actual database code is located in:** `src/backend/db/`

This folder (`src/database/`) serves as a documentation and reference location for database-related information.

## Database Structure

### Tables

1. **users** - User accounts and authentication
2. **orders** - Order records
3. **shipments** - Shipment tracking information
4. **inventory_items** - Inventory item details
5. **packing_slips** - Packing slip file metadata

## Connection Information

### Development (Docker)
```
Host: localhost
Port: 4001
Database: flowventory
Username: postgres
Password: postgres
```

### Connection String
```
postgresql://postgres:postgres@localhost:4001/flowventory
```

## Database Files

All database-related code is in `src/backend/db/`:

- **database.py** - SQLAlchemy engine and session configuration
- **db_models.py** - ORM models (Table definitions)
- **models.py** - Pydantic schemas (Validation models)
- **dependency.py** - Database session dependency injection
- **migrate_warehouse_fields.py** - Migration scripts

## Schema Diagrams

For detailed schema diagrams, see:
- `Documentation/uml/flowventory_updated_class_diagram.puml`

## Migrations

Database migrations are handled through:
- Manual migration scripts in `src/backend/db/migrate_*.py`

## Seeding Data

To populate the database with test data:

```bash
cd src/backend
python seed_data.py
```

## Database Setup

### Using Docker
```bash
cd Docker
docker-compose up -d db
```

### Manual Setup
```bash
createdb flowventory
psql -U postgres -d flowventory
```

## Entity Relationships

```
User (1) ──── (N) Order
User (1) ──── (N) PackingSlip
Order (1) ──── (N) Shipment
Shipment (1) ──── (N) InventoryItem
Shipment (1) ──── (N) PackingSlip
InventoryItem (1) ──── (N) PackingSlip
```

## Indexes

- `users.username` (UNIQUE)
- `inventory_items.item_id` (UNIQUE)
- `inventory_items.sku`
- `inventory_items.barcode` (UNIQUE)
- `shipments.invoice_number` (UNIQUE)

## Backup and Restore

### Backup
```bash
pg_dump -U postgres flowventory > flowventory_backup.sql
```

### Restore
```bash
psql -U postgres flowventory < flowventory_backup.sql
```

## Notes

- All database models use SQLAlchemy ORM
- Passwords are hashed using bcrypt
- All timestamps use UTC
- Foreign keys enforce referential integrity
