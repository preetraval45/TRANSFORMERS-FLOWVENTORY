from sqlalchemy import Column, Integer, String, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    role = Column(String, nullable=False)  # "client", "engineer", "admin"
    password = Column(String, nullable=False)  # Should be hashed in production


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    status = Column(String, nullable=False, default="submitted")  # "submitted", "in_progress", "closed", "canceled"
    notes = Column(Text, nullable=True)
    items = Column(JSON, nullable=False)  # Store items as JSON array

    client = relationship("User", backref="orders")


class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(Integer, primary_key=True, index=True)
    vendor = Column(String, nullable=False)
    carrier = Column(String, nullable=True)
    tracking_number = Column(String, nullable=True)
    expected_delivery_date = Column(String, nullable=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=True)
    status = Column(String, nullable=False, default="pending")  # "pending", "partially_received", "received"
    items = Column(JSON, nullable=False, default=[])

    order = relationship("Order", backref="shipments")


class InventoryItem(Base):
    __tablename__ = "inventory_items"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(String, unique=True, index=True, nullable=False)
    sku = Column(String, index=True, nullable=True)  # Stock Keeping Unit
    description = Column(String, nullable=True)
    vendor = Column(String, nullable=True)
    quantity = Column(Integer, default=0)

    # Amazon-style warehouse location fields
    zone = Column(String, nullable=True)  # e.g., "A", "B", "C"
    aisle = Column(String, nullable=True)  # e.g., "A1", "B2"
    rack = Column(String, nullable=True)  # e.g., "R01", "R02"
    shelf = Column(String, nullable=True)  # e.g., "S1", "S2", "S3"
    bin = Column(String, nullable=True)  # e.g., "BIN-001"
    storage_location = Column(String, nullable=True)  # Full location string: "A-A1-R01-S1-BIN001"

    # Item properties
    category = Column(String, nullable=True)  # Electronics, PCB, Components, etc.
    weight = Column(String, nullable=True)  # with unit, e.g., "5.2 lbs"
    dimensions = Column(String, nullable=True)  # e.g., "12x8x4 inches"
    barcode = Column(String, unique=True, index=True, nullable=True)

    status = Column(String, nullable=False, default="pending_inspection")  # "pending_inspection", "ready_for_deployment", "installed"
    last_shipment_id = Column(Integer, ForeignKey("shipments.id"), nullable=True)

    last_shipment = relationship("Shipment", backref="inventory_items")


class PackingSlip(Base):
    __tablename__ = "packing_slips"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    content_type = Column(String, nullable=False)
    file_url = Column(String, nullable=True)
    shipment_id = Column(Integer, ForeignKey("shipments.id"), nullable=True)
    inventory_item_id = Column(Integer, ForeignKey("inventory_items.id"), nullable=True)
    uploaded_by = Column(Integer, ForeignKey("users.id"), nullable=False)

    shipment = relationship("Shipment", backref="packing_slips")
    inventory_item = relationship("InventoryItem", backref="packing_slips")
    uploader = relationship("User", backref="packing_slips")
