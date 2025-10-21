# app/schemas.py
from typing import List, Optional, Literal
from pydantic import BaseModel


# ---- Users ----
Role = Literal["client", "engineer", "admin"]

class UserIn(BaseModel):
    email: str
    full_name: str
    role: Role
    password: str  # only for create

class UserOut(BaseModel):
    id: int
    email: str
    full_name: str
    role: Role


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
ShipmentStatus = Literal["pending", "partially_received", "received"]

class ShipmentItem(BaseModel):
    item_id: str
    description: Optional[str] = None
    expected_qty: int = 0
    received_qty: int = 0

class ShipmentIn(BaseModel):
    vendor: str
    carrier: Optional[str] = None
    tracking_number: Optional[str] = None
    expected_delivery_date: Optional[str] = None  # "YYYY-MM-DD"
    order_id: Optional[int] = None
    status: ShipmentStatus = "pending"
    items: List[ShipmentItem] = []

class ShipmentOut(ShipmentIn):
    id: int


# ---- Inventory ----
InventoryStatus = Literal["pending_inspection", "ready_for_deployment", "installed"]

class InventoryItemIn(BaseModel):
    item_id: str            # enforce uniqueness in DB/service
    description: Optional[str] = None
    vendor: Optional[str] = None
    quantity: int = 0
    storage_location: Optional[str] = None
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