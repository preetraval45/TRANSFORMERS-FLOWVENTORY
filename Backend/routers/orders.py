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

