# Language Support - Quick Start Guide

## ✨ What's New

Your mDeploy website now has full internationalization (i18n) support with:

- ✅ **English & Arabic** language switching
- ✅ **RTL** (Right-to-Left) layout support for Arabic
- ✅ **Language Switcher** in header navigation
- ✅ **Persistent** language preference (saved in browser)
- ✅ **SEO** optimized with language alternates
- ✅ **Type-Safe** translation system

## 🚀 How to Use

### For End Users

1. **Switch Languages**
   - Look for the language selector in the header (next to theme toggle)
   - Click on the dropdown
   - Select "English" or "العربية" (Arabic)
   - Layout automatically flips to RTL for Arabic

2. **Language Persists**
   - Your language choice is saved automatically
   - When you return to the site, it remembers your preference

### For Developers

#### Adding Translations

1. Open `lib/translations.ts`
2. Add your new key to both `en` and `ar` objects:

```typescript
export const translations = {
  en: {
    welcome: "Welcome",
    // ... other keys
  },
  ar: {
    welcome: "أهلا وسهلا",
    // ... other keys
  },
}
```

#### Using Translations in Components

```tsx
"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function MyComponent() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div>
      <h1>{t.welcome}</h1>
    </div>
  )
}
```

#### Checking Current Language

```tsx
import { useLanguage } from "@/lib/language-context"

export function LanguageAware() {
  const { language, setLanguage } = useLanguage()

  return (
    <div>
      Current: {language === "en" ? "English" : "العربية"}
      <button onClick={() => setLanguage(language === "en" ? "ar" : "en")}>
        Toggle
      </button>
    </div>
  )
}
```

#### RTL-Specific Styling

For elements that need special RTL handling, use Tailwind's `dir-rtl:` prefix:

```tsx
<div className="ml-4 dir-rtl:mr-4 dir-rtl:ml-0">
  This has margin-left on LTR, margin-right on RTL
</div>
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `lib/language-context.tsx` | Language state management & RTL handling |
| `lib/translations.ts` | Translation dictionary (EN/AR) |
| `components/language-switcher.tsx` | Language selector UI component |
| `app/layout.tsx` | Root provider wrapper |
| `components/header.tsx` | Navigation with language switcher |

## 🔍 Documentation

- **IMPLEMENTATION_SUMMARY.md** - Complete feature overview
- **TRANSLATIONS_REFERENCE.md** - Translation keys and suggestions
- **ARCHITECTURE.md** - Technical architecture & data flow

## 🧪 Testing

Quick checklist to verify everything works:

- [ ] Load the website
- [ ] See language switcher in header
- [ ] Click language switcher dropdown
- [ ] Select "العربية"
- [ ] Verify layout flips to RTL
- [ ] Text and elements align properly
- [ ] Refresh page
- [ ] Language is still Arabic (persisted)
- [ ] Switch back to English
- [ ] Layout returns to LTR

## 📝 Common Tasks

### Add a New Language

1. Add to translations.ts:
   ```typescript
   export type Language = "en" | "ar" | "fr"
   
   export const translations = {
     en: { /* ... */ },
     ar: { /* ... */ },
     fr: { /* ... */ },  // Add new language
   }
   ```

2. Update LanguageSwitcher component

### Add Navigation Menu Item Translation

1. Add to `lib/translations.ts`:
   ```typescript
   export const translations = {
     en: {
       aboutUs: "About Us",
     },
     ar: {
       aboutUs: "من نحن",
     },
   }
   ```

2. Update Header component to use `t.aboutUs`

### Create a Language-Aware Component

```tsx
"use client"

import { useLanguage } from "@/lib/language-context"
import { translations } from "@/lib/translations"

export function FeatureCard() {
  const { language } = useLanguage()
  const t = translations[language]

  // Component automatically updates when language changes
  return <div>{t.featureName}</div>
}
```

## ❓ Troubleshooting

### Language Switcher Not Showing

- Verify `LanguageProvider` wraps entire app in `app/layout.tsx`
- Check that header imports `LanguageSwitcher` component

### Translations Not Working

- Import from correct path: `lib/language-context` and `lib/translations`
- Make sure key exists in both `en` and `ar` objects
- Check for typos in translation key

### RTL Not Applying

- Verify `document.documentElement.dir` is set in browser DevTools
- Check HTML lang attribute: `<html lang="ar">`
- Tailwind config should have RTL support enabled

## 🎯 Next Steps

1. **Expand translations** - Add all UI text to `lib/translations.ts`
2. **Update all components** - Use `useLanguage()` hook throughout app
3. **Test thoroughly** - Verify layout in both LTR and RTL
4. **Deploy** - Changes automatically work on Vercel
5. **Monitor** - Check analytics for language preferences

## 📚 Resources

- [React Context API Docs](https://react.dev/reference/react/useContext)
- [Tailwind RTL Support](https://tailwindcss.com/docs/hover-focus-and-other-states#rtl-modifier)
- [MDN: document.dir](https://developer.mozilla.org/en-US/docs/Web/API/Document/dir)
- [MDN: HTML lang Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang)

## 🆘 Need Help?

Refer to:
- IMPLEMENTATION_SUMMARY.md for complete feature details
- ARCHITECTURE.md for data flow diagrams
- TRANSLATIONS_REFERENCE.md for translation examples
