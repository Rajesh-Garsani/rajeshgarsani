from django.db import models
from ckeditor.fields import RichTextField

# Profile Model for Hero, About, and Contact Info
class Profile(models.Model):
    name = models.CharField(max_length=100)
    title = models.CharField(max_length=200, help_text="e.g. Web Developer")
    hero_description = RichTextField()
    about_title = models.CharField(max_length=200, default="Python Developer")
    about_description_1 = RichTextField()
    email = models.EmailField()
    location = models.CharField(max_length=200)
    phone = models.CharField(max_length=20)
    education = models.CharField(max_length=200)
    resume_file = models.FileField(upload_to='resumes/', blank=True, null=True)
    hero_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    about_image = models.ImageField(upload_to='profile/', blank=True, null=True)

    def __str__(self):
        return self.name


# Social Links
class SocialLink(models.Model):
    platform = models.CharField(max_length=50, help_text="e.g. github, linkedin-in, instagram")
    url = models.URLField()

    def __str__(self):
        return self.platform


# Project Model
class Project(models.Model):
    title = models.CharField(max_length=200)
    description = RichTextField(help_text="Brief overview for the homepage.")
    tags = models.CharField(max_length=200)
    image = models.ImageField(upload_to='projects/', blank=True, null=True, help_text="Main cover/thumbnail image")
    demo_link = models.URLField(blank=True)
    source_link = models.URLField(blank=True)

    def __str__(self):
        return self.title

    def get_tags_list(self):
        return [tag.strip() for tag in self.tags.split(',')] if self.tags else []


# NEW: Multi-Image Support for Projects (Gallery)
class ProjectImage(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='gallery_images')
    image = models.ImageField(upload_to='projects/gallery/')

    def __str__(self):
        return f"Gallery Image for {self.project.title}"


# Skill Model
class Skill(models.Model):
    CATEGORY_CHOICES = [('technical', 'Technical Skills'), ('professional', 'Professional Skills')]
    name = models.CharField(max_length=100)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.name


# Contact Message Model
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField() # Kept as normal TextField for security against malicious HTML
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name}"