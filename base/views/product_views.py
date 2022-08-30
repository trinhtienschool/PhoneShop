from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models.functions import ExtractYear, ExtractMonth, ExtractWeek, ExtractDay
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from base.ml.load_glove_pretrain import GlovePretrain
from base.ml.lstm_model import LSTMClassifier
from base.ml.preprocessing import Preprocessing
from base.models import Product, Review
from base.serializers import ProductSerializer
from django.db.models import Count

from django.conf import settings
from django.core.mail import send_mail


@api_view(['GET'])
def getProducts(request):
    """`/api/products?
    page=${pageNumber}
    &seller=${seller}
    &keyword=${name}
    &category=${category}
    &min=${min}
    &max=${max}
    &rating=${rating}
    &order=${order}`"""
    query = request.query_params.get('keyword')
    if query == None or query == 'all':
        query = ''

    category = request.query_params.get('category')
    if category == None:
        category = ''

    min = request.query_params.get('min')
    if min == None:
        min = 0
    max = request.query_params.get('max')
    if max == None:
        max = 1000000
    rating = request.query_params.get('rating')
    if rating == None:
        rating = ""

    order = request.query_params.get('order')
    if order == None:
        order = '-createdAt'

    products = Product.objects \
        .filter(name__icontains=query) \
        .filter(category__icontains=category) \
        .filter(price__gte=min) \
        .filter(price__lte=max) \
        .filter(rating__icontains=rating) \
        .order_by(order)

    page = request.query_params.get('page')
    paginator = Paginator(products, 9)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None or page == '':
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getAllProducts(request):
    products = Product.objects.all().order_by('-_id')

    page = request.query_params.get('page')

    print(page)

    paginator = Paginator(products, 10)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None or page == '' or page == 'undefined':
        page = 1

    page = int(page)
    print('Page:', page)
    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages})


@api_view(['GET'])
def getTopProducts(request):
    products = Product.objects.filter(rating__gte=4).order_by('-rating')[0:5]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCategories(request):
    categories = list(Product.objects.all().values('category').annotate(total=Count('category')).order_by('total'))
    return JsonResponse(categories, safe=False)


@api_view(['GET'])
def getRandomProduct(request):
    query = request.query_params.get('num-product')
    query = int(query)
    products = Product.objects.order_by('-createdAt')[0:query]
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getProductIdName(request):
    products = Product.objects.all().values('_id', 'name').order_by('name')
    return JsonResponse(list(products), safe=False)


@api_view(['POST'])
def getSentiment(request):
    text = request.data['text']
    print(text)
    lstm_classifier = LSTMClassifier()
    return JsonResponse({'sentiment': int(lstm_classifier.predict(text))}, safe=False)


@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='Sample Name',
        price=0,
        brand='Sample Brand',
        countInStock=0,
        category='Sample Category',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Producted Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


glove_pretrain = GlovePretrain()

@api_view(['GET'])
def getMostSimilarWords(request):
    number = request.query_params.get('number')
    if number == None or number == '':
        number = 100

    expression = request.query_params.get('expression')
    if expression == None or expression == '':
        expression = 'phone'
    # words = get_similar_words(expression, number)
    similar_words = glove_pretrain.getSimilar(expression, number)

    # arr = [
    #     {
    #         'text': 'told',
    #         'value': 15,
    #     },
    #     {
    #         'text': 'mistake',
    #         'value': 1521,
    #     },
    #     {
    #         'text': 'thought',
    #         'value': 1566,
    #     },
    #     {
    #         'text': 'told',
    #         'value': 15,
    #     },
    #     {
    #         'text': 'mistake',
    #         'value': 1521,
    #     },
    #     {
    #         'text': 'thought',
    #         'value': 1566,
    #     },
    # ]

    return JsonResponse(similar_words, safe=False)


