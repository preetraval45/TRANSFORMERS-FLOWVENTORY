from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.models import InventoryItemIn, InventoryItemOut
from db import db_models
from db.database import get_db

router = APIRouter(prefix="/inventory", tags=["inventory"])

@router.post("/", response_model=InventoryItemOut)
def add_inventory(item: InventoryItemIn, db: Session = Depends(get_db)):
    db_item = db_models.InventoryItem(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

@router.get("/", response_model=List[InventoryItemOut])
def list_inventory(db: Session = Depends(get_db)):
    return db.query(db_models.InventoryItem).all()

@router.get("/{item_id}", response_model=InventoryItemOut)
def get_inventory_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(db_models.InventoryItem).filter(db_models.InventoryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    return item

@router.delete("/{item_id}", response_model=dict)
def delete_inventory_item(item_id: int, db: Session = Depends(get_db)):
    item = db.query(db_models.InventoryItem).filter(db_models.InventoryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    db.delete(item)
    db.commit()
    return {"message": "Inventory item deleted"}

@router.put("/{item_id}", response_model=InventoryItemOut)
def update_inventory_item(item_id: int, updated_item: InventoryItemIn, db: Session = Depends(get_db)):
    item = db.query(db_models.InventoryItem).filter(db_models.InventoryItem.id == item_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Inventory item not found")
    for key, value in updated_item.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item

