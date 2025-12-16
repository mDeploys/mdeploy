# Translation Keys Reference

## Current Translations

### English (en)
```
home: "Home"
services: "Services"
calculator: "Calculator"
contact: "Contact"
getQuote: "Get Quote"
language: "Language"
english: "English"
arabic: "العربية"
```

### Arabic (ar)
```
home: "الرئيسية"
services: "الخدمات"
calculator: "الحاسبة"
contact: "تواصل معنا"
getQuote: "احصل على عرض سعر"
language: "اللغة"
english: "English"
arabic: "العربية"
```

## Adding New Translations

To add new translation keys:

1. Update `lib/translations.ts`:

```typescript
export const translations = {
  en: {
    // ... existing
    newKey: "New Value",
  },
  ar: {
    // ... existing
    newKey: "القيمة الجديدة",
  },
}

export type TranslationKeys = keyof typeof translations.en
```

2. Use in components:

```tsx
import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function MyComponent() {
  const { language } = useLanguage()
  const t = translations[language]
  
  return <h1>{t.newKey}</h1>
}
```

## Suggested Translations for UI Elements

### Header Navigation
- **aboutUs** - "About Us" / "من نحن"
- **pricing** - "Pricing" / "الأسعار"
- **blog** - "Blog" / "المدونة"
- **careers** - "Careers" / "الوظائف"

### Login Page
- **signIn** - "Sign In" / "تسجيل الدخول"
- **signUp** - "Sign Up" / "إنشاء حساب"
- **email** - "Email" / "البريد الإلكتروني"
- **password** - "Password" / "كلمة المرور"
- **rememberMe** - "Remember Me" / "تذكرني"

### Admin Panel
- **projects** - "Projects" / "المشاريع"
- **createProject** - "Create Project" / "إنشاء مشروع"
- **editProject** - "Edit Project" / "تعديل المشروع"
- **deleteProject** - "Delete Project" / "حذف المشروع"
- **status** - "Status" / "الحالة"
- **type** - "Type" / "النوع"

### Common
- **save** - "Save" / "حفظ"
- **cancel** - "Cancel" / "إلغاء"
- **delete** - "Delete" / "حذف"
- **edit** - "Edit" / "تعديل"
- **logout** - "Logout" / "تسجيل الخروج"
- **loading** - "Loading..." / "جاري التحميل..."
- **error** - "Error" / "خطأ"
- **success** - "Success" / "نجاح"
