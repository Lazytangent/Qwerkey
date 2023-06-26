from flask.cli import AppGroup

from app.seeds.comment_ratings import seed_comment_ratings, undo_comment_ratings
from app.seeds.comments import seed_comments, undo_comments
from app.seeds.communities import seed_communities, undo_communities
from app.seeds.meetups import seed_meetups, undo_meetups
from app.seeds.post_images import seed_post_images, undo_post_images
from app.seeds.post_ratings import seed_post_ratings, undo_post_ratings
from app.seeds.posts import seed_posts, undo_posts
from app.seeds.retailer_ratings import seed_retailer_ratings, undo_retailer_ratings
from app.seeds.retailers import seed_retailers, undo_retailers
from app.seeds.threads import seed_threads, undo_threads
from app.seeds.users import seed_users, undo_users

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    seed_users()
    seed_communities()
    seed_posts()
    seed_threads()
    seed_comments()
    seed_retailers()
    seed_retailer_ratings()
    seed_post_images()
    seed_meetups()
    seed_post_ratings()
    seed_comment_ratings()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_comment_ratings()
    undo_post_ratings()
    undo_meetups()
    undo_post_images()
    undo_retailer_ratings()
    undo_retailers()
    undo_comments()
    undo_threads()
    undo_posts()
    undo_communities()
    undo_users()
    # Add other undo functions here
