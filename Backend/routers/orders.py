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