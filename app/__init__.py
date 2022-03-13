from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect

from app.config import Config
from app.models import User, db
from app.routes import routes
from app.seeds import seed_commands


def create_app(testing=False):
    app = Flask(__name__)

    login = LoginManager(app)
    login.login_view = "api.auth.unauthorized"

    config = Config(testing)
    app.config.from_object(config)

    @login.user_loader
    def load_user(id):
        return User.query.get(int(id))

    app.cli.add_command(seed_commands)

    db.init_app(app)
    Migrate(app, db)
    CORS(app)
    CSRFProtect(app)

    app.register_blueprint(routes)

    return app
