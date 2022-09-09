from django.urls import path
from base.views import product_views as views

urlpatterns = [

    path('', views.getProducts, name="products"),
    path('all/', views.getAllProducts, name="products-all"),
    path('get-word-cloud/', views.getMostSimilarWords, name="word-cloud"),
    path('get-sentiment-circle/', views.getSentimentsCircle, name="sentiment-circle"),
    path('get-sentiment-line/', views.getSentimentsLine, name="sentiment-line"),
    path('get-sentiment-horizontal-bar-chart/', views.getSentimentsHorizontalBarChart, name="sentiment-horizontal-bar-chart"),
    # path('get-sentiment-circle-category/', views.getSentimentsCircleCategory, name="sentiment-circle-category"),
    path('create/', views.createProduct, name="product-create"),
    path('upload/', views.uploadImage, name="image-upload"),
    path('sentiment/', views.getSentiment, name="sentiment"),
    path('<str:pk>/reviews/', views.createProductReview, name="create-review"),
    path('top/', views.getTopProducts, name='top-products'),
    path('categories/', views.getCategories, name='category-list'),
    path('random-products/', views.getRandomProduct, name='random-products'),
    path('reviews/', views.getReviews, name='get-reviews'),
    path('update-sentiment-review/<str:pk>/', views.updateSentiment, name='update-sentiment-review'),
    path('get-review-management',views.getReviewManagement,name='get-review-management'),
    path('products-id-name/', views.getProductIdName, name='products-id-name'),
    path('<str:pk>/', views.getProduct, name="product"),

    path('update/<str:pk>/', views.updateProduct, name="product-update"),
    path('delete/<str:pk>/', views.deleteProduct, name="product-delete"),


]
