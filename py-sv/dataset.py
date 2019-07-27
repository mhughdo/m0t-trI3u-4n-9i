import os
import pandas as pd
from sklearn.preprocessing import LabelEncoder,OneHotEncoder,MinMaxScaler
from config import *
import numpy as np
class Dataset:
    
    def __init__(self,data_path):
        self.data_path = data_path
        self.load_dataset()
        
    def load_dataset(self):
        if not os.path.exists(self.data_path):
            raise Exception('File Not Found')
        self.dataset = pd.read_csv(self.data_path)
        self.dataset_onehot = self.preprocess_data()

    def get_columns(self):
        self.columns = self.dataset.columns
        return self.columns

    def get_num_examples(self):
        self.num_examples = len(self.dataset.index)
        return self.num_examples

    def preprocess_data(self,data=None):

        if data is not None:
            process_data = data[COLUMNS]
            
            print(process_data)

            process_data.Age = self.Age_label_encoder.transform(process_data.Age)
            process_data.Job = self.Job_label_encoder.transform(process_data.Job)
            process_data.Sports = self.Sports_label_encoder.transform(process_data.Sports)
            process_data.Sex = self.Sex_label_encoder.transform(process_data.Sex)


            one_hot_age = self.Age_onehot_encoder.transform(process_data.Age.values.reshape(-1,1))[:,1:]
            one_hot_job = self.Job_onehot_encoder.transform(process_data.Job.values.reshape(-1,1))[:,1:]
            one_hot_sports = self.Sports_onehot_encoder.transform(process_data.Sports.values.reshape(-1,1))[:,1:]
            one_hot_sex = self.Sex_onehot_encoder.transform(process_data.Sex.values.reshape(-1,1))[:,1:]

            scaler_height = self.minmax_scaler_height.transform(process_data.Height.values.reshape(-1,1))
            scaler_longtitude = self.minmax_scaler_longitude.transform(process_data.Longtitude.values.reshape(-1,1))
            scaler_Latitude = self.minmax_scaler_latitude.transform(process_data.Latitude.values.reshape(-1,1))
            arr = np.concatenate((scaler_height,scaler_longtitude,scaler_Latitude,one_hot_age,one_hot_job,one_hot_sports,one_hot_sex),axis=1)

            print(arr.shape)

            dataframe = pd.DataFrame(arr,columns=self.dataset_to_onehot.columns)

            return dataframe


        else:
            self.dataset_to_onehot = self.dataset[COLUMNS]

            self.Age_label_encoder = LabelEncoder()
            self.Job_label_encoder = LabelEncoder()
            self.Sports_label_encoder = LabelEncoder()
            self.Sex_label_encoder = LabelEncoder()
            self.minmax_scaler_height = MinMaxScaler()
            self.minmax_scaler_longitude = MinMaxScaler()
            self.minmax_scaler_latitude = MinMaxScaler()

            
            self.Age_onehot_encoder = OneHotEncoder(categorical_features=[0],sparse=False)
            self.Job_onehot_encoder = OneHotEncoder(categorical_features=[0],sparse=False)
            self.Sports_onehot_encoder = OneHotEncoder(categorical_features=[0],sparse=False)
            self.Sex_onehot_encoder = OneHotEncoder(categorical_features=[0],sparse=False)

            self.minmax_scaler_height.fit(self.dataset_to_onehot.Height.values.reshape(-1,1))
            self.minmax_scaler_longitude.fit(self.dataset_to_onehot.Longtitude.values.reshape(-1,1))
            self.minmax_scaler_latitude.fit(self.dataset_to_onehot.Latitude.values.reshape(-1,1))
            
            
            self.Age_label_encoder.fit(self.dataset_to_onehot.Age)
            self.Job_label_encoder.fit(self.dataset_to_onehot.Job)
            self.Sports_label_encoder.fit(self.dataset_to_onehot.Sports)
            self.Sex_label_encoder.fit(self.dataset_to_onehot.Sex)


            self.dataset_to_onehot.Age = self.Age_label_encoder.transform(self.dataset_to_onehot.Age)
            self.dataset_to_onehot.Job = self.Job_label_encoder.transform(self.dataset_to_onehot.Job)
            self.dataset_to_onehot.Sports = self.Sports_label_encoder.transform(self.dataset_to_onehot.Sports)
            self.dataset_to_onehot.Sex = self.Sex_label_encoder.transform(self.dataset_to_onehot.Sex)

            self.dataset_to_onehot.Height = self.minmax_scaler_height.transform(self.dataset_to_onehot.Height.values.reshape(-1,1))
            self.dataset_to_onehot.Longtitude= self.minmax_scaler_longitude.transform(self.dataset_to_onehot.Longtitude.values.reshape(-1,1))
            self.dataset_to_onehot.Latitude = self.minmax_scaler_latitude.transform(self.dataset_to_onehot.Latitude.values.reshape(-1,1))
            
            self.Age_onehot_encoder.fit(self.dataset_to_onehot.Age.values.reshape(-1,1))
            self.Job_onehot_encoder.fit(self.dataset_to_onehot.Job.values.reshape(-1,1))
            self.Sports_onehot_encoder.fit(self.dataset_to_onehot.Sports.values.reshape(-1,1))
            self.Sex_onehot_encoder.fit(self.dataset_to_onehot.Sex.values.reshape(-1,1))
            
            
            self.dataset_to_onehot = pd.get_dummies(self.dataset_to_onehot,columns=COLUMNS_TO_ONEHOT,drop_first=True)
            
            print('check here 2')

            print(self.dataset_to_onehot.head(6))

            return self.dataset_to_onehot


if __name__ =='__main__':
    dataset = Dataset('data/DataBase.csv')
    num_examples = dataset.get_num_examples()
    

    



        
