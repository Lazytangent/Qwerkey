from flask import Blueprint, request

search_routes = Blueprint("search", __name__)


@search_routes.route('')
def search_function():
    pass


@search_routes.route('/')
def search_function_filter():
    pass
