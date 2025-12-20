import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

#PostgreSQL connection URL deployment
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://bright_user:mypassword@localhost/expense_tracker")

DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Create sqlalchemy Engine
engine = create_engine(DATABASE_URL, echo=True)

#Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for the model to inherit
Base = declarative_base()

# Dependency function for routes (FastAPI uses this)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()