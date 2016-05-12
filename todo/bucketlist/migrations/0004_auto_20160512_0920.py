# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('bucketlist', '0003_auto_20160428_0719'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='bucketlistitem',
            options={'ordering': ['-date_modified', 'done']},
        ),
    ]
