# backend/schemas.py
from enum import Enum
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class GrievanceCreate(BaseModel):
    name: str
    email: EmailStr
    complaint: str


class GrievanceResponse(GrievanceCreate):
    id: int
    status: str
    submitted_at: datetime

    class Config:
        from_attributes = True

# Response model for getting all grievances
class GrievanceResponse(BaseModel):
    id: int
    name: str
    email: str
    complaint: str
    status: str
    submitted_at: datetime

    class Config:
        from_attributes = True

# Model for all possible grievance statuses
class GrievanceStatus(str, Enum):
    pending = "Pending"
    in_progress = "In Progress"
    resolved = "Resolved"

# Request model for updating a grievance
class GrievanceUpdate(BaseModel):
    status: GrievanceStatus