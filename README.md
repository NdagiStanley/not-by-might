# not-by-might

[![Build Status](https://semaphoreci.com/api/v1/stanmd/not-by-might/branches/feature-review/badge.svg)](https://semaphoreci.com/stanmd/not-by-might)
[![Coverage Status](https://coveralls.io/repos/github/NdagiStanley/not-by-might/badge.svg?branch=feature-review)](https://coveralls.io/github/NdagiStanley/not-by-might?branch=feature-review)
[![Code Health](https://landscape.io/github/NdagiStanley/not-by-might/feature-review/landscape.svg?style=flat)](https://landscape.io/github/NdagiStanley/not-by-might/feature-review)
![MIT License](https://img.shields.io/github/license/mashape/apistatus.svg)

A bucketlist basically means that the things you would like to do or achieve before you **EXPIRE**

This is a responsive web application that allows you to add *items* to your *bucketlist* categories.

The application is hosted at [nbm-doit](http://nbm-doit.herokuapp.com)

----

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisities

You'll need to have the following installed in your local machine to run this application
```Python```, ```Postgres``` and ```GIT```

### Installing

1. Clone this repository

    RUN ```git clone https://github.com/NdagiStanley/not-by-might.git```

2. CD into the directory

    RUN ```cd not-by-might```

3. Install dependencies of the application/ project

    RUN ```pip install -r requirements.txt```

4. Create a Postgresql database (it's best you use **PGAdmin**). Take note of the **name**, **user**, **password** and **port**.

5. Open the project in your preferred text editor, navigate to the **settings.py** which is in **_todo/todo/_** directory and edit the fields surrounded by [] according to the following snippet starting at line **120**. Fill the _name_, _user_, _password_ and _port_ (without the []) in the snippet

  ```python
    ....
    else:
            DATABASES = {
                'default': {
                    'ENGINE': 'django.db.backends.postgresql_psycopg2',
                    'NAME': '[name]',
                    'USER': '[user]',
                    'PASSWORD': '[password]',
                    'HOST': '127.0.0.1',
                    'PORT': '[port]',
                }
            }
    ....

  ```

6. Setup the application

    RUN ```cd todo ```

    RUN ```python manage.py makemigrations```

    RUN ```python manage.py migrate```

    RUN ```python manage.py collectstatic --noinput```

7. Run the server

    RUN ```python manage.py runserver``` and get to [http://localhost:8000](http://localhost:8000)

### Tasks asserting completion

> Implement Django API in this structure:

```json
{
  "id": 1,
  "name": "BucketList1",
  "items": [
    {
      "id": 1,
      "title": "I need to do X",
      "date_created": "2015-08-12 11:57:23",
      "date_modified": "2015-08-12 11:57:23",
      "done": false
    }
  ],
  "date_created": "2015-08-12 11:57:23",
  "date_modified": "2015-08-12 11:57:23",
  "created_by": "1113456"
}
```

using

<div align="center"><img width="250" src="https://cms-assets.tutsplus.com/uploads/users/45/posts/19786/preview_image/django-rest-framework-wide-retina-preview.gif"></div>

> with Token Based Authentication within these rules:

| EndPoint      |   Public Access   |
| ---- |:----: |
| POST /auth/login  |  TRUE     |
| POST /auth/register   |  TRUE     |
| POST /bucketlists/    |  FALSE    |
| GET /bucketlists/     |  FALSE    |
| GET /bucketlists/< id >   |   FALSE   |
| PUT /bucketlists/< id >   |   FALSE   |
| DELETE /bucketlists/< id >    |   FALSE   |
| POST /bucketlists/< id >/items/   |   FALSE   |
| PUT /bucketlists/< id >/items/< item_id >     |   FALSE   |
| DELETE /bucketlists/< id >/items/< item_id >      |   FALSE   |

It's documentation is [here](https://nbm-doit.herokuapp.com/api/v1/docs/) made using DRF Docs

> Have a front-end consuming the API

This has been implemented using vuejs (frontend framework)
<div align="center"><a href="http://vuejs.org" target="_blank"><img width="100"src="http://vuejs.org/images/logo.png"></a></div>

and Bootstrap (frontend framework)

<div align="center"><img width="150"src="https://i.imgur.com/RCyaJpq.png">
</div>


## Running the tests

This is how to run the automated tests for this application

RUN ```python manage.py test```

## Deployment

You might want to deploy this project. Well, the application is ready fro deployment to heroku. After installing _heroku toolbelt_; do the following (Ensure you are in the root folder):

RUN ```heroku local web``` and go to to check it how it will look after deployment

RUN ```heroku login``` and enter your credentials.

RUN ```heroku create [appname]``` without the [ ] .

RUN ```heroku git push [branch_name]``` without the [ ]. The branch_name should be master if you just cloned the repo and did not branch out.

----

Copyright AD-2016
###### [Stanley Ndagi](http://techkenyans.org/jamii/stanmd) c/o [Andela](http://andela.com)

Inspiration:

It's not by might that you achieve the things you do in life!
<div align="center">
<img src="https://scontent.xx.fbcdn.net/t31.0-8/13055734_10201410751228121_1746141436641529211_o.jpg">
</div>
