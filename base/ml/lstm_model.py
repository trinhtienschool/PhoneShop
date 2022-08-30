# file backend/server/apps/ml/income_classifier/random_forest.py

import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

from tensorflow import keras

from keras_preprocessing.sequence import pad_sequences

import pickle

from base.ml.preprocessing import Preprocessing
import os


class LSTMClassifier:
    def __init__(self):


        # Start

        # Python program get current working directory using os.getcwd()

        # importing os module

        # Get the current directory path
        current_directory = os.getcwd()

        # Print the current working directory
        print("Current working directory:", current_directory)

        # End




        with open('base/ml/tokenizer.pickle', 'rb') as handle:
            self.tokenizer = pickle.load(handle)

        with open('base/ml/MAX_LEN.txt', 'r') as f:
            self.MAX_LEN = int(f.read())

        self.model = keras.models.load_model('base/ml/LSTM_Model.h5')

        self.preprocessing = Preprocessing()


    def predict(self,text):
        text = self.preprocessing.preprocessing_doc(text)
        twt = np.array([text])
        print("preprocessing text: " + str(twt[0]))
        # vectorizing the tweet by the pre-fitted tokenizer instance
        twt = self.tokenizer.texts_to_sequences(twt)
        # padding the tweet to have exactly the same shape as `embedding_2` input
        twt = pad_sequences(twt, maxlen=self.MAX_LEN, dtype='int32', value=0)

        sentiment = self.model.predict(twt, batch_size=1, verbose=2)[0]
        np.argmax(sentiment)
        if np.argmax(sentiment) == 0:
            print("negative")
        elif np.argmax(sentiment) == 1:
            print("neutral")
        elif np.argmax(sentiment) == 2:
            print("positive")

        total = sentiment[0] + sentiment[1] + sentiment[2]
        percents = [sentiment[0] * 100 / total, sentiment[1] * 100 / total, sentiment[2] * 100 / total]

        return percents, np.argmax(sentiment)