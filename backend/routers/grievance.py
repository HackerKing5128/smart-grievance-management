# backend/routers/grievance.py
from database import get_db
from fastapi import APIRouter, Depends
from models.grievance import Grievance
from schemas import GrievanceCreate, GrievanceResponse
from sqlalchemy.orm import Session
from utils.classifier import classify_grievance

router = APIRouter(prefix="/grievance", tags=["Grievance"])


@router.post("/submit", response_model=GrievanceResponse)
def submit_grievance(grievance: GrievanceCreate, db: Session = Depends(get_db)):

    # Classify the grievance
    department = classify_grievance(grievance.complaint)

    # Create a new grievance record
    new_grievance = Grievance(
        name=grievance.name,
        email=grievance.email,
        complaint=grievance.complaint,
        department=department,
    )
    db.add(new_grievance)
    db.commit()
    db.refresh(new_grievance)
    return new_grievance
