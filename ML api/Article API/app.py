from flask import Flask, render_template, jsonify
# from newsapi import NewsApiClient
from newsapi.newsapi_client import NewsApiClient
from bs4 import BeautifulSoup
import requests
import random
import lxml

app = Flask(__name__)

newsapi = NewsApiClient(api_key='f92ab52775a4452fbf21b768de65c9fc')


@app.route('/', methods=['GET'])
def home():
    return '''<h1>Articles</h1>'''


@app.route('/WomenHealth', methods=['GET'])
def women_health():
    all_articles = newsapi.get_everything(
        q='Women Health',
        language='en',
    )
    length = len(all_articles['articles'])
    r1 = random.randint(0, length - 1)
    article = all_articles['articles'][r1]
    sourceart = article['source']['name']
    title = article['title']
    link = article['url']
    imglink = article['urlToImage']

    source = requests.get(link).text
    soup = BeautifulSoup(source, 'lxml')
    blacklist = ['p']
    text_elements = [t for t in soup.find_all(text=True) if t.parent.name in blacklist]
    x = ""
    for i in text_elements:
        x = x + i + " \n\n "

    return jsonify({'title': title,
                    'Content': x,
                    'source': sourceart,
                    'imglink': imglink})
    # render_template('index.html', source='{}'.format(source), title='{}'.format(title), Content='{}'.format(x))


@app.route('/MenstrualHealth', methods=['GET'])
def menstrual_health():
    all_articles = newsapi.get_everything(
        q='Menstrual Health',
        language='en',
    )
    length = len(all_articles['articles'])
    r1 = random.randint(0, length - 1)
    article = all_articles['articles'][r1]
    sourceart = article['source']['name']
    title = article['title']
    link = article['url']
    imglink = article['urlToImage']

    source = requests.get(link).text
    soup = BeautifulSoup(source, 'lxml')
    blacklist = ['p']
    text_elements = [t for t in soup.find_all(text=True) if t.parent.name in blacklist]
    x = ""
    for i in text_elements:
        x = x + i + " \n\n "

    return jsonify({'title': title,
                    'Content': x,
                    'source': sourceart,
                    'imglink': imglink})
    # render_template('index.html', source='{}'.format(source), title='{}'.format(title), Content='{}'.format(x))


@app.route('/Gynaecology', methods=['GET'])
def gynaecology():
    all_articles = newsapi.get_everything(
        q='Gynaecology',
        language='en',
    )
    length = len(all_articles['articles'])
    r1 = random.randint(0, length - 1)
    article = all_articles['articles'][r1]
    sourceart = article['source']['name']
    title = article['title']
    link = article['url']
    imglink = article['urlToImage']

    source = requests.get(link).text
    soup = BeautifulSoup(source, 'lxml')
    blacklist = ['p']
    text_elements = [t for t in soup.find_all(text=True) if t.parent.name in blacklist]
    x = ""
    for i in text_elements:
        x = x + i + " \n\n "

    return jsonify({'title': title,
                    'Content': x,
                    'source': sourceart,
                    'imglink': imglink})
    # render_template('index.html', source='{}'.format(source), title='{}'.format(title), Content='{}'.format(x))


@app.route('/SustainableMenstruation', methods=['GET'])
def sustainablemenstruation():
    all_articles = newsapi.get_everything(
        q='Sustainable Menstruation',
        language='en',
    )
    length = len(all_articles['articles'])
    r1 = random.randint(0, length - 1)
    article = all_articles['articles'][r1]
    sourceart = article['source']['name']
    title = article['title']
    link = article['url']
    imglink = article['urlToImage']

    source = requests.get(link).text
    soup = BeautifulSoup(source, 'lxml')
    blacklist = ['p']
    text_elements = [t for t in soup.find_all(text=True) if t.parent.name in blacklist]
    x = ""
    for i in text_elements:
        x = x + i + " \n\n "

    return jsonify({'title': title,
                    'Content': x,
                    'source': sourceart,
                    'imglink': imglink})
    # render_template('index.html', source='{}'.format(source), title='{}'.format(title), Content='{}'.format(x))


if __name__ == "__main__":
    app.run(debug=True, use_reloader=False)
    # app.listen(process.env.PORT)
