from flask import Blueprint, jsonify, request

from app.config import Config
from app.forms import CreatePost, CreateComment
from app.helpers import (upload_file_to_s3, allowed_file,
                         validation_errors_to_error_messages,
                         get_unique_filename)
from app.models import db, Post, PostsImage, Community, Comment, Thread

post_routes = Blueprint('posts', __name__)


@post_routes.route('')
def get_paginated_posts():
    page = int(request.args.get('page', 0))
    community_name = request.args.get('community_name', '')
    if community_name:
        community = Community.query.filter(
            Community.name.ilike(community_name)).first()
        if community:
            posts = Post.query.filter(
                Post.community_id == community.id).paginate(page=page,
                                                            per_page=20)
        else:
            return {"errors": ["Invalid Community Name."]}
    else:
        posts = Post.query.paginate(page=page, per_page=20)
    return {post.id: post.to_dict() for post in posts.items}


@post_routes.route('/')
def get_posts():
    posts = Post.query.limit(20).all()
    return {post.id: post.to_dict() for post in posts}


@post_routes.route('/max')
def max_number_of_posts():
    number = Post.query.count()
    return {"max": number}


@post_routes.route('/max/<string:community_name>')
def max_number_of_posts_by_community(community_name):
    community = Community.query.filter(
        Community.name == community_name).first()
    number = Post.query.filter(Post.community_id == community.id).count()
    return {"max": number}


@post_routes.route('/', methods=["POST"])
def create_post():
    form = CreatePost()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        post = Post()
        form.populate_obj(post)
        db.session.add(post)
        db.session.commit()

        if 'images' in request.files:
            images = request.files.getlist('images')
            for image in images:
                if allowed_file(image.filename):
                    image.filename = get_unique_filename(image.filename)
                    image_url = upload_file_to_s3(image, Config.S3_BUCKET)
                    image = PostsImage(post_id=post.id, image_url=image_url)
                    db.session.add(image)
            db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@post_routes.route('/<int:post_id>', methods=["GET", "PUT", "DELETE"])
def post_by_id(post_id):
    post = Post.query.get(post_id)
    if request.method == "GET":
        return post.to_dict()
    elif request.method == "PUT":
        form = CreatePost()
        form['csrf_token'].data = request.cookies['csrf_token']
        if form.validate_on_submit():
            form.populate_obj(post)
            db.session.commit()

            if 'images' in request.files:
                images = request.files.getlist('images')
                for image in images:
                    if allowed_file(image.filename):
                        image.filename = get_unique_filename(image.filename)
                        image_url = upload_file_to_s3(image, Config.S3_BUCKET)
                        image = PostsImage(post_id=post.id,
                                           image_url=image_url)
                        db.session.add(image)
                db.session.commit()
            return post.to_dict()
        return {'errors': validation_errors_to_error_messages(form.errors)}
    elif request.method == "DELETE":
        post.title = "[DELETED]"
        post.body = "[DELETED]"
        posts_images = PostsImage.query.filter(
            PostsImage.post_id == post_id).all()
        for image in posts_images:
            db.session.delete(image)
        db.session.commit()

        return post.to_dict()
    return post.to_dict()


@post_routes.route('/<int:post_id>/comments', methods=["POST"])
def create_comment(post_id):
    post = Post.query.get(post_id)
    form = CreateComment()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        comment = Comment()
        if not form['comment_id'].data:
            thread = Thread(post_id=post.id)
            db.session.add(thread)
            db.session.commit()
            form['thread_id'].data = thread.id
            form['path'].data = f"{post.id}"
            form['level'].data = 1
        form.populate_obj(comment)
        db.session.add(comment)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}
