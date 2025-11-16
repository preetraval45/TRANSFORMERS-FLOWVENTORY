# app/schemas.py
from typing import List, Optional, Literal, Union
from pydantic import BaseModel
from datetime import date


# ---- Users ----
Role = Literal["admin", "engineer", "manager"]

class UserIn(BaseModel):
    username: str
    firstname: str
    role: Role
    password: str  # only for create
    assigned_pages: Optional[List[str]] = None

class UserOut(BaseModel):
    id: int
    username: str
    firstname: str
    role: Role
    assigned_pages: Optional[List[str]] = None


# ---- Orders ----
OrderStatus = Literal["submitted", "in_progress", "closed", "canceled"]

class OrderLineItem(BaseModel):
    item_id: str
    description: Optional[str] = None
    vendor: Optional[str] = None
    quantity: int

class OrderIn(BaseModel):
    client_id: int
    status: OrderStatus = "submitted"
    notes: Optional[str] = None
    items: List[OrderLineItem]

class OrderOut(OrderIn):
    id: int


# ---- Shipments ----
class ShipmentIn(BaseModel):
    our_name: str = "Flowventory"
    our_address: str = "9201 University City Blvd, Charlotte, NC 28223"
    bill_to: Optional[str] = None
    ship_to: Optional[str] = None
    invoice_number: str
    invoice_date: Union[str, date]  # Accept both string "YYYY-MM-DD" and date object
    due_date: Optional[Union[str, date]] = None  # Accept both string "YYYY-MM-DD" and date object
    ship_via: Optional[str] = None
    order_number: Optional[str] = None
    qty: int
    item_type: str
    item_desc: Optional[str] = None
    order_id: Optional[int] = None

    class Config:
        from_attributes = True  # Allow ORM mode for SQLAlchemy objects

class ShipmentOut(ShipmentIn):
    id: int


# ---- Inventory ----
InventoryStatus = Literal["pending_inspection", "ready_for_deployment", "installed"]

class InventoryItemIn(BaseModel):
    item_id: str            # enforce uniqueness in DB/service
    sku: Optional[str] = None
    description: Optional[str] = None
    vendor: Optional[str] = None
    quantity: int = 0

    # Amazon-style warehouse location fields
    zone: Optional[str] = None  # e.g., "A", "B", "C"
    aisle: Optional[str] = None  # e.g., "A1", "B2"
    rack: Optional[str] = None  # e.g., "R01", "R02"
    shelf: Optional[str] = None  # e.g., "S1", "S2"
    bin: Optional[str] = None  # e.g., "BIN-001"
    storage_location: Optional[str] = None  # Full location string

    # Item properties
    category: Optional[str] = None  # Electronics, PCB, Components, etc.
    weight: Optional[str] = None
    dimensions: Optional[str] = None
    barcode: Optional[str] = None

    status: InventoryStatus = "pending_inspection"

class InventoryItemOut(InventoryItemIn):
    id: int
    last_shipment_id: Optional[int] = None


# ---- Packing Slips ----
# validate types in the route if needed
class PackingSlipIn(BaseModel):
    filename: str
    content_type: str
    file_url: Optional[str] = None
    shipment_id: Optional[int] = None
    inventory_item_id: Optional[int] = None

class PackingSlipOut(PackingSlipIn):
    id: int
    uploaded_by: int