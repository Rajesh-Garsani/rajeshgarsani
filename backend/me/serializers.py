from rest_framework import serializers
from .models import Profile, Project, ProjectImage, Skill, SocialLink
from .models import ServicePackage, FAQ
from .models import ServiceContact

# 1. Create a new serializer just for the gallery images
class ProjectImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectImage
        fields = ['id', 'image']

# 2. Update your existing ProjectSerializer
class ProjectSerializer(serializers.ModelSerializer):
    # This grabs all images linked to this project using the related_name we set in models.py
    gallery_images = ProjectImageSerializer(many=True, read_only=True)
    tags_list = serializers.ReadOnlyField(source='get_tags_list')

    class Meta:
        model = Project
        fields = '__all__' # This will now automatically include the new 'gallery_images' field!

# Keep your other existing serializers below...
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = '__all__'

class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialLink
        fields = '__all__'


# Add this at the bottom of backend/me/serializers.py


class ServicePackageSerializer(serializers.ModelSerializer):
    features_list = serializers.ReadOnlyField(source='get_features_list')
    class Meta:
        model = ServicePackage
        fields = '__all__'

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'


# Add this at the bottom of backend/me/serializers.py


class ServiceContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceContact
        fields = '__all__'