from sqlalchemy import Column, Integer, String, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

#------------
#User model
#-------
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String(256), nullable=False)
    
    #User has many expenses
    expenses = relationship("Expense", back_populates="user")





#------------
# My Expense Model
#----------------------------
class Expense(Base):
    __tablename__ = "expenses"

    id =Column(Integer, primary_key=True, index=True)
    description = Column(String, nullable=False)
    amount = Column(Float, nullable=False)
    category = Column(String, nullable=False)
    date = Column(Date, default=datetime.utcnow)

    # Foriegn key-- each expense belongs to ONE user
    user_id = Column(Integer, ForeignKey("users.id"))
    
    #relationship to user
    user = relationship("User", back_populates="expenses")
    