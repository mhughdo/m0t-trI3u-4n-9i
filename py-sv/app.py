import os
from cosine_similarity import CosineSilimarity
from dataset import Dataset
from flask import Flask,request
from config import *
import json
import pandas as pd

dataset = Dataset(DATASET_PATH)
cosine = CosineSilimarity(dataset)
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World'

@app.route('/user',methods=['POST','GET'])
def get_similiraty_user():
    user_requirement = request.get_json()
    for key,value in user_requirement.items():
        user_requirement[key] = [value]
    json_file = json.dumps(user_requirement)
    cosine_score,user_similarity_json = cosine.calc_cosinesimilarity(json_file)
    return user_similarity_json
    
if __name__ == '__main__':
   app.run()