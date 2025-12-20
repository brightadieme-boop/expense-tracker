from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from database import Base, engine, SessionLocal
from models import User, Expense
from schemas import UserCreate, UserResponse, UserLogin, ExpenseCreate
from utils import hash_password, verify_password
from auth import create_access_token
from deps import get_current_user

app = FastAPI()


origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



#Create database tables
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/register", response_model=UserResponse)
def register(user: UserCreate, db: Session = Depends(get_db)):

    #1. Check if email already exists
    existing_user = db.query(User).filter(User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already exists")
    
    
    print("RAW user object:", user)
    print("PASSWORD RECEIVED:", user.password)
    print("TYPE:", type(user.password))
    
    
    #2. Hash password
    hashed_pw = hash_password(user.password)
    
    #3. Create user model
    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hashed_pw
    )

    

    #4. Save to database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user




#Login
@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    #1. Find user by email
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credential please double check")
    
    #2. Check password
    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, details="Invalid credential please double check")
    
    #3. Create JWT token containing user_id
    access_token = create_access_token({"user_id": db_user.id})

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "full_name": db_user.full_name,
            "email": db_user.email,
        }
    }


@app.post("/expenses")
def create_expense(
    expense: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    
    new_expense = Expense(
        description=expense.description,
        amount=expense.amount,
        category=expense.category,
        date=expense.date,
        user_id=current_user.id #this is the magic link
    )

    db.add(new_expense)
    db.commit()
    db.refresh(new_expense)

    return {
        "message": "Your expense added!",
        "expense": {
            "id": new_expense.id,
            "user_id": new_expense.user_id,
            "description": new_expense.description,
            "amount": new_expense.amount,
            "category": new_expense.category,
            "date": new_expense.date
        }
    }

@app.get("/my-expenses")
def get_expenses(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    expenses = db.query(Expense).filter(Expense.user_id == current_user.id).all()

    return {
        "count": len(expenses),
        "expenses": expenses
    }



@app.get("/my-expenses/{expense_id}")
def get_single_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == current_user.id
    ).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found")
    return {"expense": expense}


@app.put("/my-expenses/{expense_id}")
def update_expense(
    expense_id: int,
    updated_data: ExpenseCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == current_user.id
    ).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found or not yours!")
    
    expense.description = updated_data.description
    expense.amount = updated_data.amount
    expense.category = updated_data.category

    db.commit()
    db.refresh(expense)

    return {
        "message": "Your expense just updated!",
        "expense": expense
    }



@app.delete("/my-expenses/{expense_id}")
def delete_expense(
    expense_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    expense = db.query(Expense).filter(
        Expense.id == expense_id,
        Expense.user_id == current_user.id
    ).first()

    if not expense:
        raise HTTPException(status_code=404, detail="Expense not found or not yours!")
    

    db.delete(expense)
    db.commit()

    return {"message": "You just deleted an Expense!" }