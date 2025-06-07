# backend/models/grievance.py
from datetime import datetime

from database import Base
from sqlalchemy import Column, DateTime, Integer, String, Text

class Grievance(Base):
    __tablename__ = "grievances"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    complaint = Column(Text, nullable=False)
    status = Column(String(20), default="Pending")
    submitted_at = Column(DateTime, default=datetime.utcnow)