@api_view(['GET'])
def getSentimentsCircle(request):
    category = request.query_params.get('category')
    if category == None or category == '':
        category = ''

    product_id = request.query_params.get('product_id')
    if product_id == None or product_id == '':
        product_id = ''

    from_date = request.query_params.get('from_date')
    if from_date == None:
        from_date = '2017-01-01'

    to_date = request.query_params.get('to_date')
    if to_date == None:
        to_date = '2022-12-31'

    sentiments = Review.objects.select_related('product').values('sentiment') \
        .filter(product__category__icontains=category) \
        .filter(createdAt__gte=from_date) \
        .filter(createdAt__lte=to_date) \
        .annotate(total=Count('sentiment')).order_by('sentiment')

    print(sentiments.query)
    if product_id != '':
        sentiments = sentiments.filter(product___id=product_id).order_by('sentiment')
    return JsonResponse(list(sentiments), safe=False)


@api_view(['GET'])
def getSentimentsHorizontalBarChart(request):
    category = request.query_params.get('category')
    if category == None:
        category = ''

    product_id = request.query_params.get('product_id')
    if product_id == None:
        product_id = ''

    sentiment_type = request.query_params.get('sentiment_type')
    if sentiment_type == None:
        sentiment_type = 2

    from_date = request.query_params.get('from_date')
    if from_date == None:
        from_date = '2017-01-01'

    to_date = request.query_params.get('to_date')
    if to_date == None:
        to_date = '2022-12-31'

    sentiments = Review.objects.select_related('product').values('sentiment', 'rating') \
        .filter(product__category__icontains=category) \
        .filter(createdAt__gte=from_date) \
        .filter(createdAt__lte=to_date) \
        .annotate(total=Count('rating')).order_by('sentiment')
    if product_id != '':
        sentiments = sentiments.filter(product___id=product_id).order_by('sentiment')
    return JsonResponse(list(sentiments), safe=False)


@api_view(['GET'])
def getSentimentsLine(request):
    category = request.query_params.get('category')
    if category == None:
        category = ''

    product_id = request.query_params.get('product_id')
    if product_id == None:
        product_id = ''

    from_date = request.query_params.get('from_date')
    if from_date == None:
        from_date = '2017-01-01'

    to_date = request.query_params.get('to_date')
    if to_date == None:
        to_date = '2022-12-31'

    filter_type_date = request.query_params.get('filter_type_date')
    if filter_type_date == None:
        filter_type_date = 'year'
    if filter_type_date == 'year' or filter_type_date == 'month':
        sentiments = Review.objects.select_related('product').values('sentiment') \
            .filter(product__category__icontains=category) \
            .filter(createdAt__gte=from_date) \
            .filter(createdAt__lte=to_date) \
            .annotate(total=Count('sentiment'))
        if product_id != '':
            sentiments = sentiments.filter(product___id=product_id)
        if filter_type_date == 'year' or filter_type_date == '':
            sentiments = sentiments.annotate(year=ExtractYear('createdAt')).order_by('year')
        elif filter_type_date == 'month':
            sentiments = sentiments.annotate(year=ExtractYear('createdAt'), month=ExtractMonth('createdAt')).order_by(
                'year').order_by('month')
    elif filter_type_date == 'day':
        sentiments = Review.objects.select_related('product').values('createdAt', 'sentiment') \
            .filter(product__category__icontains=category) \
            .filter(createdAt__gte=from_date) \
            .filter(createdAt__lte=to_date) \
            .annotate(total=Count('sentiment'))
        if product_id != '':
            sentiments = sentiments.filter(product___id=product_id).order_by('createdAt')
        sentiments = sentiments.order_by('createdAt')
    return JsonResponse(list(sentiments), safe=False)


lstm_classifier = LSTMClassifier()
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):


    user = request.user
    print('user: ',user)
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    # alreadyExists = product.review_set.filter(user=user).exists()
    # if alreadyExists:
    #     content = {'detail': 'Product already reviewed'}
    #     return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    if data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        if(data['comment'] != ''):
            percents, sentiment = lstm_classifier.predict(str(data['comment']))
        else:
            percents, sentiment = [0,100,0], 1
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
            sentiment=int(sentiment),
            negative=float(percents[0]),
            neutral=float(percents[1]),
            positive=float(percents[2])
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')
