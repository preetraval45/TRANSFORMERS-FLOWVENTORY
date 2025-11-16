# Setup Shared PostgreSQL Database - Step by Step

## Goal
Make it so everyone who runs Docker sees the **SAME data** - no more confusion!

## Your Current Situation
- ✅ Database backup created: `flowventory_backup.sql`
- ✅ All your data is saved
- 📝 Need to set up a server PostgreSQL database

---

## EASIEST OPTION: Use Free Cloud Database (Recommended!)

### Using ElephantSQL (Free - 5 minutes setup)

1. **Sign up for free account:**
   - Go to: https://www.elephantsql.com/
   - Click "Get a managed database today"
   - Sign up with GitHub or email

2. **Create a free database:**
   - Click "Create New Instance"
   - Name: `flowventory`
   - Plan: Select "Tiny Turtle" (FREE)
   - Region: Choose closest to your team
   - Click "Create instance"

3. **Get connection details:**
   - Click on your instance name
   - Copy the **URL** (looks like: `postgres://username:password@server.db.elephantsql.com/dbname`)
   - Example: `postgres://abcdefgh:Xy9z...@raja.db.elephantsql.com/abcdefgh`

4. **Import your data:**
   ```bash
   # On Windows (use Git Bash or WSL):
   psql "YOUR_ELEPHANTSQL_URL" < flowventory_backup.sql

   # If you don't have psql, use their web interface:
   # Go to ElephantSQL dashboard → Browser → SQL Query
   # Copy paste contents of flowventory_backup.sql
   ```

5. **Update your Docker configuration:**

   Edit `Docker/docker-compose.yml`:

   **Line 2-23: Comment out the db service:**
   ```yaml
   # db:
   #   image: postgres:15-alpine
   #   container_name: flowventory-db
   #   ...entire db service...
   ```

   **Line 34: Replace DATABASE_URL:**
   ```yaml
   environment:
     DATABASE_URL: YOUR_ELEPHANTSQL_URL_HERE
   ```

   **Line 37-40: Comment out depends_on:**
   ```yaml
   # depends_on:
   #   db:
   #     condition: service_healthy
   ```

6. **Restart containers:**
   ```bash
   cd Docker
   docker-compose down
   docker-compose up -d
   ```

7. **✅ DONE! Everyone uses the same database now!**

---

## ALTERNATIVE: Use Your Own Server

### If you have a server/computer that's always on:

#### Step 1: Install PostgreSQL on Server

**On Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib

# Allow remote connections
sudo nano /etc/postgresql/15/main/postgresql.conf
# Change: listen_addresses = '*'

sudo nano /etc/postgresql/15/main/pg_hba.conf
# Add line: host all all 0.0.0.0/0 md5

sudo systemctl restart postgresql
```

**On Windows Server:**
- Download PostgreSQL from: https://www.postgresql.org/download/windows/
- During installation, set password for postgres user
- Enable "Allow remote connections" in pg_hba.conf

#### Step 2: Create Database and User

```bash
sudo -u postgres psql

CREATE DATABASE flowventory;
CREATE USER flowventory_user WITH PASSWORD 'YourSecurePassword123!';
GRANT ALL PRIVILEGES ON DATABASE flowventory TO flowventory_user;
ALTER DATABASE flowventory OWNER TO flowventory_user;
\q
```

#### Step 3: Open Firewall Port

```bash
# Ubuntu
sudo ufw allow 5432/tcp

# Or configure your router/cloud security group to allow port 5432
```

#### Step 4: Import Your Data

```bash
# Get your server IP (e.g., 192.168.1.100 or public IP)
psql "postgresql://flowventory_user:YourSecurePassword123!@YOUR_SERVER_IP:5432/flowventory" < flowventory_backup.sql
```

#### Step 5: Update Docker Configuration

Edit `Docker/docker-compose.yml`:

**Comment out db service (lines 2-23):**
```yaml
# db:
#   image: postgres:15-alpine
#   ...
```

**Update backend DATABASE_URL (line 34):**
```yaml
environment:
  DATABASE_URL: postgresql://flowventory_user:YourSecurePassword123!@YOUR_SERVER_IP:5432/flowventory
```

**Comment out depends_on (lines 37-40):**
```yaml
# depends_on:
#   db:
#     condition: service_healthy
```

#### Step 6: Restart

```bash
cd Docker
docker-compose down
docker-compose up -d
```

---

## Verify Everything Works

1. **Start application:**
   ```bash
   cd Docker
   docker-compose up
   ```

2. **Open in browser:**
   - http://localhost:4000

3. **Check your data is there:**
   - Login with your existing credentials
   - All your inventory items should be visible

4. **Test with team members:**
   - Have someone else run `docker-compose up`
   - They should see the SAME data as you!

---

## Important Notes

### Security
- 🔒 Use strong passwords
- 🌐 If using your own server, restrict IP access (don't use 0.0.0.0/0 in production)
- 🔐 Consider using SSL/TLS for PostgreSQL connections

### For Team Members
Once you set this up, share these instructions with your team:

1. Pull latest code: `git pull`
2. Run: `cd Docker && docker-compose up`
3. Access: http://localhost:4000
4. Everyone sees the same data!

### Backup Your Database Regularly

```bash
# Backup command (run weekly):
pg_dump "YOUR_DATABASE_URL" > backup_$(date +%Y%m%d).sql
```

---

## Troubleshooting

### "Connection refused"
- Check firewall allows port 5432
- Check PostgreSQL is running: `sudo systemctl status postgresql`
- Verify server IP address is correct

### "Password authentication failed"
- Double-check username and password
- Make sure user has permissions on database

### "Cannot connect from Docker"
- Make sure you commented out the local `db` service
- Check DATABASE_URL is correct
- Verify network connectivity to server

---

## Need Help?

Contact your team or check:
- ElephantSQL Support: https://www.elephantsql.com/support.html
- PostgreSQL Documentation: https://www.postgresql.org/docs/
- Project documentation: See DATABASE_SETUP.md for more details
