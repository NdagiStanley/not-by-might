# not-by-might

This is a responsive web application that allows you to add *items* to your *bucketlist* categories.
A bucketlist basically means that the things you would like to do or achieve before you **EXPIRE**
The app hosted is at [nbm-doit](http://nbm-doit.herokuapp.com)

----
####BADGES
[![Build Status](https://semaphoreci.com/api/v1/stanmd/not-by-might/branches/feature-review/badge.svg)](https://semaphoreci.com/stanmd/not-by-might)
[![Coverage Status](https://coveralls.io/repos/github/NdagiStanley/not-by-might/badge.svg?branch=feature-review)](https://coveralls.io/github/NdagiStanley/not-by-might?branch=feature-review)
[![Code Health](https://landscape.io/github/NdagiStanley/not-by-might/feature-review/landscape.svg?style=flat)](https://landscape.io/github/NdagiStanley/not-by-might/feature-review)
[![Code Issues](https://www.quantifiedcode.com/api/v1/project/b4fcf46ab7d1438b86f77d14ae709f3c/badge.svg)](https://www.quantifiedcode.com/app/project/b4fcf46ab7d1438b86f77d14ae709f3c)
![MIT License](https://img.shields.io/github/license/mashape/apistatus.svg)

----
#####CHECKPOINT PROGRESS
![Checkpoint Status](https://img.shields.io/badge/Stan_MD-task%200%20complete-green.svg)
![Checkpoint Status](https://img.shields.io/badge/Stan_MD-task%201%20complete-green.svg)
![Checkpoint Status](https://img.shields.io/badge/Stan_MD-task%202%20complete-green.svg)
![Checkpoint Status](https://img.shields.io/badge/Stan_MD-task%203%20complete-green.svg)
![Checkpoint Status](https://img.shields.io/badge/Stan_MD-PR%20review%20pending-red.svg)

----
## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisities

You'll need to have the following installed in your local machine to run this application
```Python``` and ```GIT```

### Installing

1. Clone this repository

    RUN ```git clone https://github.com/NdagiStanley/not-by-might.git```

2. CD into the directory
    RUN ```cd not-by-might```

3. Install dependencies of the application/ project
    RUN ```pip install -r requirements.txt```

4. Setup the application
    RUN ```cd todo ```
    RUN ```python manage.py makemigrations```
    RUN ```python manage.py migrate```
    RUN ```python manage.py collectstatic --noinput```

5. Run the server
    RUN ```python manage.py runserver``` and get to http://localhost:8000

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

<div align="center"><img width="150"src="http://cwfan.cc/wp-content/uploads/2015/11/bootstrap-logo.png">
</div></div>


## Running the tests

This is how to run the automated tests for this application

RUN ```python manage.py test```

## Deployment

You might want to deploy this project. Well, the application is ready fro deployment to heroku. After installing _heroku toolbelt_;

RUN ```heroku local web``` to check it how it will look after deployment

RUN ```heroku login``` and enter your credentials.

RUN ```heroku create [appname]``` without the [ ] .

RUN ```heroku git push [branch_name]``` without the [ ]. The branch_name should be master if you just cloned the repo and did not branch out.

----

Copyright AD-2016
###### [Stanley Ndagi](http://techkenyans.org/jamii/stanmd) c/o [Andela](http://andela.com)

Inspiration:
<div align="center">
<img src="https://scontent.xx.fbcdn.net/t31.0-8/13055734_10201410751228121_1746141436641529211_o.jpg">
</div>
