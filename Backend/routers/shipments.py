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