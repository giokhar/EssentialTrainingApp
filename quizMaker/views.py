from django.shortcuts import render

# Create your views here.
def index(request):
	something = "Giorgi"
	return render(request, 'name.html', {"title":something})