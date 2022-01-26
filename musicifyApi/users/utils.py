def get_user_by_tok(tok_header):
    from rest_framework.authtoken.models import Token

    tok = tok_header.split('Token ')[1]
    return Token.objects.get(key=tok).user
