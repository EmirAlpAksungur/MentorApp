from django.core.management.base import BaseCommand, CommandError
from django.db.models import ForeignKey
import os

from Languages.models import Languages
from TextContent.models import TextContent
from Translations.models import Translations
import pandas as pd


class ExcelImporter:
    def __init__(self, model_class, excel_file):
        self.model_class = model_class
        self.excel_file = excel_file

    def import_data(self):
        excel_data = pd.read_excel(self.excel_file)

        for index, row in excel_data.iterrows():
            model_instance = self.model_class()
            for column in excel_data.columns:
                if isinstance(self.model_class._meta.get_field(column), ForeignKey):
                    related_model = self.model_class._meta.get_field(column).remote_field.model
                    related_instance = related_model.objects.get(**{column: int(row[column])})
                    setattr(model_instance, column, related_instance)
                else:
                    setattr(model_instance, column, row[column])
            model_instance.save()


class Command(BaseCommand):
    def handle(self, *args, **options):
        base_dir = os.path.dirname(os.path.abspath(__file__))

        models = [Languages, TextContent, Translations]
        file_names = ['Languages.xlsx', 'TextContent.xlsx', 'Translations.xlsx']

        for model, file_name in zip(models, file_names):
            excel_file_path = os.path.join(base_dir, file_name)
            excel_importer = ExcelImporter(model, excel_file_path)
            excel_importer.import_data()
        