# backend/schemas.py
from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, EmailStr

class GrievanceCreate(BaseModel):
    name: str
    email: EmailStr
    complaint: str


class GrievanceResponse(GrievanceCreate):
    id: int
    department: Optional[str] = None
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
    department: Optional[str] = None
    status: str
    submitted_at: datetime

    class Config:
        from_attributes = True

# Model for all possible grievance statuses
class GrievanceStatus(str, Enum):
    pending = "Pending"
    in_progress = "In Progress"
    resolved = "Resolved"

# Model for all possible departments
class Department(str, Enum):
    customer_support = "Customer Support"
    technical_support = "Technical Support"
    quality_assurance = "Quality Assurance (QA)"
    returns_and_refunds = "Returns, Refunds, and Warranty"
    shipping_logistics = "Shipping and Logistics"

# Request model for updating a grievance
class GrievanceUpdate(BaseModel):
    status: Optional[GrievanceStatus] = None
    department: Optional[Department] = None