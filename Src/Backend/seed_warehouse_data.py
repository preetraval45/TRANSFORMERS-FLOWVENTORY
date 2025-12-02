"""
Seed database with Amazon warehouse style inventory data
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from db.db_models import InventoryItem, Base
import os
import random

# Database connection
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/flowventory')
engine = create_engine(DATABASE_URL)
Session = sessionmaker(bind=engine)

def generate_warehouse_data():
    """Generate realistic warehouse inventory data"""

    categories = ['Electronics', 'PCB Components', 'Semiconductors', 'Passive Components',
                  'Cables & Connectors', 'Power Supplies', 'Sensors', 'Displays']

    vendors = ['Digikey', 'Mouser', 'Arrow', 'Avnet', 'Newark', 'Allied Electronics']

    zones = ['A', 'B', 'C', 'D', 'E']
    statuses = ['pending_inspection', 'ready_for_deployment', 'installed']

    items = []

    for i in range(1, 101):  # Generate 100 items
        zone = random.choice(zones)
        aisle_num = random.randint(1, 10)
        rack_num = random.randint(1, 20)
        shelf_num = random.randint(1, 5)
        bin_num = random.randint(1, 50)

        item = InventoryItem(
            item_id=f"ITM-{1000 + i}",
            sku=f"SKU-{2000 + i:04d}",
            description=f"{random.choice(['Resistor', 'Capacitor', 'IC Chip', 'Connector', 'Sensor', 'Display Module', 'Power Regulator', 'Transistor'])} - {random.choice(['SMD', 'Through-hole', 'Surface Mount'])}",
            vendor=random.choice(vendors),
            quantity=random.randint(10, 500),
            zone=zone,
            aisle=f"{zone}{aisle_num}",
            rack=f"R{rack_num:02d}",
            shelf=f"S{shelf_num}",
            bin=f"BIN-{bin_num:03d}",
            storage_location=f"{zone}-{zone}{aisle_num}-R{rack_num:02d}-S{shelf_num}-BIN{bin_num:03d}",
            category=random.choice(categories),
            weight=f"{random.uniform(0.1, 5.0):.2f} lbs",
            dimensions=f"{random.randint(2, 12)}x{random.randint(2, 8)}x{random.randint(1, 4)} inches",
            barcode=f"BC{1000000 + i}",
            status=random.choice(statuses),
            last_shipment_id=None
        )
        items.append(item)

    return items

def seed_database():
    """Seed the database with warehouse data"""
    session = Session()

    try:
        print("Generating warehouse inventory data...")
        items = generate_warehouse_data()

        print(f"Inserting {len(items)} items into database...")
        session.add_all(items)
        session.commit()

        print("Database seeded successfully!")
        print(f"Total items added: {len(items)}")

        # Print some sample data
        print("\nSample items:")
        for item in items[:5]:
            print(f"  {item.sku}: {item.description} - Zone: {item.zone}, Location: {item.storage_location}, Qty: {item.quantity}")

    except Exception as e:
        session.rollback()
        print(f"Error seeding database: {e}")
        raise
    finally:
        session.close()

if __name__ == "__main__":
    seed_database()
