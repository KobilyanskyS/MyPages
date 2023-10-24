from fastapi import FastAPI, Body
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import json

filename = "data.json"

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/data.json")
async def get_data():
    file_path = f"./{filename}"
    return FileResponse(filename)

@app.post("/postdata")
async def post_data(data = Body()):
    date = {"date": data["date"]}
    with open(filename,'r+') as file:
        file_data = json.load(file)
        file_data.append(date)
        file.seek(0)
        json.dump(file_data, file, indent = 4)
