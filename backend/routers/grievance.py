# backend/routers/grievance.py
from database import get_db
from database import SessionLocal
from fastapi import APIRouter, Depends, HTTPException
from models.grievance import Grievance
from schemas import GrievanceCreate, GrievanceResponse
from sqlalchemy.orm import Session

router = APIRouter(prefix="/grievance", tags=["Grievance"])


@router.post("/submit", response_model=GrievanceResponse)
def submit_grievance(grievance: GrievanceCreate, db: Session = Depends(get_db)):
    new_grievance = Grievance(
        name=grievance.name,
        email=grievance.email,
        complaint=grievance.complaint
    )
    db.add(new_grievance)
    db.commit()
    db.refresh(new_grievance)
    return new_grievance
