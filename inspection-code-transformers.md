## main file that runs the backend
main.py

import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from routers.users import router as users_router
from routers.orders import router as orders_router
from routers.shipments import router as shipments_router
from routers.inventory import router as inventory_router
from routers.packing_slips import router as packing_slips_router
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent))

app = FastAPI()

origins = [
    "*" #here put the url of the frontend server before production. For now its open to everything
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(orders_router)
app.include_router(shipments_router)
app.include_router(inventory_router)
app.include_router(packing_slips_router)

## Health Check
@app.get("/")
def health():
    return {"ok": True, "service": "flowventory"}

if __name__ == "__main__": 
    uvicorn.run(app, host="0.0.0.0", port=8000)

## Routers (All the methods to add, remove, and update inventory items)
## Inventory Router 
Inventory.py

from typing import List
from fastapi import APIRouter
from db.models import InventoryItemIn, InventoryItemOut
from db.memory import inventory_db

#inventory_db here links to the in-memory temporary memory, needs to be changed when database implemented.

router = APIRouter(prefix="/inventory", tags=["inventory"])

@router.post("/", response_model=InventoryItemOut)
def add_inventory(item: InventoryItemIn):
    new_item = item.model_dump()
    new_item["id"] = len(inventory_db) + 1
    inventory_db.append(new_item)
    return new_item

@router.get("/", response_model=List[InventoryItemOut])
def list_inventory():
    return inventory_db

@router.get("/{item_id}", response_model=InventoryItemOut)
def get_inventory_item(item_id: int):
    for item in inventory_db:
        if item["id"] == item_id:
            return item
    return {"error": "Inventory item not found"}

@router.delete("/{item_id}", response_model=dict)
def delete_inventory_item(item_id: int):
    global inventory_db
    inventory_db = [item for item in inventory_db if item["id"] != item_id]
    return {"message": "Inventory item deleted"}

@router.put("/{item_id}", response_model=InventoryItemOut)
def update_inventory_item(item_id: int, updated_item: InventoryItemIn):
    for index, item in enumerate(inventory_db):
        if item["id"] == item_id:
            inventory_db[index].update(updated_item.model_dump())
            return inventory_db[index]
    return {"error": "Inventory item not found"}

## Orders router

orders.py

from typing import List
from fastapi import APIRouter
from db.models import OrderIn, OrderOut
from db.memory import orders_db

#orders_db here links to the in-memory temporary memory, needs to be changed when database implemented.

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/", response_model=OrderOut)
def create_order(order: OrderIn):
    new_order = order.model_dump()
    new_order["id"] = len(orders_db) + 1
    orders_db.append(new_order)
    return new_order

@router.get("/", response_model=List[OrderOut])
def list_orders():
    return orders_db

@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: int):
    for order in orders_db:
        if order["id"] == order_id:
            return order
    return {"error": "Order not found"}

@router.delete("/{order_id}", response_model=dict)
def delete_order(order_id: int):
    global orders_db
    orders_db = [order for order in orders_db if order["id"] != order_id]
    return {"message": "Order deleted"}

@router.put("/{order_id}", response_model=OrderOut)
def update_order(order_id: int, updated_order: OrderIn):
    for index, order in enumerate(orders_db):
        if order["id"] == order_id:
            orders_db[index].update(updated_order.model_dump())
            return orders_db[index]
    return {"error": "Order not found"}

## Packing slip router

packing_slips.py

from typing import List
from fastapi import APIRouter
from db.models import PackingSlipIn, PackingSlipOut
from db.memory import packing_slips_db

#packing_slips_db here links to the in-memory temporary memory, needs to be changed when database implemented.


router = APIRouter(prefix="/packing_slips", tags=["packing_slips"])

@router.post("/", response_model=PackingSlipOut)
def upload_packing_slip(ps: PackingSlipIn):
    new_ps = ps.model_dump()
    new_ps["id"] = len(packing_slips_db) + 1
    new_ps["uploaded_by"] = 1  # pretend user id = 1
    packing_slips_db.append(new_ps)
    return new_ps

@router.get("/", response_model=List[PackingSlipOut])
def list_packing_slips():
    return packing_slips_db

@router.get("/{ps_id}", response_model=PackingSlipOut)
def get_packing_slip(ps_id: int):
    for ps in packing_slips_db:
        if ps["id"] == ps_id:
            return ps
    return {"error": "Packing slip not found"}

@router.delete("/{ps_id}", response_model=dict)
def delete_packing_slip(ps_id: int):
    global packing_slips_db
    packing_slips_db = [ps for ps in packing_slips_db if ps["id"] != ps_id]
    return {"message": "Packing slip deleted"}

@router.put("/{ps_id}", response_model=PackingSlipOut)
def update_packing_slip(ps_id: int, updated_ps: PackingSlipIn):
    for index, ps in enumerate(packing_slips_db):
        if ps["id"] == ps_id:
            packing_slips_db[index].update(updated_ps.model_dump())
            return packing_slips_db[index]
    return {"error": "Packing slip not found"}

## Shipments router

shipments.py

from typing import List
from fastapi import APIRouter
from db.models import ShipmentIn, ShipmentOut
from db.memory import shipments_db

#shipments_db here links to the in-memory temporary memory, needs to be changed when database implemented.


router = APIRouter(prefix="/shipments", tags=["shipments"])

@router.post("/", response_model=ShipmentOut)
def create_shipment(shipment: ShipmentIn):
    new_ship = shipment.model_dump()
    new_ship["id"] = len(shipments_db) + 1
    shipments_db.append(new_ship)
    return new_ship

@router.get("/", response_model=List[ShipmentOut])
def list_shipments():
    return shipments_db

@router.get("/{ship_id}", response_model=ShipmentOut)
def get_shipment(ship_id: int):
    for ship in shipments_db:
        if ship["id"] == ship_id:
            return ship
    return {"error": "Shipment not found"}

@router.delete("/{ship_id}", response_model=dict)
def delete_shipment(ship_id: int):
    global shipments_db
    shipments_db = [ship for ship in shipments_db if ship["id"] != ship_id]
    return {"message": "Shipment deleted"}

## Users Router

users.py

from typing import List
from fastapi import APIRouter
from db.models import UserIn, UserOut
from db.memory import users_db

#users_db here links to the in-memory temporary memory, needs to be changed when database implemented.

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserOut)
def create_user(user: UserIn):
    new_user = user.model_dump()
    new_user["id"] = len(users_db) + 1
    users_db.append(new_user)
    return new_user

@router.get("/", response_model=List[UserOut])
def list_users():
    return users_db

@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int):
    for user in users_db:
        if user["id"] == user_id:
            return user
    return {"error": "User not found"}

@router.delete("/{user_id}", response_model=dict)
def delete_user(user_id: int):
    global users_db
    users_db = [user for user in users_db if user["id"] != user_id]
    return {"message": "User deleted"}

@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: int, updated_user: UserIn):
    for index, user in enumerate(users_db):
        if user["id"] == user_id:
            users_db[index].update(updated_user.model_dump())
            return users_db[index]
    return {"error": "User not found"}

## Frontend Core Functionalities

## Handling User login
const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Add small delay for better UX
    setTimeout(() => {
      if (login(username, password)) {
        router.push('/dashboard');
      } else {
        setError('Invalid username or password');
        setIsLoading(false);
      }
    }, 800);
  };

## Shipment file handling
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0]);
    }
  };

