# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bucketlist', '0002_auto_20160413_2246'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bucketlist',
            options={'ordering': ['-date_modified']},
        ),
        migrations.AlterModelOptions(
            name='bucketlistitem',
            options={'ordering': ['-date_modified']},
        ),
    ]
