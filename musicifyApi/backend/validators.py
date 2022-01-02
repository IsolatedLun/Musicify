from django.core.exceptions import ValidationError

def validate_extension(file, extensions: list, f_type: str):
    import os

    f_ext = os.path.splitext(file.name)[1]

    if f_ext not in extensions:
        raise ValidationError(f'Not a valid {f_type.capitalize()} file.')