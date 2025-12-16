# Language Support Architecture

## 🏗️ Component Hierarchy

```
app/layout.tsx (Root)
├── LanguageProvider
│   ├── ConditionalLayout
│   │   ├── Header
│   │   │   └── LanguageSwitcher (uses useLanguage hook)
│   │   ├── Page Content (children)
│   │   └── Footer
│   └── Toaster
└── Analytics
```

## 📊 Data Flow

```
┌─────────────────────────────────────┐
│   LanguageProvider (Context Root)   │
│  - Manages language state           │
│  - Handles localStorage sync        │
│  - Sets document.dir/lang           │
└──────────────┬──────────────────────┘
               │
       ┌───────┴───────┐
       │               │
  [stored in]     [provides via]
       │               │
   localStorage   useLanguage()
                       │
        ┌──────────────┴──────────────┐
        │                             │
   LanguageSwitcher            Any Component
   - Shows current language      - Reads language
   - Can change language         - Accesses translations
   - Updates context             - Applies RTL if needed
        │
        └─→ [triggers] document.dir/lang update
             RTL/LTR layout adjustment
             localStorage update
             Context re-render
```

## 🔄 Language Switch Flow

```
1. User clicks LanguageSwitcher dropdown
                        ↓
2. Selects "العربية" (Arabic)
                        ↓
3. handleSetLanguage("ar") called in LanguageProvider
                        ↓
4a. setState(language: "ar")
4b. localStorage.setItem("language", "ar")
4c. document.documentElement.lang = "ar"
4d. document.documentElement.dir = "rtl"
                        ↓
5. Context consumers re-render
   - LanguageSwitcher shows new value
   - All components using useLanguage() update
   - CSS RTL utilities apply automatically
                        ↓
6. Tailwind applies .rtl: prefixed utilities
   - Element positions flip
   - Text alignment reverses
   - Margin/padding sides swap (L↔R)
```

## 📦 Translation Resolution

```
Component needs text:
   │
   ├─ import { useLanguage } from "@/lib/language-context"
   ├─ import { translations } from "@/lib/translations"
   │
   ├─ const { language } = useLanguage()  // Get current lang: "en" or "ar"
   │
   ├─ const t = translations[language]    // Get translation object
   │      │
   │      └─ translations["ar"] = {
   │            home: "الرئيسية",
   │            services: "الخدمات",
   │            ...
   │         }
   │
   └─ return <h1>{t.home}</h1>            // "الرئيسية"
```

## 🗂️ File Dependencies

```
app/layout.tsx
    ↓
    ├─ import LanguageProvider from "lib/language-context"
    ├─ <LanguageProvider>
    │   ├─ Wraps ConditionalLayout
    │   └─ Provides context to all children
    │
    └─ components/header.tsx
        ├─ import { LanguageSwitcher } from "components/language-switcher"
        └─ <LanguageSwitcher />
            │
            ├─ lib/language-context.tsx
            │   └─ export { useLanguage }
            │
            └─ lib/translations.ts
                └─ export { translations }
```

## 🎯 Key Integration Points

### 1. Root Layout (`app/layout.tsx`)
- Wraps entire app with `<LanguageProvider>`
- Ensures language context available everywhere
- Sets initial HTML attributes

### 2. Language Context (`lib/language-context.tsx`)
- Provides `useLanguage()` hook
- Manages language state
- Syncs with localStorage
- Updates document attributes
- Handles hydration

### 3. Translations (`lib/translations.ts`)
- Centralized translation dictionary
- Type-safe translation keys
- Both `en` and `ar` variations
- Easily expandable

### 4. Language Switcher (`components/language-switcher.tsx`)
- UI for switching languages
- Uses `useLanguage()` hook
- Triggers context updates
- Updates localStorage

### 5. Header (`components/header.tsx`)
- Includes LanguageSwitcher
- Shows language selector to users
- Both desktop and mobile layouts

## 🌐 Localization Coverage

### Current Scope
- Header navigation text
- Button labels
- Language selector display

### Should Be Added
- Homepage content
- Service descriptions
- Admin page labels
- Form labels and placeholders
- Error messages
- Toast notifications

## ♿ Accessibility Features

✅ HTML lang attribute updated (`document.documentElement.lang`)
✅ HTML dir attribute updated (`document.documentElement.dir`)
✅ RTL text direction for Arabic
✅ Semantic HTML for language selector
✅ Accessible select component (Radix UI)
✅ Keyboard navigation support

## 🔐 Type Safety

All translations are fully typed:

```typescript
const language: Language = "en" // ✅ Type-safe
const t: typeof translations["en"] = translations[language]
const value: string = t.home // ✅ Type-safe
const invalid = t.nonExistent // ❌ TypeScript error!
```

## 📈 Performance Considerations

- **Context Re-renders**: Only language-aware components re-render on switch
- **Storage**: Minimal localStorage usage (just 2 bytes for "en" or "ar")
- **No External Library**: Uses React Context, no heavy i18n library
- **Lazy Loaded**: Translations loaded with component tree
- **Client-Side**: All language switching happens on client (hydration-safe)

## 🚦 State Management Flowchart

```
              ┌─────────────────────┐
              │  Initial App Load    │
              └──────────┬──────────┘
                         │
              ┌──────────▼──────────┐
              │  Check localStorage │
              │  for saved language │
              └──────────┬──────────┘
                         │
            ┌────────────┴────────────┐
            │                         │
        Found              Not Found
            │                  │
    ┌───────▼──────┐      ┌────▼──────────┐
    │ Use saved    │      │ Set default   │
    │ language     │      │ language: "en"│
    └───────┬──────┘      └────┬──────────┘
            │                  │
            └──────────┬───────┘
                       │
            ┌──────────▼──────────┐
            │  Update document.   │
            │  lang & dir attrs   │
            └──────────┬──────────┘
                       │
            ┌──────────▼──────────┐
            │  LanguageProvider   │
            │  provides context   │
            └──────────┬──────────┘
                       │
            ┌──────────▼──────────┐
            │  App renders with   │
            │  current language   │
            └─────────────────────┘
```
