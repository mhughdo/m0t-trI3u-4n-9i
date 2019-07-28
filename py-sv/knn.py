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
        print('in here')

    def euclidean_distance(self,x,y,alpha,beta):
        dictance = np.square(x-y)
        dictance[1:3]*=alpha
        dictance[-1]*=beta
        return np.sum(dictance)

    def calc_euclidean_distance(self,user_profile_json):
        user_profile_dataframe = self.convert_json_to_dataframe(user_profile_json)
        preprocessed_user_profile = self.dataset.preprocess_data(user_profile_dataframe)
        list_score = []
        for i in range(len(self.dataset.dataset_to_onehot.index)):
            info= {}
            euclidean_distance = self.euclidean_distance(preprocessed_user_profile.values.reshape(-1,1),self.dataset.dataset_to_onehot.iloc[i].values.reshape(-1,1),alpha=10,beta=0.01)
            info['score'] = euclidean_distance
            info['profile'] = self.dataset.dataset.iloc[i].values
            list_score.append(info)
        
        list_score = sorted(list_score,key=itemgetter('score'))
        print( list_score[:5])

if __name__ == "__main__":
    
    dataset = Dataset(DATASET_PATH)
    knn = KNN(dataset)

    profile_test = {
        'index':[1000],
        'Age':['25-30'],
        'Height':[170.0],
        'Job':['seller'],
        'Longtitude':[976037.0000000015],
        'Latitude':[769323.9999999973],
        'Sports':['football'],
        'Sex':['Male'],
        'Name':['Do Manh Hung']
    }

    json_file = json.dumps(profile_test)

    dis = knn.calc_euclidean_distance(json_file)
