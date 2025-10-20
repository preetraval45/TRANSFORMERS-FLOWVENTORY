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