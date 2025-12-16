export const translations = {
  en: {
    home: "Home",
    services: "Services",
    calculator: "Calculator",
    contact: "Contact us",
    blog: "Blog",
    getQuote: "Get Quote",
    language: "Language",
    english: "English",
    arabic: "العربية",
    toggleLanguage: "Toggle language",
    hero: {
      badge: "Professional Deployment Services",
      title: "Deploy with",
      emphasis: "Confidence",
      description:
        "From websites to desktop applications, we handle your deployment needs with expertise and precision. Transparent pricing, reliable delivery.",
      primaryCta: "Calculate Your Project",
      secondaryCta: "Get in Touch",
      stats: {
        projectsLabel: "Projects Deployed",
        uptimeLabel: "Uptime Rate",
        supportLabel: "Support",
      },
      card: {
        title: "Deployment Ready",
        subtitle: "All systems go",
        checklist: ["Server configured", "SSL installed", "CDN enabled"],
      },
    },
    servicesSection: {
      badge: "What We Offer",
      title: "Our Services",
      description: "Comprehensive deployment solutions tailored to your needs",
      cards: {
        website: {
          title: "Website Deployment",
          price: "250 SAR per page",
          description: "Static and dynamic website deployment with optimized performance and SEO.",
        },
        webApp: {
          title: "Web Applications",
          price: "300 SAR per page",
          description: "Full-stack web application deployment with database integration and APIs.",
        },
        mobile: {
          title: "Mobile Apps",
          price: "400 SAR per screen",
          description: "iOS and Android app deployment to stores with proper configuration.",
        },
        desktop: {
          title: "Desktop Apps",
          price: "180 SAR per function",
          description: "Windows desktop application development and distribution setup.",
        },
      },
    },
    calculatorPreview: {
      badge: "Instant Pricing",
      title: "Calculate Your Project Cost",
      description: "Get instant pricing with our transparent calculator",
      cta: "Go to Full Calculator & Submit",
    },
    process: {
      badge: "Our Process",
      title: "How We Work",
      description: "A streamlined process from quote to deployment",
      steps: [
        {
          title: "Get a Quote",
          description: "Use our calculator to get instant pricing for your project requirements.",
        },
        {
          title: "Discuss & Plan",
          description: "We review your requirements and create a detailed deployment plan.",
        },
        {
          title: "Deploy & Deliver",
          description: "We handle the deployment with precision and hand over a production-ready system.",
        },
      ],
    },
    testimonials: {
      badge: "Testimonials",
      title: "Trusted by Developers",
      cards: [
        {
          quote:
            '"mDeploy handled our entire deployment pipeline. Professional, efficient, and transparent pricing made the whole process seamless."',
          name: "Sarah Chen",
          role: "Tech Lead, StartupCo",
        },
        {
          quote:
            '"The calculator helped us budget accurately, and the delivery exceeded expectations. Highly recommend mDeploy for any deployment needs."',
          name: "Ahmed Al-Rashid",
          role: "CTO, TechFlow",
        },
        {
          quote:
            '"From mobile apps to web platforms, mDeploy has been our go-to deployment partner. Reliable and knowledgeable team."',
          name: "Maria Garcia",
          role: "Product Manager, InnovateLabs",
        },
      ],
    },
    faq: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How is pricing calculated?",
          answer:
            "Our pricing is transparent and straightforward. Website pages are 250 SAR each, web app pages are 300 SAR, mobile screens are 400 SAR, and desktop functions are 180 SAR. Every project includes a one-time setup and handling fee of 200 SAR.",
        },
        {
          question: "What's included in deployment?",
          answer:
            "Deployment includes server configuration, environment setup, domain configuration, SSL certificates, database setup (if applicable), and initial optimization. We ensure your application is production-ready and secure.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept payments in both SAR and USD via bank transfer, credit card, and major digital payment platforms. Payment details will be provided after quote approval.",
        },
        {
          question: "How long does deployment take?",
          answer:
            "Deployment timelines vary based on project complexity. Simple websites can be deployed within 2-3 business days, while complex applications may take 1-2 weeks. We'll provide a detailed timeline during the planning phase.",
        },
        {
          question: "Do you offer post-deployment support?",
          answer:
            "Yes, we provide post-deployment support to ensure everything runs smoothly. Support packages can be discussed based on your needs during the quote process.",
        },
      ],
    },
    cta: {
      title: "Ready to Deploy Your Project?",
      description: "Get started with our calculator or reach out to discuss your specific needs.",
      primaryCta: "Calculate Your Quote",
      secondaryCta: "Contact Us",
    },
    calculatorPage: {
      title: "Service Cost Calculator",
      description: "Calculate your project cost with our transparent pricing calculator",
    },
    serviceCalculator: {
      title: "Service Cost Calculator",
      description: "Calculate your project cost based on our transparent pricing",
      currencyLabel: "Currency",
      fields: {
        websitePages: "Website Pages (250 SAR each)",
        webAppPages: "Web App Pages (300 SAR each)",
        ecommercePages: "E-commerce Pages (450 SAR each)",
        mobileScreens: "Mobile App Screens (400 SAR each)",
        desktopFunctions: "Desktop Functions (180 SAR each)",
      },
      breakdownTitle: "Cost Breakdown",
      breakdownTemplates: {
        website: "Website Pages ({count} × 250 SAR)",
        webApp: "Web App Pages ({count} × 300 SAR)",
        ecommerce: "E-commerce Pages ({count} × 450 SAR)",
        mobile: "Mobile Screens ({count} × 400 SAR)",
        desktop: "Desktop Functions ({count} × 180 SAR)",
      },
      subtotal: "Subtotal",
      setupFee: "Setup & Handling Fee",
      total: "Total",
      actions: {
        reset: "Reset",
        continue: "Continue to Submit",
      },
    },
    quoteForm: {
      title: "Your Information",
      description: "Fill in your details to receive your quote",
      labels: {
        fullName: "Full Name *",
        email: "Email *",
        company: "Company",
        phone: "Phone",
        notes: "Project Notes / Requirements",
      },
      placeholders: {
        fullName: "John Doe",
        email: "john@example.com",
        company: "Your Company",
        phone: "+1 (555) 123-4567",
        notes: "Tell us more about your project...",
      },
      submit: "Submit Quote Request",
      submitting: "Sending...",
      toast: {
        successTitle: "Quote Request Sent!",
        successDescription: "We've sent you a confirmation email and will be in touch soon.",
        errorTitle: "Error",
        errorDescription: "Failed to submit quote request. Please try again.",
      },
    },
    contactPage: {
      title: "Get in Touch",
      description: "Have questions? We're here to help with your deployment needs.",
      form: {
        title: "Send us a message",
        description: "Fill out the form and we'll get back to you within 24 hours",
        labels: {
          fullName: "Full Name *",
          email: "Email *",
          company: "Company",
          message: "Message *",
        },
        placeholders: {
          fullName: "John Doe",
          email: "john@example.com",
          company: "Your Company",
          message: "Tell us about your project...",
        },
        submit: "Send Message",
        submitting: "Sending...",
      },
      toast: {
        successTitle: "Message Sent!",
        successDescription: "We'll get back to you as soon as possible.",
        errorTitle: "Error",
        errorDescription: "Failed to send message. Please try again.",
      },
      contactDetails: {
        email: { label: "Email", value: "info@mdeploy.dev" },
        whatsapp: { label: "WhatsApp", cta: "Start a chat" },
        telegram: { label: "Telegram", cta: "Message on Telegram" },
        location: { label: "Location", value: "Saudi Arabia" },
        hoursTitle: "Business Hours",
        hoursWeekday: "Sunday - Thursday: 9:00 AM - 6:00 PM",
        hoursWeekend: "Friday - Saturday: Closed",
      },
    },
    footer: {
      description: "Professional deployment services for websites, web apps, mobile apps, and desktop applications.",
      servicesTitle: "Services",
      services: {
        website: "Website Deployment",
        webApps: "Web Apps",
        mobileApps: "Mobile Apps",
        desktopApps: "Desktop Development",
      },
      companyTitle: "Company",
      calculator: "Calculator",
      contact: "Contact",
      legalTitle: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      rights: "All rights reserved.",
      developedBy: "Developed by",
      socialTitle: "Connect",
      social: {
        twitter: "Twitter",
        github: "GitHub",
        behance: "Behance",
        linkedin: "LinkedIn",
        blog: "Blog",
      },
    },
    terms: {
      title: "Terms of Service",
      updatedLabel: "Last updated",
      sections: [
        {
          title: "Agreement to Terms",
          body: "By accessing or using mDeploy's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.",
        },
        {
          title: "Services",
          body: "mDeploy provides deployment services for websites, web applications, mobile applications, and desktop applications. Service specifications and deliverables will be outlined in individual project agreements.",
        },
        {
          title: "Pricing and Payment",
          body: "Our pricing is transparent and based on the calculator provided on our website. All prices are subject to the inclusion of a setup and handling fee. Payment terms will be specified in your project quote.",
        },
        {
          title: "Intellectual Property",
          body: "Upon full payment, you retain all rights to your deployed applications and content. mDeploy retains rights to our proprietary tools, processes, and methodologies used in providing our services.",
        },
        {
          title: "Limitation of Liability",
          body: "mDeploy shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.",
        },
        {
          title: "Contact",
          body: "For questions about these Terms of Service, please contact us at hello@mdeploy.dev",
        },
      ],
    },
    privacy: {
      title: "Privacy Policy",
      updatedLabel: "Last updated",
      sections: [
        {
          title: "Introduction",
          body: 'mDeploy ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our website and services.',
        },
        {
          title: "Information We Collect",
          intro: "We collect information that you provide directly to us, including:",
          items: [
            "Name and contact information (email, phone number)",
            "Company information",
            "Project requirements and specifications",
            "Communication preferences",
          ],
        },
        {
          title: "How We Use Your Information",
          intro: "We use the information we collect to:",
          items: [
            "Provide and improve our services",
            "Respond to your inquiries and requests",
            "Send you updates about your projects",
            "Comply with legal obligations",
          ],
        },
        {
          title: "Data Security",
          body: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
        },
        {
          title: "Contact Us",
          body: "If you have any questions about this Privacy Policy, please contact us at hello@mdeploy.dev",
        },
      ],
    },
    adminLogin: {
      subtitleSignUp: "Create your admin account",
      subtitleSignIn: "Admin Access",
      fullName: "Full Name",
      email: "Email",
      password: "Password",
      signUp: "Sign Up",
      signIn: "Sign In",
      creating: "Creating account...",
      signingIn: "Signing in...",
      togglePromptHaveAccount: "Already have an account?",
      togglePromptNoAccount: "Don't have an account?",
      toggleActionSignIn: "Sign In",
      toggleActionSignUp: "Sign Up",
      backHome: "Back to Home",
      toast: {
        signUpSuccess: "Sign up successful! Check your email to confirm.",
        signInSuccess: "Signed in successfully!",
      },
    },
    adminDashboard: {
      title: "Project Management",
      loading: "Loading...",
      newProject: "New Project",
      dialogTitles: {
        edit: "Edit Project",
        create: "Create New Project",
      },
      dialogDescriptions: {
        edit: "Update project details below",
        create: "Fill in the details to create a new project",
      },
      formLabels: {
        name: "Project Name",
        description: "Description",
        type: "Project Type",
        status: "Status",
        clientName: "Client Name",
        clientEmail: "Client Email",
        price: "Price (USD)",
      },
      typeOptions: {
        website: "Website",
        web_app: "Web Application",
        mobile_app: "Mobile App",
        desktop_app: "Desktop App",
      },
      statusOptions: {
        pending: "Pending",
        in_progress: "In Progress",
        completed: "Completed",
        cancelled: "Cancelled",
      },
      formActions: {
        cancel: "Cancel",
        submitCreate: "Create Project",
        submitUpdate: "Update Project",
      },
      table: {
        name: "Project Name",
        type: "Type",
        client: "Client",
        status: "Status",
        price: "Price",
        created: "Created",
        actions: "Actions",
      },
      empty: "No projects yet. Create your first project to get started.",
      toasts: {
        loadError: "Failed to load projects",
        updateSuccess: "Project updated successfully",
        createSuccess: "Project created successfully",
        saveError: "Failed to save project",
        deleteConfirm: "Are you sure you want to delete this project?",
        deleteSuccess: "Project deleted successfully",
        deleteError: "Failed to delete project",
      },
    },
    logout: {
      label: "Logout",
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Failed to logout",
    },
  },
  ar: {
    home: "الرئيسية",
    services: "الخدمات",
    calculator: "الحاسبة",
    contact: "تواصل معنا",
    blog: "المدونة",
    getQuote: "احصل على عرض سعر",
    language: "اللغة",
    english: "English",
    arabic: "العربية",
    toggleLanguage: "تبديل اللغة",
    hero: {
      badge: "خدمات نشر احترافية",
      title: "أطلق مشاريعك",
      emphasis: "بثقة",
      description:
        "من المواقع إلى تطبيقات سطح المكتب، ندير احتياجات النشر بخبرة ودقة مع تسعير شفاف وتسليم موثوق.",
      primaryCta: "احسب تكلفة مشروعك",
      secondaryCta: "تواصل معنا",
      stats: {
        projectsLabel: "مشروع تم نشره",
        uptimeLabel: "نسبة التوافر",
        supportLabel: "دعم على مدار الساعة",
      },
      card: {
        title: "جاهز للإطلاق",
        subtitle: "كل الأنظمة تعمل",
        checklist: ["تم إعداد الخادم", "تم تثبيت شهادة SSL", "تم تفعيل CDN"],
      },
    },
    servicesSection: {
      badge: "ماذا نقدم",
      title: "خدماتنا",
      description: "حلول نشر متكاملة مصممة لاحتياجاتك",
      cards: {
        website: {
          title: "نشر المواقع",
          price: "250 ريال لكل صفحة",
          description: "نشر المواقع الثابتة والديناميكية مع أداء محسن وتحسين محركات البحث.",
        },
        webApp: {
          title: "تطبيقات الويب",
          price: "300 ريال لكل صفحة",
          description: "نشر تطبيقات الويب الكاملة مع قواعد البيانات وواجهات البرمجة.",
        },
        mobile: {
          title: "تطبيقات الجوال",
          price: "400 ريال لكل شاشة",
          description: "نشر تطبيقات iOS وAndroid إلى المتاجر مع ضبط الإعدادات.",
        },
        desktop: {
          title: "تطبيقات سطح المكتب",
          price: "180 ريال لكل وظيفة",
          description: "تطوير وإعداد نشر تطبيقات سطح المكتب لنظام ويندوز.",
        },
      },
    },
    calculatorPreview: {
      badge: "تسعير فوري",
      title: "احسب تكلفة مشروعك",
      description: "احصل على تسعير فوري عبر حاسبتنا الشفافة",
      cta: "انتقل إلى الحاسبة الكاملة وقدّم الطلب",
    },
    process: {
      badge: "آلية عملنا",
      title: "كيف نعمل",
      description: "عملية سلسة من التسعير حتى التسليم",
      steps: [
        {
          title: "احصل على عرض سعر",
          description: "استخدم الحاسبة للحصول على تسعير فوري بناءً على احتياجات مشروعك.",
        },
        {
          title: "نناقش ونخطط",
          description: "نراجع متطلباتك ونضع خطة نشر مفصلة.",
        },
        {
          title: "ننفذ ونُسلّم",
          description: "ندير عملية النشر بدقة ونقدم نظاماً جاهزاً للإنتاج.",
        },
      ],
    },
    testimonials: {
      badge: "آراء العملاء",
      title: "موثوق من المطورين",
      cards: [
        {
          quote: "أدارت mDeploy خط نشرنا بالكامل باحترافية وكفاءة مع تسعير شفاف جعل العملية سلسة.",
          name: "Sarah Chen",
          role: "Tech Lead, StartupCo",
        },
        {
          quote: "ساعدتنا الحاسبة على إعداد الميزانية بدقة، وكانت النتائج فوق التوقعات. أوصي بها لأي احتياج نشر.",
          name: "Ahmed Al-Rashid",
          role: "CTO, TechFlow",
        },
        {
          quote: "من التطبيقات المحمولة إلى المنصات الإلكترونية، كانت mDeploy شريكنا الموثوق في النشر. فريق خبير ويمكن الاعتماد عليه.",
          name: "Maria Garcia",
          role: "Product Manager, InnovateLabs",
        },
      ],
    },
    faq: {
      title: "الأسئلة الشائعة",
      items: [
        {
          question: "كيف يتم احتساب الأسعار؟",
          answer:
            "تسعيرنا شفاف وواضح. صفحات الموقع 250 ريال، صفحات تطبيق الويب 300 ريال، شاشات التطبيق 400 ريال، ووظائف سطح المكتب 180 ريال. يتضمن كل مشروع رسوم إعداد ومناولة لمرة واحدة بقيمة 200 ريال.",
        },
        {
          question: "ما الذي يشمله النشر؟",
          answer:
            "يتضمن النشر إعداد الخادم، ضبط البيئة، تهيئة النطاق، شهادات SSL، إعداد قاعدة البيانات (إن وجدت)، والتحسين الأولي لضمان جاهزية الإنتاج والأمان.",
        },
        {
          question: "ما طرق الدفع المتاحة؟",
          answer:
            "نقبل المدفوعات بالريال أو الدولار عبر التحويل البنكي، البطاقات الائتمانية، ومعظم منصات الدفع الرقمية. يتم إرسال تفاصيل الدفع بعد الموافقة على العرض.",
        },
        {
          question: "ما المدة التي يستغرقها النشر؟",
          answer:
            "تختلف المدة حسب تعقيد المشروع. يمكن نشر المواقع البسيطة خلال 2-3 أيام عمل، بينما قد تستغرق التطبيقات المعقدة من أسبوع إلى أسبوعين مع تقديم جدول زمني مفصل أثناء التخطيط.",
        },
        {
          question: "هل تقدمون دعماً بعد النشر؟",
          answer:
            "نعم، نوفر دعماً بعد النشر لضمان سير الأمور بسلاسة، ويمكن مناقشة باقات الدعم وفق احتياجاتك أثناء طلب العرض.",
        },
      ],
    },
    cta: {
      title: "جاهز لإطلاق مشروعك؟",
      description: "ابدأ باستخدام الحاسبة أو تواصل معنا لمناقشة احتياجاتك.",
      primaryCta: "احسب عرض السعر",
      secondaryCta: "اتصل بنا",
    },
    calculatorPage: {
      title: "حاسبة تكلفة الخدمات",
      description: "احسب تكلفة مشروعك عبر حاسبتنا الشفافة",
    },
    serviceCalculator: {
      title: "حاسبة تكلفة الخدمات",
      description: "احسب تكلفة مشروعك بناءً على تسعيرنا الشفاف",
      currencyLabel: "العملة",
      fields: {
        websitePages: "صفحات الموقع (250 ريال لكل صفحة)",
        webAppPages: "صفحات تطبيق الويب (300 ريال لكل صفحة)",
        ecommercePages: "صفحات المتاجر الإلكترونية (450 ريال لكل صفحة)",
        mobileScreens: "شاشات تطبيق الجوال (400 ريال لكل شاشة)",
        desktopFunctions: "وظائف تطبيق سطح المكتب (180 ريال لكل وظيفة)",
      },
      breakdownTitle: "تفصيل التكلفة",
      breakdownTemplates: {
        website: "صفحات الموقع ({count} × 250 ريال)",
        webApp: "صفحات تطبيق الويب ({count} × 300 ريال)",
        ecommerce: "صفحات المتاجر الإلكترونية ({count} × 450 ريال)",
        mobile: "شاشات تطبيق الجوال ({count} × 400 ريال)",
        desktop: "وظائف تطبيق سطح المكتب ({count} × 180 ريال)",
      },
      subtotal: "الإجمالي الفرعي",
      setupFee: "رسوم الإعداد والمناولة",
      total: "الإجمالي",
      actions: {
        reset: "إعادة التعيين",
        continue: "متابعة للإرسال",
      },
    },
    quoteForm: {
      title: "بياناتك",
      description: "املأ بياناتك لاستلام عرض السعر",
      labels: {
        fullName: "الاسم الكامل *",
        email: "البريد الإلكتروني *",
        company: "الشركة",
        phone: "رقم الهاتف",
        notes: "ملاحظات / متطلبات المشروع",
      },
      placeholders: {
        fullName: "محمد أحمد",
        email: "example@email.com",
        company: "اسم الشركة",
        phone: "+966 5x xxx xxxx",
        notes: "أخبرنا المزيد عن مشروعك...",
      },
      submit: "إرسال طلب العرض",
      submitting: "جاري الإرسال...",
      toast: {
        successTitle: "تم إرسال طلب العرض!",
        successDescription: "أرسلنا لك بريد تأكيد وسنتواصل معك قريباً.",
        errorTitle: "خطأ",
        errorDescription: "تعذر إرسال طلب العرض. يرجى المحاولة مرة أخرى.",
      },
    },
    contactPage: {
      title: "تواصل معنا",
      description: "لديك أسئلة؟ نحن هنا لمساعدتك في احتياجات النشر.",
      form: {
        title: "أرسل رسالة",
        description: "املأ النموذج وسنرد عليك خلال 24 ساعة",
        labels: {
          fullName: "الاسم الكامل *",
          email: "البريد الإلكتروني *",
          company: "الشركة",
          message: "الرسالة *",
        },
        placeholders: {
          fullName: "محمد أحمد",
          email: "example@email.com",
          company: "اسم الشركة",
          message: "أخبرنا عن مشروعك...",
        },
        submit: "إرسال الرسالة",
        submitting: "جاري الإرسال...",
      },
      toast: {
        successTitle: "تم إرسال الرسالة!",
        successDescription: "سنعود إليك في أقرب وقت ممكن.",
        errorTitle: "خطأ",
        errorDescription: "تعذر إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      },
      contactDetails: {
        email: { label: "البريد الإلكتروني", value: "info@mdeploy.dev" },
        whatsapp: { label: "واتساب", cta: "ابدأ محادثة" },
        telegram: { label: "تيليجرام", cta: "راسلني على تيليجرام" },
        location: { label: "الموقع", value: "المملكة العربية السعودية" },
        hoursTitle: "ساعات العمل",
        hoursWeekday: "الأحد - الخميس: 9:00 ص - 6:00 م",
        hoursWeekend: "الجمعة - السبت: إجازة",
      },
    },
    footer: {
      description: "خدمات نشر احترافية للمواقع وتطبيقات الويب والجوال وسطح المكتب.",
      servicesTitle: "الخدمات",
      services: {
        website: "نشر المواقع",
        webApps: "تطبيقات الويب",
        mobileApps: "تطبيقات الجوال",
        desktopApps: "تطبيقات سطح المكتب",
      },
      companyTitle: "الشركة",
      calculator: "الحاسبة",
      contact: "تواصل",
      legalTitle: "سياسة",
      privacy: "سياسة الخصوصية",
      terms: "شروط الخدمة",
      rights: "جميع الحقوق محفوظة.",
      developedBy: "تم التطوير بواسطة",
      socialTitle: "تابعني",
      social: {
        twitter: "تويتر",
        github: "جيت هب",
        behance: "بيهانس",
        linkedin: "لينكدإن",
        blog: "المدونة",
      },
    },
    terms: {
      title: "شروط الخدمة",
      updatedLabel: "آخر تحديث",
      sections: [
        {
          title: "الموافقة على الشروط",
          body: "باستخدامك لخدمات mDeploy فإنك توافق على شروط الخدمة هذه. إذا لم توافق يرجى عدم استخدام خدماتنا.",
        },
        {
          title: "الخدمات",
          body: "توفر mDeploy خدمات نشر للمواقع، تطبيقات الويب، تطبيقات الجوال، وتطبيقات سطح المكتب. يتم توضيح المواصفات والتسليمات في اتفاقيات المشاريع الفردية.",
        },
        {
          title: "التسعير والدفع",
          body: "تسعيرنا شفاف ويعتمد على الحاسبة الموجودة في موقعنا ويتضمن رسوم إعداد ومناولة. يتم تحديد شروط الدفع في عرض مشروعك.",
        },
        {
          title: "الملكية الفكرية",
          body: "بعد السداد الكامل تحتفظ بجميع حقوق تطبيقاتك ومحتواك. تحتفظ mDeploy بحقوق أدواتها ومنهجياتها الخاصة المستخدمة في تقديم الخدمات.",
        },
        {
          title: "تحديد المسؤولية",
          body: "لا تتحمل mDeploy مسؤولية أي أضرار غير مباشرة أو خاصة أو تبعية تنتج عن استخدام خدماتنا.",
        },
        {
          title: "التواصل",
          body: "للاستفسار عن شروط الخدمة يرجى التواصل معنا عبر hello@mdeploy.dev",
        },
      ],
    },
    privacy: {
      title: "سياسة الخصوصية",
      updatedLabel: "آخر تحديث",
      sections: [
        {
          title: "مقدمة",
          body: 'تلتزم mDeploy ("نحن") بحماية خصوصيتك. توضح هذه السياسة كيف نجمع ونستخدم ونحمي معلوماتك الشخصية عند استخدام موقعنا وخدماتنا.',
        },
        {
          title: "المعلومات التي نجمعها",
          intro: "نجمع المعلومات التي تقدمها لنا مباشرة، بما في ذلك:",
          items: [
            "الاسم ومعلومات التواصل (البريد الإلكتروني، رقم الهاتف)",
            "معلومات الشركة",
            "متطلبات ومواصفات المشروع",
            "تفضيلات التواصل",
          ],
        },
        {
          title: "كيف نستخدم معلوماتك",
          intro: "نستخدم المعلومات التي نجمعها من أجل:",
          items: [
            "تقديم خدماتنا وتحسينها",
            "الرد على استفساراتك وطلباتك",
            "إرسال تحديثات حول مشاريعك",
            "الامتثال للالتزامات القانونية",
          ],
        },
        {
          title: "أمن البيانات",
          body: "نطبق إجراءات تقنية وتنظيمية مناسبة لحماية معلوماتك الشخصية من الوصول أو التعديل أو الإفصاح أو الإتلاف غير المصرح به.",
        },
        {
          title: "اتصل بنا",
          body: "إذا كانت لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى التواصل عبر hello@mdeploy.dev",
        },
      ],
    },
    adminLogin: {
      subtitleSignUp: "أنشئ حساب المشرف",
      subtitleSignIn: "دخول المشرف",
      fullName: "الاسم الكامل",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      signUp: "إنشاء حساب",
      signIn: "تسجيل الدخول",
      creating: "جاري إنشاء الحساب...",
      signingIn: "جاري تسجيل الدخول...",
      togglePromptHaveAccount: "لديك حساب بالفعل؟",
      togglePromptNoAccount: "لا تملك حساباً؟",
      toggleActionSignIn: "تسجيل الدخول",
      toggleActionSignUp: "إنشاء حساب",
      backHome: "العودة إلى الرئيسية",
      toast: {
        signUpSuccess: "تم إنشاء الحساب! يرجى التحقق من بريدك للتأكيد.",
        signInSuccess: "تم تسجيل الدخول بنجاح!",
      },
    },
    adminDashboard: {
      title: "إدارة المشاريع",
      loading: "جاري التحميل...",
      newProject: "مشروع جديد",
      dialogTitles: {
        edit: "تعديل مشروع",
        create: "إنشاء مشروع جديد",
      },
      dialogDescriptions: {
        edit: "حدث تفاصيل المشروع أدناه",
        create: "أدخل التفاصيل لإنشاء مشروع جديد",
      },
      formLabels: {
        name: "اسم المشروع",
        description: "الوصف",
        type: "نوع المشروع",
        status: "الحالة",
        clientName: "اسم العميل",
        clientEmail: "بريد العميل",
        price: "السعر (دولار)",
      },
      typeOptions: {
        website: "موقع إلكتروني",
        web_app: "تطبيق ويب",
        mobile_app: "تطبيق جوال",
        desktop_app: "تطبيق سطح مكتب",
      },
      statusOptions: {
        pending: "قيد الانتظار",
        in_progress: "قيد التنفيذ",
        completed: "مكتمل",
        cancelled: "ملغي",
      },
      formActions: {
        cancel: "إلغاء",
        submitCreate: "إنشاء مشروع",
        submitUpdate: "تحديث مشروع",
      },
      table: {
        name: "اسم المشروع",
        type: "النوع",
        client: "العميل",
        status: "الحالة",
        price: "السعر",
        created: "تاريخ الإنشاء",
        actions: "إجراءات",
      },
      empty: "لا توجد مشاريع بعد. ابدأ بإنشاء أول مشروع.",
      toasts: {
        loadError: "فشل في تحميل المشاريع",
        updateSuccess: "تم تحديث المشروع بنجاح",
        createSuccess: "تم إنشاء المشروع بنجاح",
        saveError: "فشل في حفظ المشروع",
        deleteConfirm: "هل أنت متأكد أنك تريد حذف هذا المشروع؟",
        deleteSuccess: "تم حذف المشروع بنجاح",
        deleteError: "فشل في حذف المشروع",
      },
    },
    logout: {
      label: "تسجيل الخروج",
      loading: "جاري تسجيل الخروج...",
      success: "تم تسجيل الخروج بنجاح",
      error: "فشل تسجيل الخروج",
    },
  },
}

export type Language = keyof typeof translations
export type TranslationKeys = keyof typeof translations.en
