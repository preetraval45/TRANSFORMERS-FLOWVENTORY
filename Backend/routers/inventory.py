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

