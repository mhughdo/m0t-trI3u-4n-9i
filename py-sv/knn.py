import os
from dataset import Dataset
from scipy.spatial.distance import euclidean
from cosine_similarity import CosineSilimarity
from config import *
import json
from operator import itemgetter
import numpy as np
class KNN(CosineSilimarity):
    def __init__(self,dataset):
        super(KNN,self).__init__(dataset)

    def euclidean_distance(self,x,y,alpha,beta):
        dictance = x - y
        dictance[0]*=0.00001
        dictance[1:3]*=1.2
        dictance[3:6]*=0.00001
        dictance[-1]*=0.0001
        dictance[6:-2]*=1000
        return np.sqrt(np.sum(np.square(dictance)))

    def K_nearestNeighbors(self,user_profile_json,k=20):
        list_score = self.calc_euclidean_distance(user_profile_json)
        for item in list_score:
            for key,value in item['profile'].items():
                item['profile'][key] = str(value)
        list_score = list_score[:k]
        return json.dumps(list_score)

    def calc_euclidean_distance(self,user_profile_json):
        user_profile_dataframe = self.convert_json_to_dataframe(user_profile_json)
        preprocessed_user_profile = self.dataset.preprocess_data(user_profile_dataframe)
        list_score = []
        for i in range(len(self.dataset.dataset_to_onehot.index)):
            info= {}
            euclidean_distance = self.euclidean_distance(preprocessed_user_profile.values.reshape(-1,1),self.dataset.dataset_to_onehot.iloc[i].values.reshape(-1,1),alpha=10,beta=0.01)
            info['score'] = euclidean_distance
            info['profile'] = self.dataset.dataset.iloc[i].to_dict()
            list_score.append(info)
        
        list_score = sorted(list_score,key=itemgetter('score'))
        return list_score

if __name__ == "__main__":
    
    dataset = Dataset(DATASET_PATH)
    knn = KNN(dataset)

    profile_test = {
        'index':[1000],
        'Age':['25-30'],
        'Height':[170.0],
        'Job':['seller'],
        'Latitude':[1244437.9999999988],
        'Longtitude':[794668.9999999991],
        'Sports':['volleyball'],
        'Sex':['Male'],
        'Name':['Do Manh Hung']
    }

    json_file = json.dumps(profile_test)

    dis = knn.K_nearestNeighbors(json_file,k=20)

    print(dis)
