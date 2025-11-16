from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.models import ShipmentIn, ShipmentOut
from db import db_models
from db.database import get_db

router = APIRouter(prefix="/shipments", tags=["shipments"])

@router.post("/", response_model=ShipmentOut)
def create_shipment(shipment: ShipmentIn, db: Session = Depends(get_db)):
    shipment_data = shipment.model_dump()
    db_shipment = db_models.Shipment(**shipment_data)
    db.add(db_shipment)
    db.commit()
    db.refresh(db_shipment)
    return db_shipment

@router.get("/", response_model=List[ShipmentOut])
def list_shipments(db: Session = Depends(get_db)):
    return db.query(db_models.Shipment).all()

@router.get("/{ship_id}", response_model=ShipmentOut)
def get_shipment(ship_id: int, db: Session = Depends(get_db)):
    shipment = db.query(db_models.Shipment).filter(db_models.Shipment.id == ship_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    return shipment

@router.delete("/{ship_id}", response_model=dict)
def delete_shipment(ship_id: int, db: Session = Depends(get_db)):
    shipment = db.query(db_models.Shipment).filter(db_models.Shipment.id == ship_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    db.delete(shipment)
    db.commit()
    return {"message": "Shipment deleted"}

@router.put("/{ship_id}", response_model=ShipmentOut)
def update_shipment(ship_id: int, updated_shipment: ShipmentIn, db: Session = Depends(get_db)):
    shipment = db.query(db_models.Shipment).filter(db_models.Shipment.id == ship_id).first()
    if not shipment:
        raise HTTPException(status_code=404, detail="Shipment not found")
    shipment_data = updated_shipment.model_dump()
    for key, value in shipment_data.items():
        setattr(shipment, key, value)
    db.commit()
    db.refresh(shipment)
    return shipment