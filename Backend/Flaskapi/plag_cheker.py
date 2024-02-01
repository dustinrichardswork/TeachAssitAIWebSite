#!/usr/bin/env python3
import requests
import time
from googlesearch import search
from difflib import SequenceMatcher
from bs4 import BeautifulSoup
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import string
import re

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

# Function to calculate similarity using difflib
def similarity_difflib(query, text):
    return SequenceMatcher(None, query, text).ratio()

# Function to calculate similarity using cosine simiilarity
def calculate_similarity(query, text):
    query = re.sub("[^\w]", " ", query.lower())
    text = re.sub("[^\w]", " ", text.lower())
    vectorizer = TfidfVectorizer()
    vectors = vectorizer.fit_transform([query, text])
    similarity = cosine_similarity(vectors[0], vectors[1])[0][0]
    return similarity


def get_links(query):
    """
    query: string
    Searches Google for query,
    and returns the link to the first result
    """
    url = list(search(query, tld="co.in", num=3, stop=3, pause=2))
    #print(f"chunk/chunk: {query} \n url: {url}")
    res = None
    if url != []:
        res = url
    return res

def google_search_serper(query):
    url = "https://google.serper.dev/search"
    headers = {
        "X-API-KEY": "d306152118b8691fd722576412d441e0129104aa",
        "Content-Type": "application/json",
    }
    params = {"q": query}
    response = requests.post(url, headers=headers, params=params)
    response.raise_for_status()
    
    search_results = response.json()
    links = [result['link'] for result in search_results['organic']]
    return links[:3]


# Function to split text into chunks
def split_chunks(text, chunk_size):
    chunks = []
    words = text.split()
    for i in range(0, len(words), chunk_size):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)
    return chunks

# Function to clean HTML using BeautifulSoup
def clean_html_with_bs(html):
    soup = BeautifulSoup(html.text, 'html.parser')
    #main_content = soup.find('main')
    for script in soup(["script", "style"]):
        script.extract()
    #if main_content:
    #    clean_text = main_content.get_text()
    else:
        clean_text = soup.get_text()
    # break into lines and remove leading and trailing space on each
    lines = (line.strip() for line in clean_text.splitlines())
    # break multi-headlines into a line each
    chunks = (phrase.strip() for line in lines for phrase in line.split("  "))
    # drop blank lines
    page_text = '\n'.join(chunk for chunk in chunks if chunk)
    return page_text

# Function to retrieve web page content using requests library
def retrieve_page_content(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response
    else:
        print(f"Unable to retrieve content from {url}. Error: {response.status_code}")
        return None

def preprocess_text(text):
    # Tokenize the text into words
    tokens = word_tokenize(text)
    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word.lower() not in stop_words]
    # Remove punctuation
    tokens = [word for word in tokens if word not in string.punctuation]
    # Convert words to lowercase
    tokens = [word.lower() for word in tokens]
    # Join the tokens back into a single string
    preprocessed_text = ' '.join(tokens)
    return preprocessed_text

# Function to check similarity of chunks and return average similarity and plagiarized URLs
def plagiarism_checker(text, chunk_size=100, similarity_metric="cosine", similarity_threshold=0.3):
    plagiarized_chunks = []
    total_similarity = 0
    num_chunks = 0
    plagiarized_urls = []
    text = preprocess_text(text)
    if len(text) < chunk_size:
        chunk_size = len(text)
    chunks = split_chunks(text, chunk_size)
    #chunks = text.split(".")
    #print(f"chunks: {chunks}\n")
    for chunk in chunks:
        urls = google_search_serper(chunk)
        #print(f"urls: {urls}")
        if urls:
            for url in urls:
                content = retrieve_page_content(url)
                if content:
                    cleaned_content = clean_html_with_bs(content)
                    cleaned_content = preprocess_text(cleaned_content)
                    #print(f"url: {url} \n content: {cleaned_content}\n")
                    matched_content = cleaned_content
                    matched_content_chunks = split_chunks(matched_content, (len(text)))
                    for chunkr in matched_content_chunks:
                        # Calculate the similarity using the specified similarity metric
                        if similarity_metric == "difflib":
                            similarity = similarity_difflib(text, chunkr)
                            #print(f"similarity: {similarity}")
                        elif similarity_metric == "cosine":
                            similarity = calculate_similarity(text, chunkr)
                            #print(f"similarity: {similarity}")
                        else:
                            raise ValueError("Unsupported similarity metric")
                        # Only consider URLs with similarity higher than the threshold
                        if similarity > similarity_threshold:
                            total_similarity += similarity
                            num_chunks += 1
                            plagiarized_urls.append((url, similarity))
                            plagiarized_chunks.append((chunk))

    if num_chunks > 0:
        average_similarity = total_similarity / num_chunks
        return int(average_similarity * 100), plagiarized_urls , plagiarized_chunks
    else:
        return 0, plagiarized_urls, plagiarized_chunks


def get_plag_report(text):
    average_similarity, plagiarized_urls, plagiarized_chunks = plagiarism_checker(text)
    report = f"Average similarity: {average_similarity} %. \n"

    if plagiarized_urls:
        report += "Plagiarism occurred in the following URLs: \n"
        for url, similarity in plagiarized_urls:
            sim = int(similarity * 100)
            report += f"    -URL: {url}\n   - Similarity: {sim} %\n"
        report += "Plagiarism occurred in the following sections:\n"
        for chunk in plagiarized_chunks:
            report += f"    -section: {chunk}\n"
    else:
        report = "No plagiarism detected."
    return report, average_similarity

# Example usage
#text = """Unlike supervised learning, we don’t tell the agent whether an action is good or bad. For example, in a Tic-Tac-Toe game, the agent first randomly select a place in the 3 x 3 grid. It might place a mark on the corner, which is usually a bad move, however, you can’t tell the result because the game is not over yet. What we do here is continue the process and feedback the result to the previous state. After several training episodes, it select the best action based on past experience, and when it comes to the initial state, it would mark the middle because the winning percentage should be higher there."""
#report, _ = get_plag_report(text)
#print(report)