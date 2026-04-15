from django import forms
from django.contrib import admin
from .models import Profile, Project, ProjectImage, Skill, ContactMessage, SocialLink, ServicePackage, FAQ, ServiceContact


# ==========================================
# 1. Custom Field for Django 5.0+ Multi-Upload
# ==========================================
class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True


class MultipleFileField(forms.FileField):
    def __init__(self, *args, **kwargs):
        kwargs.setdefault("widget", MultipleFileInput())
        super().__init__(*args, **kwargs)

    def clean(self, data, initial=None):
        single_file_clean = super().clean
        if isinstance(data, (list, tuple)):
            result = [single_file_clean(d, initial) for d in data if d]
        else:
            result = [single_file_clean(data, initial)] if data else []
        return result


# ==========================================
# 2. Form & Admin Configuration
# ==========================================
class ProjectAdminForm(forms.ModelForm):
    # Use our custom field instead of the default one!
    multiple_images = MultipleFileField(
        label="Upload Multiple Gallery Images",
        required=False,
        help_text="Hold CTRL (Windows) or CMD (Mac) to select multiple images at once."
    )

    class Meta:
        model = Project
        fields = '__all__'


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 0


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'email', 'location')
    search_fields = ('name', 'title')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    form = ProjectAdminForm
    list_display = ('title', 'demo_link', 'source_link')
    search_fields = ('title', 'tags', 'description')
    list_filter = ('tags',)
    inlines = [ProjectImageInline]

    def save_model(self, request, obj, form, change):
        # Save the main project details first
        super().save_model(request, obj, form, change)

        # Grab the array of files from our custom field
        images = request.FILES.getlist('multiple_images')

        # Loop through and create a ProjectImage for each
        for image in images:
            ProjectImage.objects.create(project=obj, image=image)


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    list_filter = ('category',)
    search_fields = ('name',)
    list_editable = ('category',)


@admin.register(SocialLink)
class SocialLinkAdmin(admin.ModelAdmin):
    list_display = ('platform', 'url')
    search_fields = ('platform',)


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    list_filter = ('created_at',)
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')

    def has_add_permission(self, request):
        return False


admin.site.register(ServicePackage)
admin.site.register(FAQ)
admin.site.register(ServiceContact) # NEW