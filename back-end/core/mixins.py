from django.contrib import admin

# +++++++++++++++++++++   ADMIN    ++++++++++++++++++++++

class RowNumberMixin:

    def changelist_view(self, request, extra_context=None):
        self.request = request  # برای دسترسی به وضعیت صفحه‌بندی
        return super().changelist_view(request, extra_context=extra_context)

    @admin.display(description='#')
    def row_number(self, obj):
        cl = self.get_changelist_instance(self.request)
        queryset = list(cl.get_queryset(self.request))
        
        # پیدا کردن موقعیت آیتم در صفحه جاری
        try:
            index_in_page = queryset.index(obj) + 1
        except ValueError:
            return '-'
            
        # اگر صفحه‌بندی فعال باشد، آفست صفحات قبلی را حساب می‌کند
        if hasattr(cl, 'page_obj') and cl.page_obj:
            start_index = cl.page_obj.start_index()  # شمارنده دقیق شروع صفحه جاری
            return start_index + queryset.index(obj)
            
        return index_in_page