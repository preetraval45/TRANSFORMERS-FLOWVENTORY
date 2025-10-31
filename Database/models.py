from sqlalchemy import Column, Integer, String, Text, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base  # <-- fixed import

# ---- USERS ----
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, unique=True)
    full_name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    password = Column(String, nullable=False)

    # A user (client) can have many orders
    orders = relationship("Order", back_populates="client")


# ---- ORDERS ----
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="submitted")
    notes = Column(Text, nullable=True)

    # Relationship: one order → many order line items
    items = relationship("OrderLineItem", back_populates="order", cascade="all, delete")

    # Backref to the user (client)
    client = relationship("User", back_populates="orders")


class OrderLineItem(Base):
    __tablename__ = "order_line_items"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id", ondelete="CASCADE"))
    item_id = Column(String, nullable=False)
    description = Column(String, nullable=True)
    vendor = Column(String, nullable=True)
    quantity = Column(Integer, nullable=False)

    order = relationship("Order", back_populates="items")


# ---- SHIPMENTS ----
class Shipment(Base):
    __tablename__ = "shipments"

    id = Column(Integer, primary_key=True, index=True)
    vendor = Column(String, nullable=False)
    carrier = Column(String, nullable=True)
    tracking_number = Column(String, nullable=True)
    expected_delivery_date = Column(Date, nullable=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    status = Column(String, default="pending")

    items = relationship("ShipmentItem", back_populates="shipment", cascade="all, delete")
    packing_slips = relationship("PackingSlip", back_populates="shipment")


class ShipmentItem(Base):
    __tablename__ = "shipment_items"

    id = Column(Integer, primary_key=True, index=True)
    shipment_id = Column(Integer, ForeignKey("shipments.id", ondelete="CASCADE"))
    item_id = Column(String, nullable=False)
    description = Column(String, nullable=True)
    expected_qty = Column(Integer, default=0)
    received_qty = Column(Integer, default=0)

    shipment = relationship("Shipment", back_populates="items")


# ---- INVENTORY ----
class InventoryItem(Base):
    __tablename__ = "inventory"

    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(String, nullable=False, unique=True)
    description = Column(String, nullable=True)
    vendor = Column(String, nullable=True)
    quantity = Column(Integer, default=0)
    storage_location = Column(String, nullable=True)
    status = Column(String, default="pending_inspection")
    last_shipment_id = Column(Integer, ForeignKey("shipments.id"))

    last_shipment = relationship("Shipment")


# ---- PACKING SLIPS ----
class PackingSlip(Base):
    __tablename__ = "packing_slips"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    content_type = Column(String, nullable=False)
    file_url = Column(String, nullable=True)  # <-- fixed typo
    shipment_id = Column(Integer, ForeignKey("shipments.id"), nullable=True)
    inventory_item_id = Column(Integer, ForeignKey("inventory.id"), nullable=True)
    uploaded_by = Column(Integer, ForeignKey("users.id"))

    shipment = relationship("Shipment", back_populates="packing_slips")
    inventory_item = relationship("InventoryItem")
