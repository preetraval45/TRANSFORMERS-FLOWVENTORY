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
            {"email": "preet@flowventory.com", "full_name": "Preet", "role": "admin", "password": "P@ss123!"},
            {"email": "carlotta@flowventory.com", "full_name": "Carlotta", "role": "admin", "password": "C@rl456@"},
            {"email": "yana@flowventory.com", "full_name": "Yana", "role": "admin", "password": "Y@na789#"},
            {"email": "dany@flowventory.com", "full_name": "Dany", "role": "engineer", "password": "D@ny012$"},
            {"email": "jack@flowventory.com", "full_name": "Jack", "role": "client", "password": "J@ck345%"},
            {"email": "sarah@client.com", "full_name": "Sarah Johnson", "role": "client", "password": "password123"},
            {"email": "mike@client.com", "full_name": "Mike Chen", "role": "client", "password": "password123"},
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

        # Create shipments
        print("Creating shipments...")
        today = datetime.now()
        shipments_data = [
            {
                "vendor": "Cisco",
                "carrier": "FedEx",
                "tracking_number": "1Z999AA10123456784",
                "expected_delivery_date": (today + timedelta(days=2)).strftime("%Y-%m-%d"),
                "order_id": orders[0].id,
                "status": "pending",
                "items": [
                    {"item_id": "SWITCH-001", "description": "Cisco Catalyst 9300", "expected_qty": 5, "received_qty": 0},
                ]
            },
            {
                "vendor": "Dell",
                "carrier": "UPS",
                "tracking_number": "1Z999BB20123456789",
                "expected_delivery_date": (today - timedelta(days=1)).strftime("%Y-%m-%d"),
                "order_id": orders[1].id,
                "status": "partially_received",
                "items": [
                    {"item_id": "SERVER-001", "description": "Dell PowerEdge R740", "expected_qty": 3, "received_qty": 2},
                ]
            },
            {
                "vendor": "Cisco",
                "carrier": "FedEx",
                "tracking_number": "1Z999CC30123456790",
                "expected_delivery_date": (today - timedelta(days=5)).strftime("%Y-%m-%d"),
                "order_id": orders[2].id,
                "status": "received",
                "items": [
                    {"item_id": "AP-001", "description": "Cisco Meraki MR46", "expected_qty": 10, "received_qty": 10},
                ]
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
        inventory_data = [
            {
                "item_id": "SWITCH-001",
                "description": "Cisco Catalyst 9300 48-Port Switch",
                "vendor": "Cisco",
                "quantity": 5,
                "storage_location": "Warehouse A - Shelf 3",
                "status": "pending_inspection",
                "last_shipment_id": shipments[0].id
            },
            {
                "item_id": "SERVER-001",
                "description": "Dell PowerEdge R740 Server",
                "vendor": "Dell",
                "quantity": 2,
                "storage_location": "Server Room - Rack 1",
                "status": "ready_for_deployment",
                "last_shipment_id": shipments[1].id
            },
            {
                "item_id": "AP-001",
                "description": "Cisco Meraki MR46 Access Point",
                "vendor": "Cisco",
                "quantity": 10,
                "storage_location": "Warehouse B - Shelf 1",
                "status": "installed",
                "last_shipment_id": shipments[2].id
            },
            {
                "item_id": "ROUTER-001",
                "description": "Cisco ISR 4331 Router",
                "vendor": "Cisco",
                "quantity": 2,
                "storage_location": "Warehouse A - Shelf 5",
                "status": "pending_inspection",
                "last_shipment_id": None
            },
            {
                "item_id": "RACK-001",
                "description": "StarTech 42U Server Rack",
                "vendor": "StarTech",
                "quantity": 2,
                "storage_location": "Receiving Dock",
                "status": "ready_for_deployment",
                "last_shipment_id": shipments[1].id
            },
        ]

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
