from db.database import SessionLocal, engine, Base
from db import db_models
from datetime import datetime, timedelta
import random

def seed_database():
    """Seed the database with fake data"""

    # Create tables
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()

    try:
        # Clear existing data
        db.query(db_models.PackingSlip).delete()
        db.query(db_models.InventoryItem).delete()
        db.query(db_models.Shipment).delete()
        db.query(db_models.Order).delete()
        db.query(db_models.User).delete()
        db.commit()

        print("Creating users...")
        # Create users
        users_data = [
            {"username": "Preet", "firstname": "Preet", "role": "admin", "password": "P@ss123!"},
            {"username": "Carlotta", "firstname": "Carlotta", "role": "admin", "password": "C@rl456@"},
            {"username": "Yana", "firstname": "Yana", "role": "engineer", "password": "Y@na789#"},
            {"username": "Dany", "firstname": "Dany", "role": "engineer", "password": "D@ny012$"},
            {"username": "Jack", "firstname": "Jack", "role": "manager", "password": "J@ck345%"},
            {"username": "Sarah", "firstname": "Sarah Johnson", "role": "manager", "password": "S@rah567&"},
            {"username": "Mike", "firstname": "Mike Chen", "role": "engineer", "password": "M!ke890*"},
            {"username": "Emily", "firstname": "Emily Davis", "role": "engineer", "password": "Em!ly234#"},
            {"username": "Alex", "firstname": "Alex Martinez", "role": "manager", "password": "Al3x567$"},
        ]

        users = []
        for user_data in users_data:
            user = db_models.User(**user_data)
            db.add(user)
            users.append(user)

        db.commit()
        for user in users:
            db.refresh(user)

        print(f"Created {len(users)} users")

        # Create orders
        print("Creating orders...")
        orders_data = [
            {
                "client_id": users[4].id,  # Jack
                "status": "submitted",
                "notes": "Urgent order for network equipment",
                "items": [
                    {"item_id": "SWITCH-001", "description": "Cisco Catalyst 9300", "vendor": "Cisco", "quantity": 5},
                    {"item_id": "ROUTER-001", "description": "Cisco ISR 4331", "vendor": "Cisco", "quantity": 2},
                ]
            },
            {
                "client_id": users[5].id,  # Sarah
                "status": "in_progress",
                "notes": "Server room upgrade equipment",
                "items": [
                    {"item_id": "SERVER-001", "description": "Dell PowerEdge R740", "vendor": "Dell", "quantity": 3},
                    {"item_id": "RACK-001", "description": "42U Server Rack", "vendor": "StarTech", "quantity": 2},
                ]
            },
            {
                "client_id": users[6].id,  # Mike
                "status": "closed",
                "notes": "Completed office setup",
                "items": [
                    {"item_id": "AP-001", "description": "Cisco Meraki MR46", "vendor": "Cisco", "quantity": 10},
                    {"item_id": "CABLE-001", "description": "Cat6 Ethernet Cable 1000ft", "vendor": "Monoprice", "quantity": 5},
                ]
            },
        ]

        orders = []
        for order_data in orders_data:
            order = db_models.Order(**order_data)
            db.add(order)
            orders.append(order)

        db.commit()
        for order in orders:
            db.refresh(order)

        print(f"Created {len(orders)} orders")

        # Create shipments (packing slips)
        print("Creating shipments...")
        today = datetime.now().date()
        shipments_data = [
            {
                "our_name": "Flowventory",
                "our_address": "University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223",
                "bill_to": "Cisco Systems Inc\n123 Tech Drive\nSan Jose, CA 95134",
                "ship_to": "UNCC Main Campus\n9201 University City Blvd\nCharlotte, NC 28223",
                "invoice_number": "INV-2024-001",
                "invoice_date": today,
                "due_date": today + timedelta(days=30),
                "ship_via": "FedEx",
                "order_number": "ORD-2024-001",
                "qty": 5,
                "item_type": "Network Equipment",
                "item_desc": "Cisco Catalyst 9300 48-Port Switch",
                "order_id": orders[0].id
            },
            {
                "our_name": "Flowventory",
                "our_address": "University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223",
                "bill_to": "Dell Technologies\n456 Server Lane\nAustin, TX 78701",
                "ship_to": "UNCC Server Room\n9201 University City Blvd\nCharlotte, NC 28223",
                "invoice_number": "INV-2024-002",
                "invoice_date": today - timedelta(days=2),
                "due_date": today + timedelta(days=28),
                "ship_via": "UPS Ground",
                "order_number": "ORD-2024-002",
                "qty": 3,
                "item_type": "Servers",
                "item_desc": "Dell PowerEdge R740 Server",
                "order_id": orders[1].id
            },
            {
                "our_name": "Flowventory",
                "our_address": "University of North Carolina at Charlotte\n9201 University City Blvd\nCharlotte, NC 28223",
                "bill_to": "Cisco Systems Inc\n123 Tech Drive\nSan Jose, CA 95134",
                "ship_to": "UNCC Network Closet\n9201 University City Blvd\nCharlotte, NC 28223",
                "invoice_number": "INV-2024-003",
                "invoice_date": today - timedelta(days=7),
                "due_date": today + timedelta(days=23),
                "ship_via": "FedEx Express",
                "order_number": "ORD-2024-003",
                "qty": 10,
                "item_type": "Network Equipment",
                "item_desc": "Cisco Meraki MR46 Access Point",
                "order_id": orders[2].id
            },
        ]

        shipments = []
        for shipment_data in shipments_data:
            shipment = db_models.Shipment(**shipment_data)
            db.add(shipment)
            shipments.append(shipment)

        db.commit()
        for shipment in shipments:
            db.refresh(shipment)

        print(f"Created {len(shipments)} shipments")

        # Create inventory items
        print("Creating inventory items...")

        # Base inventory items
        base_inventory = [
            {"item_id": "SWITCH-001", "description": "Cisco Catalyst 9300 48-Port Switch", "vendor": "Cisco", "category": "Network Equipment", "sku": "C9300-48P", "quantity": 5, "zone": "A", "aisle": "1", "rack": "3", "shelf": "2", "storage_location": "A-1-3-2", "status": "pending_inspection"},
            {"item_id": "SERVER-001", "description": "Dell PowerEdge R740 Server", "vendor": "Dell", "category": "Servers", "sku": "PE-R740", "quantity": 2, "zone": "B", "aisle": "2", "rack": "1", "shelf": "1", "storage_location": "B-2-1-1", "status": "ready_for_deployment"},
            {"item_id": "AP-001", "description": "Cisco Meraki MR46 Access Point", "vendor": "Cisco", "category": "Network Equipment", "sku": "MR46-HW", "quantity": 10, "zone": "A", "aisle": "3", "rack": "2", "shelf": "1", "storage_location": "A-3-2-1", "status": "installed"},
            {"item_id": "ROUTER-001", "description": "Cisco ISR 4331 Router", "vendor": "Cisco", "category": "Network Equipment", "sku": "ISR4331", "quantity": 2, "zone": "A", "aisle": "1", "rack": "5", "shelf": "3", "storage_location": "A-1-5-3", "status": "pending_inspection"},
            {"item_id": "RACK-001", "description": "StarTech 42U Server Rack", "vendor": "StarTech", "category": "Infrastructure", "sku": "RK42U", "quantity": 2, "zone": "C", "aisle": "1", "rack": "1", "shelf": "1", "storage_location": "C-1-1-1", "status": "ready_for_deployment"},
        ]

        # Generate large quantity of fake inventory items
        vendors = ["Cisco", "Dell", "HP", "Lenovo", "Aruba", "Juniper", "Fortinet", "Palo Alto", "VMware", "Microsoft"]
        categories = ["Network Equipment", "Servers", "Storage", "Semiconductors", "PCB Components", "Passive Components", "Cables", "Infrastructure"]
        statuses = ["pending_inspection", "ready_for_deployment", "installed"]
        zones = ["A", "B", "C", "D", "E"]

        inventory_data = base_inventory.copy()

        # Add 95 more items for a total of 100
        for i in range(6, 101):
            vendor = random.choice(vendors)
            category = random.choice(categories)
            status = random.choice(statuses)
            zone = random.choice(zones)
            aisle = str(random.randint(1, 5))
            rack = str(random.randint(1, 10))
            shelf = str(random.randint(1, 5))

            item = {
                "item_id": f"ITEM-{i:04d}",
                "description": f"{vendor} {category} Component {i}",
                "vendor": vendor,
                "category": category,
                "sku": f"SKU-{i:04d}",
                "quantity": random.randint(1, 50),
                "zone": zone,
                "aisle": aisle,
                "rack": rack,
                "shelf": shelf,
                "storage_location": f"{zone}-{aisle}-{rack}-{shelf}",
                "status": status,
                "weight": f"{random.randint(1, 100)}kg",
                "dimensions": f"{random.randint(10, 50)}x{random.randint(10, 50)}x{random.randint(10, 50)}cm",
            }
            inventory_data.append(item)

        inventory_items = []
        for item_data in inventory_data:
            item = db_models.InventoryItem(**item_data)
            db.add(item)
            inventory_items.append(item)

        db.commit()
        for item in inventory_items:
            db.refresh(item)

        print(f"Created {len(inventory_items)} inventory items")

        # Create packing slips
        print("Creating packing slips...")
        packing_slips_data = [
            {
                "filename": "packing_slip_cisco_001.pdf",
                "content_type": "application/pdf",
                "file_url": "/uploads/packing_slip_cisco_001.pdf",
                "shipment_id": shipments[0].id,
                "inventory_item_id": inventory_items[0].id,
                "uploaded_by": users[3].id  # Dany
            },
            {
                "filename": "packing_slip_dell_001.pdf",
                "content_type": "application/pdf",
                "file_url": "/uploads/packing_slip_dell_001.pdf",
                "shipment_id": shipments[1].id,
                "inventory_item_id": inventory_items[1].id,
                "uploaded_by": users[3].id  # Dany
            },
            {
                "filename": "packing_slip_cisco_002.pdf",
                "content_type": "application/pdf",
                "file_url": "/uploads/packing_slip_cisco_002.pdf",
                "shipment_id": shipments[2].id,
                "inventory_item_id": inventory_items[2].id,
                "uploaded_by": users[0].id  # Preet
            },
        ]

        packing_slips = []
        for ps_data in packing_slips_data:
            ps = db_models.PackingSlip(**ps_data)
            db.add(ps)
            packing_slips.append(ps)

        db.commit()

        print(f"Created {len(packing_slips)} packing slips")

        print("\n✅ Database seeded successfully!")
        print(f"Total records created:")
        print(f"  - {len(users)} users")
        print(f"  - {len(orders)} orders")
        print(f"  - {len(shipments)} shipments")
        print(f"  - {len(inventory_items)} inventory items")
        print(f"  - {len(packing_slips)} packing slips")

    except Exception as e:
        print(f"❌ Error seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
