from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .communities import seed_communities, undo_communities
from .comments import seed_comments, undo_comments
from .retailers import seed_retailers, undo_retailers
from .threads import seed_threads, undo_threads
from .retailer_ratings import seed_retailer_ratings, undo_retailer_ratings

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_communities()
    seed_posts()
    seed_threads()
    seed_comments()
    seed_retailers()
    seed_retailer_ratings()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_retailer_ratings()
    undo_retailers()
    undo_comments()
    undo_threads()
    undo_posts()
    undo_communities()
    undo_users()
    # Add other undo functions here
