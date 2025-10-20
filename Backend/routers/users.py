from typing import List
from fastapi import APIRouter
from db.models import UserIn, UserOut
from db.memory import users_db

#users_db here links to the in-memory temporary memory, needs to be changed when database implemented.

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/", response_model=UserOut)
def create_user(user: UserIn):
    new_user = user.model_dump()
    new_user["id"] = len(users_db) + 1
    users_db.append(new_user)
    return new_user

@router.get("/", response_model=List[UserOut])
def list_users():
    return users_db