# file backend/server/apps/ml/income_classifier/random_forest.py
# Import Module
import os
import re
import pandas as pd

import contractions
import nltk
from bs4 import BeautifulSoup
from nltk.corpus import stopwords
from nltk.stem import LancasterStemmer, WordNetLemmatizer
# Lemmatize with POS Tag
from nltk.corpus import wordnet
from nltk.tokenize import word_tokenize
# spellchecker
# from spellchecker import SpellChecker
from autocorrect import Speller
from tqdm import tqdm
from collections import Counter

import emoji
from emoticon_fix import emoticon_fix

nltk.download('punkt')
nltk.download('omw-1.4')
nltk.download('wordnet')
nltk.download('stopwords')
nltk.download('averaged_perceptron_tagger')
tqdm.pandas()


class Preprocessing:
    def __init__(self):
        self.spell = Speller(fast=True)
        self.punctuations = [token for token in '?!.,"#$%\'()*+-/:;<=>@[\\]^_`{|}~“”’‘&']
        self.punctuations.extend(
            ['...', '``', '--', '—', '——', '•', '«', '……', '––', '—-', '°', '¬', '·', '▪', '–-', '—', '−', '―', '›',
             '-',
             '..', '»', '+', '*', '‹', '♦', '₪', '%N%', '%$%', '%^%', '「', '」', '『', '』', '〈', '〉', '》', '《', '¿'])

        stop_words = stopwords.words('english')
        # get all negative words from stopwords
        negative_words = []
        for word in stop_words:
            if word.endswith("n't"):
                negative_words.append(word)
                negative_words.append(word[:-2])
        negative_words.extend(["not", 'ain', 'no', 'nor'])

        # remove all negative words from stopwords
        stop_words = [word for word in stop_words if word not in negative_words]
        model_words = ['can', 'could', 'may', 'might', 'will', 'would', 'must', 'shall', 'should', 'have', 'has', 'had',
                       'maybe']
        # filter word pauses
        # 'okay','hi',
        filter_word_pauses = ['um', 'uhm', 'um-hum', 'uh', 'yeah', 'uh-huh', 'oh', 'huh', 'uh-huh']
        stop_words.extend(filter_word_pauses)
        stop_words.extend(model_words)

        self.stop_words_dict = Counter(stop_words)
        # path_to_artifacts = "../research/"
        # self.values_fill_missing =  joblib.load(path_to_artifacts + "train_mode.joblib")
        # self.encoders = joblib.load(path_to_artifacts + "encoders.joblib")
        # self.model = joblib.load(path_to_artifacts + "random_forest.joblib")

    # remove all web associated
    # to remove HTML tag
    def html_remover(self, text):
        beauti = BeautifulSoup(text, 'html.parser')
        return beauti.get_text()

    def web_associated(self, text):
        text = str(text)
        text = self.html_remover(text)
        text = re.sub(r'(www\S+ ?)|(\w+\.com)|(http\S+)', '', text)
        return text

    def remove_noise(self, text):
        return re.sub(r'(\'s|s\'|’s|s’|\(|\)|\[|\]|\{|\"|\'|\“|\’|\”|\‘|(\'.*))|\`|\—', '', text)

    def noise_preprocessing(self, text):
        text = contractions.fix(text)
        text = self.remove_noise(text)
        text = emoticon_fix.emoticon_fix(text)
        text = emoji.demojize(text).replace("_", " ").replace(':', ' ')
        text = re.sub(r'(.)\1+', r'\1\1', text)
        # text = correct_spellings(text)
        text = self.spell(text)
        text = text.lower()
        return text

    def tokenize_doc(self, text):
        return word_tokenize(text)

    def remove_punc(self, tokens):
        return [token for token in tokens if token not in self.punctuations and token.isascii()]

    def remove_one_character(self, tokens):
        return [token for token in tokens if len(token) > 1]

    # clean stopwords
    def stopword(self, tokens):
        return [token for token in tokens if token not in self.stop_words_dict]

    def concate_text(self, tokens):
        return " ".join(tokens)

    def normalization_preprocessing(self,data):
        tokens = self.tokenize_doc(data)
        tokens = self.remove_punc(tokens)
        tokens = self.remove_one_character(tokens)
        tokens = self.stopword(tokens)
        # tokens = lemmatization(tokens)
        return tokens

    def preprocessing_doc(self, doc):
        doc = self.web_associated(doc)
        doc = self.noise_preprocessing(doc)
        tokens = self.normalization_preprocessing(doc)
        return self.concate_text(tokens)


