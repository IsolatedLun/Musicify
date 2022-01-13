def prettify(e, key=False):
    if not key:
        return str(e).split('.')[1].replace('_', ' ')
    return ' '.join(str(e).split('_'))