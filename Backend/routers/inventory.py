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