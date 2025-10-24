from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import CustomUserSerializer


class EmailObtainPairView(TokenObtainPairView):
    serializer_class = CustomUserSerializer


# Create your views here.
class HomeView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content)


class LogoutView(APIView):
    # Conserver IsAuthenticated est correct si vous voulez vous assurer
    # qu'un utilisateur valide est celui qui se déconnecte.
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            # 1. Tenter d'extraire le token (peut lever KeyError)
            refresh_token = request.data["refresh_token"]

            # 2. Tenter de créer l'objet RefreshToken (peut lever TokenError)
            token = RefreshToken(refresh_token)

            # 3. Mettre sur liste noire
            token.blacklist()

            # 205 RESET CONTENT est le statut sémantiquement parfait pour une déconnexion
            return Response(status=status.HTTP_205_RESET_CONTENT)

        except KeyError:
            # Si 'refresh_token' est manquant dans la requête
            return Response(
                {"detail": "Le champ 'refresh_token' est requis."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except TokenError:
            # Si le token est invalide ou déjà blacklisted
            return Response(
                {"detail": "Le jeton de rafraîchissement est invalide ou expiré."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            # Pour toute autre erreur inattendue
            return Response(
                {"detail": f"Une erreur inattendue s'est produite: {e}"},
                status=status.HTTP_400_BAD_REQUEST
            )