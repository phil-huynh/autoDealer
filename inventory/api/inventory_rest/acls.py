import json
import requests
from .keys import CARS_XE_KEY

def get_photo(make, model):
    params = {
        "key": CARS_XE_KEY,
        "make": make,
        "model": model,
        "angle": "side"
    }
    url = "http://api.carsxe.com/images"
    response = requests.get(url, params=params)
    content = json.loads(response.content)
    try:
        return {"picture_url": content["images"][0]["thumbnailLink"]}
    except (KeyError, IndexError):
        return {"picture_url": None}