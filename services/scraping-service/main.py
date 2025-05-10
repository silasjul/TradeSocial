from typing import List
from fastapi import FastAPI
from src.twitter import Twitter, Tweet

app = FastAPI()

@app.get("/twitter/scrape/{username}")
def scrape_user(username: str) -> List[Tweet]:
    tw = Twitter()
    data = tw.scrape_profile(username)
    tw.close()
    return data