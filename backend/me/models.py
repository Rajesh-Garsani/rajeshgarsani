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



# Add this at the bottom of backend/me/models.py
# backend/me/models.py

class ServicePackage(models.Model):
    CATEGORY_CHOICES = [
        ('Full Stack Website Development', 'Full Stack Website Development'),
        ('Frontend Development', 'Frontend Development'),
        ('Backend Development', 'Backend Development'),
        ('Web Scraping', 'Web Scraping'),
        ('Other', 'Other'),
    ]

    # NEW: Category Field
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES, default='Full Stack Website Development')

    name = models.CharField(max_length=50, help_text="e.g. Basic, Standard, Premium")
    title = models.CharField(max_length=100, help_text="e.g. Landing Page, Website, Full Web App")
    price = models.CharField(max_length=50, help_text="e.g. $20, $50, $100+")
    description = models.TextField()
    delivery_time = models.CharField(max_length=50, help_text="e.g. 2 Days")
    revisions = models.CharField(max_length=50, help_text="e.g. 2 Revisions, Unlimited")
    features = models.TextField(help_text="Comma-separated list (e.g. Responsive Design, Clean Code, SEO)")
    is_best_seller = models.BooleanField(default=False)
    order = models.IntegerField(default=0, help_text="Display order (1, 2, 3)")

    class Meta:
        ordering = ['order']

    def get_features_list(self):
        return [f.strip() for f in self.features.split(',')] if self.features else []

    def __str__(self):
        return f"{self.category} - {self.name}"

class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    order = models.IntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.question

# Add this at the bottom of backend/me/models.py

class ServiceContact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    location = models.CharField(max_length=200, blank=True, null=True, help_text="Client's location/country")
    subject = models.CharField(max_length=200)
    message = models.TextField()
    reference_link = models.URLField(blank=True, null=True, help_text="Link to reference UI/Website")
    reference_image = models.ImageField(upload_to='service_references/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Service Inquiry from {self.name} - {self.subject}"