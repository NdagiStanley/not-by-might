# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bucketlist', '0004_auto_20160512_0920'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bucketlistitem',
            options={'ordering': ['done', '-date_modified']},
        ),
    ]
