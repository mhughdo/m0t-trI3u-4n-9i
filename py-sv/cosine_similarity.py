import os
from dataset import Dataset
from sklearn.metrics.pairwise import cosine_similarity
import json
import pandas as pd
import numpy as np
from config import *
from operator import itemgetter
from scipy.spatial.distance import cosine
class CosineSilimarity:
    
    def __init__(self,dataset):
        self.dataset = dataset
    
    def convert_json_to_dataframe(self,json_file):
        
        profile_dictionary = json.loads(json_file)

        profile_dataframe = pd.DataFrame.from_dict(profile_dictionary)

        return profile_dataframe

    def calc_cosinesimilarity(self,user_profile):
        user_profile_dataframe = self.convert_json_to_dataframe(user_profile)
        preprocessed_user_profile = self.dataset.preprocess_data(user_profile_dataframe)
        list_score = []
        for i in range(len(self.dataset.dataset_to_onehot.index)):
            info = {}
            cosine_score =cosine(preprocessed_user_profile.values,self.dataset.dataset_to_onehot.iloc[i].values)
            info['score'] = cosine_score
            info['profile'] = self.dataset.dataset.iloc[i].to_dict()
            list_score.append(info)
        list_score = sorted(list_score,key=itemgetter('score'))

        list_score = list_score[:20]
        for item in list_score:
            for key,value in item['profile'].items():
                item['profile'][key] = str(value)

        return json.dumps(list_score)
        
if __name__ == "__main__":
    
    profile_test = {
        'index':[1000],
        'Age':['25-30'],
        'Height':[170.0],
        'Job':['seller'],
        'Longtitude':[1263526.9999999998],
        'Latitude':[1005673.0000000015],
        'Sports':['tennis'],
        'Sex':['Male'],
        'Name':['Do Manh Hung']
    }

    json_file = json.dumps(profile_test)

    dataset = Dataset(data_path=DATASET_PATH)

    Cos = CosineSilimarity(dataset)

    cosine_score,test = Cos.calc_cosinesimilarity(json_file)

    print(test)


    