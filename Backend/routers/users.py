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

@router.get("/{user_id}", response_model=UserOut)
def get_user(user_id: int):
    for user in users_db:
        if user["id"] == user_id:
            return user
    return {"error": "User not found"}

@router.delete("/{user_id}", response_model=dict)
def delete_user(user_id: int):
    global users_db
    users_db = [user for user in users_db if user["id"] != user_id]
    return {"message": "User deleted"}

@router.put("/{user_id}", response_model=UserOut)
def update_user(user_id: int, updated_user: UserIn):
    for index, user in enumerate(users_db):
        if user["id"] == user_id:
            users_db[index].update(updated_user.model_dump())
            return users_db[index]
    return {"error": "User not found"}