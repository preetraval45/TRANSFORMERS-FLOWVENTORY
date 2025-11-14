import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from routers.users import router as users_router
from routers.orders import router as orders_router
from routers.shipments import router as shipments_router
from routers.inventory import router as inventory_router
from routers.packing_slips import router as packing_slips_router
from db.database import engine, Base
from db import db_models
import sys
from pathlib import Path
# from db.database import Base, engine


sys.path.append(str(Path(__file__).resolve().parent))

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI() 

origins = [
    "*" #here put the url of the frontend server. For now its open to everything
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users_router)
app.include_router(orders_router)
app.include_router(shipments_router)
app.include_router(inventory_router)
app.include_router(packing_slips_router)

#Example endpoints
@app.get("/")
def health():
    return {"ok": True, "service": "flowventory"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)




