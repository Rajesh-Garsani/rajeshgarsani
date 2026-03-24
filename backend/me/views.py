from django.core.mail import send_mail
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Profile, Project, Skill, SocialLink, ContactMessage
from .serializers import ProfileSerializer, ProjectSerializer, SkillSerializer, SocialLinkSerializer


@api_view(['GET'])
def portfolio_data(request):
    profile = Profile.objects.first()
    projects = Project.objects.all()
    tech_skills = Skill.objects.filter(category='technical')
    prof_skills = Skill.objects.filter(category='professional')
    socials = SocialLink.objects.all()

    return Response({
        'profile': ProfileSerializer(profile, context={'request': request}).data if profile else None,
        'projects': ProjectSerializer(projects, many=True, context={'request': request}).data,
        'technical_skills': SkillSerializer(tech_skills, many=True).data,
        'professional_skills': SkillSerializer(prof_skills, many=True).data,
        'social_links': SocialLinkSerializer(socials, many=True).data,
    })


@api_view(['POST'])
def submit_contact(request):
    data = request.data
    try:
        # 1. Save the message to the database
        ContactMessage.objects.create(
            name=data['name'],
            email=data['email'],
            subject=data['subject'],
            message=data['message']
        )

        # 2. Construct the email content
        email_subject = f"Portfolio Contact: {data['subject']}"
        email_body = f"You have a new message from your portfolio website!\n\nName: {data['name']}\nEmail: {data['email']}\n\nMessage:\n{data['message']}"

        # 3. Send the email
        send_mail(
            subject=email_subject,
            message=email_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[settings.ADMIN_EMAIL],
            fail_silently=False,  # Set to False so we can see errors in the terminal if it fails
        )

        return Response({"success": "Message sent successfully!"})
    except Exception as e:
        print(f"Error processing contact form: {e}")  # Prints exact error to your terminal
        return Response({"error": str(e)}, status=400)