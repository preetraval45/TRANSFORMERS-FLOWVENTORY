import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers.users import router as users_router
from routers.orders import router as orders_router
from routers.shipments import router as shipments_router
from routers.inventory import router as inventory_router
from routers.packing_slips import router as packing_slips_router
from database import Base, engine

app = FastAPI()

@app.on_event("startup")
def on_startup():
    import time
    from sqlalchemy.exc import OperationalError

    max_retries = 10
    for i in range(max_retries):
        try:
            print("Creating tables if they don't exist...")
            Base.metadata.create_all(bind=engine)
            print("Tables created")
            break
        except OperationalError:
            print(f"Database not ready, retrying... ({i+1}/{max_retries})")
            time.sleep(2)

# CORS setup
origins = ["*"]

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

# Health endpoint
@app.get("/")
def health():
    return {"ok": True, "service": "flowventory"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
