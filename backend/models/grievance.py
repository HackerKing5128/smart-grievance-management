# backend/models/grievance.py
from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base

class Grievance(Base):
    __tablename__ = "grievances"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    complaint = Column(Text, nullable=False)
    status = Column(String(20), default="Pending")
    submitted_at = Column(DateTime, default=datetime.utcnow)