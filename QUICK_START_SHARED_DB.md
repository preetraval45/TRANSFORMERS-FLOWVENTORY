# Quick Start: Setting Up Shared Database

## Problem
Currently, when team members run the application in Docker, each person has their own local database. Data added by one person is not visible to others.

## Solution
Configure the application to use a shared database server that everyone can access.

## Quick Setup (3 Steps)

### Step 1: Set Up PostgreSQL on a Server

On your server (Ubuntu/Debian):
```bash
# Install PostgreSQL
sudo apt update && sudo apt install postgresql postgresql-contrib

# Configure for remote access
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/" /etc/postgresql/15/main/postgresql.conf

# Allow remote connections
echo "host    flowventory     flowventory_user    0.0.0.0/0    md5" | sudo tee -a /etc/postgresql/15/main/pg_hba.conf

# Restart PostgreSQL
sudo systemctl restart postgresql

# Create database and user
sudo -u postgres psql << EOF
CREATE DATABASE flowventory;
CREATE USER flowventory_user WITH PASSWORD 'ChangeThisPassword123!';
GRANT ALL PRIVILEGES ON DATABASE flowventory TO flowventory_user;
ALTER DATABASE flowventory OWNER TO flowventory_user;
\q
EOF
```

### Step 2: Update Your Configuration

Edit `Docker/docker-compose.yml`:

**Comment out the db service (lines 2-23):**
```yaml
#   db:
#     image: postgres:15-alpine
#     ... (comment out entire db service)
```

**Update backend service environment:**
```yaml
  backend:
    environment:
      DATABASE_URL: postgresql://flowventory_user:ChangeThisPassword123!@YOUR_SERVER_IP:5432/flowventory
    # Comment out depends_on:
    # depends_on:
    #   db:
    #     condition: service_healthy
```

### Step 3: Run the Application

```bash
cd Docker
docker-compose down
docker-compose up --build
```

## Verify It Works

1. Open http://localhost:4000 in your browser
2. Login with existing credentials
3. Add an inventory item
4. Have another team member refresh their browser - they should see your item!

## Important Notes

- **Port 4000**: The application runs on port 4000 (not 3000)
- **Test Cases**: Updated to use port 4000 instead of 3000
- **Firewall**: Make sure your server allows connections on port 5432
- **Security**: Change the default password to something secure!
- **Cloud Alternative**: You can use AWS RDS, Google Cloud SQL, or other cloud databases instead

## Need Help?

See [DATABASE_SETUP.md](DATABASE_SETUP.md) for detailed instructions and troubleshooting.

## Alternative: Use Cloud Database (No Server Needed)

**ElephantSQL (Free Tier):**
1. Sign up at https://www.elephantsql.com/
2. Create a free "Tiny Turtle" instance
3. Copy the connection URL
4. Update DATABASE_URL in docker-compose.yml
5. Done! Everyone can use the same cloud database

**Example:**
```yaml
DATABASE_URL: postgres://username:password@babar.db.elephantsql.com/username
```
