from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db.models import PackingSlipIn, PackingSlipOut
from db import db_models
from db.database import get_db

router = APIRouter(prefix="/packing_slips", tags=["packing_slips"])

@router.post("/", response_model=PackingSlipOut)
def upload_packing_slip(ps: PackingSlipIn, db: Session = Depends(get_db)):
    ps_data = ps.model_dump()
    ps_data["uploaded_by"] = 1  # pretend user id = 1
    db_ps = db_models.PackingSlip(**ps_data)
    db.add(db_ps)
    db.commit()
    db.refresh(db_ps)
    return db_ps

@router.get("/", response_model=List[PackingSlipOut])
def list_packing_slips(db: Session = Depends(get_db)):
    return db.query(db_models.PackingSlip).all()

@router.get("/{ps_id}", response_model=PackingSlipOut)
def get_packing_slip(ps_id: int, db: Session = Depends(get_db)):
    ps = db.query(db_models.PackingSlip).filter(db_models.PackingSlip.id == ps_id).first()
    if not ps:
        raise HTTPException(status_code=404, detail="Packing slip not found")
    return ps

@router.delete("/{ps_id}", response_model=dict)
def delete_packing_slip(ps_id: int, db: Session = Depends(get_db)):
    ps = db.query(db_models.PackingSlip).filter(db_models.PackingSlip.id == ps_id).first()
    if not ps:
        raise HTTPException(status_code=404, detail="Packing slip not found")
    db.delete(ps)
    db.commit()
    return {"message": "Packing slip deleted"}

@router.put("/{ps_id}", response_model=PackingSlipOut)
def update_packing_slip(ps_id: int, updated_ps: PackingSlipIn, db: Session = Depends(get_db)):
    ps = db.query(db_models.PackingSlip).filter(db_models.PackingSlip.id == ps_id).first()
    if not ps:
        raise HTTPException(status_code=404, detail="Packing slip not found")
    for key, value in updated_ps.model_dump(exclude={"uploaded_by"}, exclude_unset=True).items():
        setattr(ps, key, value)
    db.commit()
    db.refresh(ps)
    return ps