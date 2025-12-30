

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from authentication.serializers.login import EmployeeLoginSerializer


class EmployeeLoginView(APIView):
    def post(self, request):
        serializer = EmployeeLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(
            serializer.validated_data,
            status=status.HTTP_200_OK
        )
