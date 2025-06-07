from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# later add this to env file
DATABASE_URL = "postgresql://admin:t7w4pJqbfUcmHue8JhH37zQLAb9Wz4Zg@dpg-d10u5u49c44c73e35qs0-a.singapore-postgres.render.com/grievance_db_ldrx"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()