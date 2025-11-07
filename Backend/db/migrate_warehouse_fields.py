"""
Database migration to add Amazon warehouse fields to inventory_items table
"""
from sqlalchemy import create_engine, text
import os

# Database connection string
DATABASE_URL = os.getenv('DATABASE_URL', 'postgresql://postgres:postgres@localhost:5432/flowventory')

def run_migration():
    engine = create_engine(DATABASE_URL)

    with engine.connect() as conn:
        # Begin transaction
        trans = conn.begin()

        try:
            print("Starting migration to add warehouse fields...")

            # Add new columns to inventory_items table
            migration_sql = """
            -- Add SKU field
            ALTER TABLE inventory_items
            ADD COLUMN IF NOT EXISTS sku VARCHAR;

            -- Add warehouse location fields
            ALTER TABLE inventory_items
            ADD COLUMN IF NOT EXISTS zone VARCHAR;

            ALTER TABLE inventory_items
            ADD COLUMN IF NOT EXISTS aisle VARCHAR;

            ALTER TABLE inventory_items
            ADD COLUMN IF NOT EXISTS rack VARCHAR;

            ALTER TABLE inventory_items
            ADD COLUMN IF NOT EXISTS shelf VARCHAR;

            ALTER TABLE inventory_items
            ADD COLUMN IF NOT EXISTS bin VARCHAR;

            -- Add item property fields
            ALTER TABLE inventory_items
            ADD COLUMN IF NOT EXISTS category VARCHAR;

            ALTER TABLE inventory_items
            ADD COLUMN IF NOT EXISTS weight VARCHAR;

            ALTER TABLE inventory_items
            ADD COLUMN IF NOT EXISTS dimensions VARCHAR;

            ALTER TABLE inventory_items
            ADD COLUMN IF NOT EXISTS barcode VARCHAR UNIQUE;

            -- Create indexes for better performance
            CREATE INDEX IF NOT EXISTS idx_inventory_sku ON inventory_items(sku);
            CREATE INDEX IF NOT EXISTS idx_inventory_zone ON inventory_items(zone);
            CREATE INDEX IF NOT EXISTS idx_inventory_barcode ON inventory_items(barcode);
            CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory_items(category);
            """

            conn.execute(text(migration_sql))
            trans.commit()
            print("Migration completed successfully!")

        except Exception as e:
            trans.rollback()
            print(f"Migration failed: {e}")
            raise

if __name__ == "__main__":
    run_migration()
