# Generated by Django 4.2.8 on 2024-01-21 02:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('textContent', '0001_initial'),
        ('languages', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Translations',
            fields=[
                ('TranslationsId', models.IntegerField(primary_key=True, serialize=False)),
                ('Translations', models.CharField(max_length=200)),
                ('LanguageId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='languages.languages')),
                ('TextContentId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='textContent.textcontent')),
            ],
        ),
    ]
