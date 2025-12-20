from datetime import datetime, timedelta
from jose import jwt

SECRET_KEY = "MY_SUPER_SECRET_KEY_CHANGE_THIS"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 20 #user stay logged in for 20 minutes

def create_access_token(data: dict):
    """
    Make a JWT token containing user data + expiration time.
    """

    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)

    to_encode.update({"exp": expire})

    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token
