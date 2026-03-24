from django.urls import path
from . import views

urlpatterns = [
    # Change 'api/projects/' to 'api/portfolio-data/'
    path('api/portfolio-data/', views.portfolio_data, name='portfolio_data'),
    path('api/contact/', views.submit_contact, name='submit_contact'),

]