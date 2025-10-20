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