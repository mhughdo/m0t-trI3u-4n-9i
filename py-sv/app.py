import os
from cosine_similarity import CosineSilimarity
from dataset import Dataset
from flask import Flask,request
from config import *
import json
import pandas as pd
from knn import KNN
app = Flask(__name__)
dataset = Dataset(DATASET_PATH)
k_neighbors = KNN(dataset)
#cosine = CosineSilimarity(dataset)

@app.route('/')
def hello_world():
    return 'Hello World'

"""
@app.route('/user',methods=['POST','GET'])
def get_similiraty_user():
    user_requirement = request.get_json()
    for key,value in user_requirement.items():
        user_requirement[key] = [value]
    json_file = json.dumps(user_requirement)
    user_similarity_json = cosine.calc_cosinesimilarity(json_file)
    return user_similarity_json
"""

@app.route('/user',methods=['POST','GET'])
def get_similiraty_user():
    user_requirement = request.get_json()
    for key,value in user_requirement.items():
        user_requirement[key] = [value]
    json_file = json.dumps(user_requirement)
    user_similarity_json = k_neighbors.K_nearestNeighbors(json_file)
    return user_similarity_json

@app.route('/add',methods=['POST','GET'])
def add_user():
    user_profile = request.get_json()
    dataset.add_user_profile(user_profile)
    return 'Done'

if __name__ == '__main__':
   app.run(port=6000)