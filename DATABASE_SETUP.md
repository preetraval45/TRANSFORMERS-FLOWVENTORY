# Database Setup Guide - Flowventory

## Overview
This guide explains how to set up a shared database for the Flowventory application so that all team members can access the same data when running the application in Docker.

## Current Setup (Local Database)
By default, the application uses a PostgreSQL database running inside Docker. Each person who runs Docker has their own isolated database, which means data is not shared between team members.

**Configuration:**
- Database runs in Docker container
- Port: 4001 (external) → 5432 (internal)
- Database URL: `postgresql://postgres:postgres@db:5432/flowventory`
- Data stored in Docker volume: `postgres_data`

## Option 1: Server-Based Shared Database (Recommended for Team)

### Prerequisites
1. A server/VM with PostgreSQL installed
2. Network access from all team members to the server
3. Firewall rules allowing PostgreSQL connections (port 5432)

### Step 1: Set Up PostgreSQL Server

#### On Ubuntu/Debian Server:
```bash
# Install PostgreSQL
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL service
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Configure PostgreSQL for Remote Connections:
```bash
# Edit PostgreSQL configuration
sudo nano /etc/postgresql/15/main/postgresql.conf

# Find and modify:
listen_addresses = '*'  # Allow connections from any IP

# Edit pg_hba.conf for authentication
sudo nano /etc/postgresql/15/main/pg_hba.conf

# Add this line (replace 0.0.0.0/0 with your team's IP range for better security):
host    flowventory     flowventory_user    0.0.0.0/0    md5

# Restart PostgreSQL
sudo systemctl restart postgresql
```

### Step 2: Create Database and User
```bash
# Login to PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE flowventory;

# Create user with password
CREATE USER flowventory_user WITH PASSWORD 'your_secure_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE flowventory TO flowventory_user;

# Exit
\q
```

### Step 3: Configure Flowventory Application

#### Update Backend/.env file:
```env
# Comment out local database
# DATABASE_URL=postgresql://postgres:postgres@db:5432/flowventory

# Add server database (replace with your actual values)
DATABASE_URL=postgresql://flowventory_user:your_secure_password@YOUR_SERVER_IP:5432/flowventory
```

#### Update Docker/docker-compose.yml:

**Comment out the local db service:**
```yaml
# Comment out the entire db service (lines 2-23)
# services:
#   db:
#     image: postgres:15-alpine
#     ...
```

**Update backend service:**
```yaml
  backend:
    build:
      context: ../Backend
      dockerfile: Dockerfile
    container_name: flowventory-backend
    ports:
      - "4002:8000"
    environment:
      # Use server database
      DATABASE_URL: postgresql://flowventory_user:your_secure_password@YOUR_SERVER_IP:5432/flowventory
    # Comment out depends_on for db service
    # depends_on:
    #   db:
    #     condition: service_healthy
    networks:
      - flowventory-network
    volumes:
      - ../Backend:/app
```

### Step 4: Test Connection
```bash
# From your local machine, test connection to server database
psql "postgresql://flowventory_user:your_secure_password@YOUR_SERVER_IP:5432/flowventory"

# If successful, you should see:
# flowventory=>
```

### Step 5: Run Application
```bash
cd Docker
docker-compose down  # Stop any running containers
docker-compose up --build  # Rebuild and start with new configuration
```

## Option 2: Cloud-Hosted Database (Alternative)

You can also use cloud database services:

### AWS RDS PostgreSQL
1. Create RDS PostgreSQL instance in AWS
2. Configure security groups to allow access
3. Get connection string from AWS console
4. Update DATABASE_URL in .env file

### Example DATABASE_URL:
```
DATABASE_URL=postgresql://admin:password@your-db.abc123.us-east-1.rds.amazonaws.com:5432/flowventory
```

### Other Options:
- **Google Cloud SQL**
- **Azure Database for PostgreSQL**
- **ElephantSQL** (free tier available)
- **Heroku Postgres** (free tier available)

## Verifying Setup

### Check Application Access:
1. Start Docker containers: `docker-compose up`
2. Access application at: `http://localhost:4000`
3. Access backend API docs at: `http://localhost:4002/docs`

### Check Database Connection:
```bash
# View backend logs
docker logs flowventory-backend

# Should see successful database connection messages
# No errors about "connection refused" or "could not connect"
```

### Verify Shared Data:
1. Person A adds an inventory item
2. Person B refreshes their application
3. Person B should see the item added by Person A

## Troubleshooting

### Cannot Connect to Server Database
**Problem:** `connection refused` or `timeout` errors

**Solutions:**
- Check firewall rules on server
- Verify PostgreSQL is listening on correct port: `sudo netstat -plnt | grep 5432`
- Check server IP address is correct
- Ensure DATABASE_URL has correct credentials

### Permission Denied
**Problem:** `permission denied for database flowventory`

**Solution:**
```sql
-- Login to server PostgreSQL
sudo -u postgres psql

-- Grant privileges again
GRANT ALL PRIVILEGES ON DATABASE flowventory TO flowventory_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO flowventory_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO flowventory_user;
```

### Port Already in Use
**Problem:** Port 4001 or 4002 already in use

**Solution:**
```bash
# Find process using port
sudo lsof -i :4001
# or on Windows:
netstat -ano | findstr :4001

# Kill the process or change port in docker-compose.yml
```

## Security Best Practices

1. **Use Strong Passwords:** Don't use default passwords in production
2. **Restrict IP Access:** Use specific IP ranges instead of 0.0.0.0/0
3. **Use SSL/TLS:** Enable SSL for PostgreSQL connections
4. **Environment Variables:** Never commit .env files with real credentials
5. **Regular Backups:** Set up automated database backups

## Database Migration (First Time Setup)

When setting up the server database for the first time, run migrations:

```bash
# Connect to backend container
docker exec -it flowventory-backend bash

# Run database migrations (if you have alembic)
alembic upgrade head

# Or run seed data script
python seed_data.py
```

## Accessing the Application

- **Frontend:** http://localhost:4000
- **Backend API:** http://localhost:4002
- **API Documentation:** http://localhost:4002/docs
- **Database Port:** 4001 (if using local) or server:5432 (if using server)

## Port Reference

| Service | Internal Port | External Port | URL |
|---------|--------------|---------------|-----|
| Nginx | 80 | 4000 | http://localhost:4000 |
| Database | 5432 | 4001 | postgresql://localhost:4001 |
| Backend | 8000 | 4002 | http://localhost:4002 |
| Frontend | 3000 | 4003 | http://localhost:4003 |

## Support

For issues or questions, contact the team or refer to:
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Docker Documentation: https://docs.docker.com/
- FastAPI Documentation: https://fastapi.tiangolo.com/
