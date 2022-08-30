# file backend/server/apps/ml/income_classifier/random_forest.py

import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
from nltk import word_tokenize

from tensorflow import keras

from keras_preprocessing.sequence import pad_sequences

import pickle

from base.ml.preprocessing import Preprocessing
import os
from gensim.models.keyedvectors import KeyedVectors


class GlovePretrain:
    def __init__(self):
        self.glove_model = KeyedVectors.load_word2vec_format("base/ml/Glove_pre_trained_gensim_300d.txt",
                                                        binary=False)

    def tokenize_doc(self, text):
        return word_tokenize(text)

    def tokenizeExpression(self, expression):
        positive = []
        negative = []
        tokens = self.tokenize_doc(expression)
        isPositive = False if (tokens[0].startswith('-') or tokens[0] == '-') else True
        for index in range(len(tokens)):
            word = tokens[index]
            if isPositive:
                if word == '+':
                    continue
                elif word.startswith('+'):
                    word = word[1:]
                positive.append(word)
            else:
                if word == '-':
                    continue
                elif word.startswith('-'):
                    word = word[1:]
                negative.append(word)

            if (index + 1 < len(tokens)):
                nextword = tokens[index + 1]
                isPositive = False if (nextword.startswith('-') or nextword == '-') else True
            else:
                break

        return positive, negative


    def getSimilar(self, expression,number):
        positive, negative = self.tokenizeExpression(expression)
        print('positive: ',positive)
        print('negative: ',negative)
        print('negative: ',number)
        result = self.glove_model.most_similar(positive=positive, negative=negative,topn=int(number))
        similar = []
        for token in result:
            similar.append({'text': token[0], 'value': token[1]})
        return similar