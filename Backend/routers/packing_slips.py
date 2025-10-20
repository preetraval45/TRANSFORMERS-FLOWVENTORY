from typing import List
from fastapi import APIRouter
from db.models import PackingSlipIn, PackingSlipOut
from db.memory import packing_slips_db

#packing_slips_db here links to the in-memory temporary memory, needs to be changed when database implemented.


router = APIRouter(prefix="/packing_slips", tags=["packing_slips"])

@router.post("/", response_model=PackingSlipOut)
def upload_packing_slip(ps: PackingSlipIn):
    new_ps = ps.model_dump()
    new_ps["id"] = len(packing_slips_db) + 1
    new_ps["uploaded_by"] = 1  # pretend user id = 1
    packing_slips_db.append(new_ps)
    return new_ps

@router.get("/", response_model=List[PackingSlipOut])
def list_packing_slips():
    return packing_slips_db

@router.get("/{ps_id}", response_model=PackingSlipOut)
def get_packing_slip(ps_id: int):
    for ps in packing_slips_db:
        if ps["id"] == ps_id:
            return ps
    return {"error": "Packing slip not found"}

@router.delete("/{ps_id}", response_model=dict)
def delete_packing_slip(ps_id: int):
    global packing_slips_db
    packing_slips_db = [ps for ps in packing_slips_db if ps["id"] != ps_id]
    return {"message": "Packing slip deleted"}

@router.put("/{ps_id}", response_model=PackingSlipOut)
def update_packing_slip(ps_id: int, updated_ps: PackingSlipIn):
    for index, ps in enumerate(packing_slips_db):
        if ps["id"] == ps_id:
            packing_slips_db[index].update(updated_ps.model_dump())
            return packing_slips_db[index]
    return {"error": "Packing slip not found"}