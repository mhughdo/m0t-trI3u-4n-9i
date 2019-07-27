import os
from dataset import Dataset
from sklearn.metrics.pairwise import cosine_similarity
import json
import pandas as pd
import numpy as np
from config import *
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
        ##print(preprocessed_user_profile.head())
        #print(self.dataset.dataset_to_onehot.head())
        list_score = []
        for i in range(len(self.dataset.dataset_to_onehot.index)):
            cosine_score =cosine(preprocessed_user_profile.values,self.dataset.dataset_to_onehot.iloc[i].values)
            list_score.append(cosine_score)
        list_score = np.array([list_score])
        #print(list_score)
        idx_min = np.argmin(list_score,axis=1)
        #print(list_score[0][idx_min])
        json_file = pd.DataFrame.to_json(self.dataset.dataset.iloc[idx_min],orient='records')
        return list_score[0][idx_min],json_file
        #print(idx_min)

if __name__ == "__main__":
    
    profile_test = {
        'index':[1000],
        'Age':['25-30'],
        'Height':[170.0],
        'Job':['seller'],
        'Longtitude':[983228.9999999944],
        'Latitude':[1293793.000000001],
        'Sports':['tennis'],
        'Sex':['Male'],
        'Name':['Do Manh Hung']
    }

    json_file = json.dumps(profile_test)

    dataset = Dataset(data_path=DATASET_PATH)

    Cos = CosineSilimarity(dataset)

    cosine_score,test = Cos.calc_cosinesimilarity(json_file)

    print(test)


    