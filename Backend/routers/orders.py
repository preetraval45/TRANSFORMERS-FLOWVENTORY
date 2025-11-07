from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.models import OrderIn, OrderOut
from db import db_models
from db.database import get_db

router = APIRouter(prefix="/orders", tags=["orders"])

@router.post("/", response_model=OrderOut)
def create_order(order: OrderIn, db: Session = Depends(get_db)):
    order_data = order.model_dump()
    items = order_data.pop("items")
    db_order = db_models.Order(**order_data, items=[item.model_dump() if hasattr(item, 'model_dump') else item for item in order.items])
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@router.get("/", response_model=List[OrderOut])
def list_orders(db: Session = Depends(get_db)):
    return db.query(db_models.Order).all()

@router.get("/{order_id}", response_model=OrderOut)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(db_models.Order).filter(db_models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

@router.delete("/{order_id}", response_model=dict)
def delete_order(order_id: int, db: Session = Depends(get_db)):
    order = db.query(db_models.Order).filter(db_models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    db.delete(order)
    db.commit()
    return {"message": "Order deleted"}

@router.put("/{order_id}", response_model=OrderOut)
def update_order(order_id: int, updated_order: OrderIn, db: Session = Depends(get_db)):
    order = db.query(db_models.Order).filter(db_models.Order.id == order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    order_data = updated_order.model_dump()
    for key, value in order_data.items():
        if key == "items":
            value = [item.model_dump() if hasattr(item, 'model_dump') else item for item in updated_order.items]
        setattr(order, key, value)
    db.commit()
    db.refresh(order)
    return order

