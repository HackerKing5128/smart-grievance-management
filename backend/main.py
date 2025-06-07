# backend/main.py
from typing import List

from database import engine, get_db
from fastapi import Depends, FastAPI, HTTPException
from models import grievance as grievance_model
from routers import grievance
from schemas import GrievanceCreate, GrievanceResponse, GrievanceUpdate
from sqlalchemy.orm import Session

app = FastAPI()

# Create DB tables

### grievance_model.Base.metadata.drop_all(bind=engine)  # DANGER: Drops all tables!

grievance_model.Base.metadata.create_all(bind=engine)

# Include routes
app.include_router(grievance.router)

# not major use for now
@app.get("/")
def read_root():
    return {"message": "Backend is running!"}


# POST endpoint - submit a grievance
@app.post("/grievance/submit", response_model=GrievanceResponse, status_code=201)
def submit_grievance(grievance: GrievanceCreate, db: Session = Depends(get_db)):
    new_grievance = grievance_model.Grievance(**grievance.dict())
    db.add(new_grievance)
    db.commit()
    db.refresh(new_grievance)
    return {"message": "Grievance submitted", "data": new_grievance}

# GET endpoint - get all grievances
@app.get("/grievances", response_model=List[GrievanceResponse])
def get_all_grievances(db: Session = Depends(get_db)):
    """Retrieve all grievance records from the database."""
    grievances = db.query(grievance_model.Grievance).all()
    return grievances

# GET endpoint - get grievance by ID
@app.get("/grievance/{grievance_id}", response_model=GrievanceResponse)
def get_grievance_by_id(grievance_id: int, db: Session = Depends(get_db)):
    grievance = db.query(grievance_model.Grievance).filter(grievance_model.Grievance.id == grievance_id).first()
    if not grievance:
        raise HTTPException(status_code=404, detail="Grievance not found")
    return grievance

# PUT endpoint - update grievance status
@app.put("/grievance/{grievance_id}", response_model=GrievanceResponse)
def update_grievance(grievance_id: int, update_data: GrievanceUpdate, db: Session = Depends(get_db)):
    grievance = db.query(grievance_model.Grievance).filter(grievance_model.Grievance.id == grievance_id).first()
    if not grievance:
        raise HTTPException(status_code=404, detail="Grievance not found")

    grievance.status = update_data.status
    db.commit()
    db.refresh(grievance)
    return grievance

# DELETE endpoint - delete grievance by ID
@app.delete("/grievance/{grievance_id}", status_code=204)
def delete_grievance(grievance_id: int, db: Session = Depends(get_db)):
    grievance = db.query(grievance_model.Grievance).filter(grievance_model.Grievance.id == grievance_id).first()
    if not grievance:
        raise HTTPException(status_code=404, detail="Grievance not found")
    db.delete(grievance)
    db.commit()
    return