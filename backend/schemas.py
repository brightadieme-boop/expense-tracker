from pydantic import BaseModel, EmailStr

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str



class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr

    class Config:
        orm_mode = True




class UserLogin(BaseModel):
    email: EmailStr
    password: str


class ExpenseCreate(BaseModel):
    description: str
    amount: float
    category: str
    date: str