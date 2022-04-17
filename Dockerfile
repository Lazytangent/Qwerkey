FROM node:12 AS build-stage

WORKDIR /react-app
COPY react-app/package.json react-app/package-lock.json ./

RUN npm install

COPY react-app/ ./
RUN npm run build

FROM python:3.10

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY requirements.txt .

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

COPY . .
COPY --from=build-stage /react-app/build/* app/static/

# Run flask environment
CMD gunicorn --bind 0.0.0.0:$PORT 'app:create_app()'
