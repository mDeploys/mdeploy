export const translations = {
  en: {
    home: "Home",
    services: "Services",
    calculator: "Pricing",
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
    features: {
      badge: "Why Choose Us",
      title: "Built for Scale & Security",
      description: "We don't just deploy; we optimize your infrastructure for peak performance and military-grade security.",
      items: [
        {
          title: "High Performance",
          description: "Lightning-fast edge caching and optimized compute resources ensure your app loads instantly globally.",
        },
        {
          title: "Enterprise Security",
          description: "DDoS protection, WAF, and automated SSL management keep your data and users safe.",
        },
        {
          title: "Zero-Downtime Updates",
          description: "Push changes confidently. Our blue-green deployment strategy ensures your users never face downtime.",
        },
        {
          title: "Global Scalability",
          description: "Infrastructure that grows with you. From your first user to your millionth, we handle the load.",
        },
      ]
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
      badge: "Scale your vision",
      title: "Ready to Launch Your Project?",
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
      description: "Calculate your cost based on our transparent pricing",
      developmentTitle: "Development Services",
      designTitle: "Design & Templates",
      addonsTitle: "Add-ons",
      summaryTitle: "Cost Breakdown",
      summarySubtitle: "Estimated project cost",
      selectServicesPrompt: "Select services to see cost breakdown",
      setupFeeDetails: "Project Setup & Initialization",
      setupFeeDescription: "One-time fee for repo & deployment config",
      developmentLabel: "Development",
      designLabel: "Design",
      setupLabel: "Setup",
      addonsLabel: "Addons",
      estimatedTotal: "Estimated Total",
      approxLabel: "approx.",

      fields: {
        websitePages: "Front-end Website ({price} / Page)",
        webAppPages: "Web App ({price} / Page)",
        ecommercePages: "E-Commerce Website ({price} / Page)",
        mobileScreens: "Mobile APP ({price} / Screen)",
        desktopFunctions: "Desktop App ({price} / Function)",
        landingPages: "Landing Page ({price}/SET)",
        wordpressTemplates: "WordPress Template ({price} / SET)",
        logoDesigns: "Logo Design ({price}/SET)",
        brandingDesigns: "Branding Design ({price}/SET)",
        backendHosting: "Backend Hosting ({price} / Year)",
        webHosting5GB: "Web Hosting 5GB ({price}/Year)",
        webHosting10GB: "Web Hosting 10GB ({price}/Year)",
        cloudHosting20GB: "Cloud Hosting 20GB ({price}/Year)",
        paymentGateway: "Add Payment Getaway ({price} - One time)",
        mailServer: "Setup Mail Server ({price} - One time)",
      },
      breakdownTitle: "Cost Breakdown",
      breakdownTemplates: {
        website: "Front-end Website ({count} × {price})",
        webApp: "Web App ({count} × {price})",
        ecommerce: "E-Commerce Website ({count} × {price})",
        mobile: "Mobile APP ({count} × {price})",
        desktop: "Desktop App ({count} × {price})",
        landing: "Landing Pages ({count} × {price})",
        wordpress: "WordPress Templates ({count} × {price})",
        logo: "Logo Designs ({count} × {price})",
        branding: "Branding Designs ({count} × {price})",
        backendHosting: "Backend Hosting ({price})",
        webHosting5GB: "Web Hosting 5GB ({price})",
        webHosting10GB: "Web Hosting 10GB ({price})",
        cloudHosting20GB: "Cloud Hosting 20GB ({price})",
        paymentGateway: "Payment Getaway ({price})",
        mailServer: "Mail Server ({price})",
      },
      subtotal: "Subtotal",
      setupFee: "SQL Setup and Process",
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
      description: "Have a specific project in mind or need expert deployment advice? Our team is ready to help you scale.",
      form: {
        title: "Send us a Message",
        description: "Tell us about your project and we'll get back to you with a tailored solution within 24 hours.",
        labels: {
          fullName: "Full Name *",
          email: "Email *",
          phone: "Phone",
          country: "Country",
          company: "Company / Organization",
          message: "Project Details *",
        },
        placeholders: {
          fullName: "John Doe",
          email: "john@example.com",
          phone: "+966 5x xxx xxxx",
          country: "Saudi Arabia",
          company: "Acme Corp",
          message: "Describe your project, timeline, and technical requirements...",
        },
        submit: "Send Message",
        submitting: "Processing...",
      },
      toast: {
        successTitle: "Message Received",
        successDescription: "Thank you for reaching out. A specialist will review your request and contact you soon.",
        errorTitle: "Submission Error",
        errorDescription: "We couldn't process your message. Please try again or contact us via WhatsApp.",
      },
      contactDetails: {
        email: { label: "Direct Email", value: "info@mdeploy.dev" },
        whatsapp: { label: "WhatsApp Support", cta: "Chat with us" },
        telegram: { label: "Telegram", cta: "Message our team" },
        location: { label: "Headquarters", value: "Saudi Arabia" },
        hoursTitle: "Business Hours",
        hoursWeekday: "Sunday - Thursday: 9:00 AM - 6:00 PM (GMT+3)",
        hoursWeekend: "Friday - Saturday: Support via Email",
      },
      faq: {
        title: "Common Questions",
        items: [
          {
            question: "What information do you need for a quote?",
            answer: "For an accurate estimate, please provide details about your tech stack (e.g., Next.js, Flutter), the number of pages/screens, and any specific third-party integrations required.",
          },
          {
            question: "Do you handle zero-downtime deployments?",
            answer: "Yes, we specialize in seamless deployments using modern CI/CD pipelines to ensure your services remain online during updates.",
          },
          {
            question: "Is there ongoing maintenance available?",
            answer: "Absolutely. We offer various support levels to monitor and manage your infrastructure long after the initial delivery.",
          },
        ]
      }
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
      calculator: "Pricing",
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
        invalidCredentials: "Invalid email or password.",
        networkError: "Unable to reach the authentication server. Please try again.",
        configMissing: "Supabase keys are missing. Update NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
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
        authRequired: "Please sign in to access the admin dashboard",
        configMissing: "Supabase keys are missing. Update NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      },
    },
    logout: {
      label: "Logout",
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Failed to logout",
    },
    appsGallery: {
      title: "My APPs",
      description: "Explore our collection of deployed applications.",
      empty: "No apps found.",
      error: "Failed to load apps.",
      viewProject: "View Project",
      preview: "Preview",
      download: "Download",
      form: {
        title: "Product Title",
        thumbnail: "Product Logo (Thumbnail URL)",
        url: "Project URL",
        previewUrl: "Preview URL",
        description: "Project Description",
        descriptionAr: "(Arabic)",
        downloadUrl: "Download Link",
      }
    },
    cookieBanner: {
      message: "We use cookies to improve your experience. By continuing to visit this site you agree to our use of cookies.",
      accept: "Accept",
      decline: "Decline",
    },
  },
  ar: {
    home: "الرئيسية",
    services: "الخدمات",
    calculator: "الأسعار",
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
    features: {
      badge: "لماذا تختارنا",
      title: "مبني للتوسع والأمان",
      description: "نحن لا نكتفي بالنشر؛ بل نقوم بتحسين بنيتك التحتية لأقصى أداء وأمان عسكري.",
      items: [
        {
          title: "أداء عالي",
          description: "تخزين مؤقت سريع وحوسبة محسّنة لضمان تحميل تطبيقك فورياً عالمياً.",
        },
        {
          title: "أمان المؤسسات",
          description: "حماية DDoS، جدار حماية (WAF)، وإدارة SSL تلقائية للحفاظ على أمان بياناتك.",
        },
        {
          title: "تحديثات بدون توقف",
          description: "انشر التغييرات بثقة. استراتيجية النشر الخاصة بنا تضمن عدم توقف الخدمة أثناء التحديث.",
        },
        {
          title: "توسع عالمي",
          description: "بنية تحتية تنمو معك. من أول مستخدم إلى المليون، نحن نتعامل مع الحمل.",
        },
      ]
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
      badge: "وسّع طموحك",
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
      developmentTitle: "خدمات التطوير",
      designTitle: "التصميم والقوالب",
      addonsTitle: "الإضافات",
      summaryTitle: "تفصيل التكلفة",
      summarySubtitle: "التكلفة التقديرية للمشروع",
      selectServicesPrompt: "اختر الخدمات لعرض تفاصيل التكلفة",
      setupFeeDetails: "إعداد وتهيئة المشروع",
      setupFeeDescription: "رسوم لمرة واحدة لإعداد المستودع والنشر",
      developmentLabel: "تطوير",
      designLabel: "تصميم",
      setupLabel: "إعداد",
      addonsLabel: "إضافات",
      estimatedTotal: "التقدير الإجمالي",
      approxLabel: "تقريباً",
      currencyLabel: "العملة",
      complexity: {
        label: "التعقيد",
        simple: "بسيط (x1)",
        standard: "متوسط (x1.5)",
        complex: "معقد (x2)",
      },

      fields: {
        websitePages: "موقع واجهة أمامية ({price} / صفحة)",
        webAppPages: "تطبيق ويب ({price} / صفحة)",
        ecommercePages: "موقع تجارة إلكترونية ({price} / صفحة)",
        mobileScreens: "تطبيق جوال ({price} / شاشة)",
        desktopFunctions: "تطبيق سطح المكتب ({price} / وظيفة)",
        landingPages: "صفحة هبوط ({price}/مجموعة)",
        wordpressTemplates: "قالب ووردبريس ({price}/مجموعة)",
        logoDesigns: "تصميم شعار ({price}/مجموعة)",
        brandingDesigns: "تصميم هوية ({price}/مجموعة)",
        backendHosting: "استضافة Backend ({price} / سنة)",
        webHosting5GB: "استضافة ويب 5GB ({price} / سنة)",
        webHosting10GB: "استضافة ويب 10GB ({price} / سنة)",
        cloudHosting20GB: "استضافة سحابية 20GB ({price} / سنة)",
        paymentGateway: "بوابة دفع ({price} - مرة واحدة)",
        mailServer: "إعداد خادم البريد ({price} - مرة واحدة)",
      },
      breakdownTitle: "تفصيل التكلفة",
      breakdownTemplates: {
        website: "موقع واجهة أمامية ({count} × {price})",
        webApp: "تطبيق ويب ({count} × {price})",
        ecommerce: "موقع تجارة إلكترونية ({count} × {price})",
        mobile: "تطبيق جوال ({count} × {price})",
        desktop: "تطبيق سطح المكتب ({count} × {price})",
        landing: "صفحات هبوط ({count} × {price})",
        wordpress: "قوالب ووردبريس ({count} × {price})",
        logo: "تصميم شعار ({count} × {price})",
        branding: "تصميم هوية ({count} × {price})",
        backendHosting: "استضافة Backend ({price})",
        webHosting5GB: "استضافة ويب 5GB ({price})",
        webHosting10GB: "استضافة ويب 10GB ({price})",
        cloudHosting20GB: "استضافة سحابية 20GB ({price})",
        paymentGateway: "بوابة دفع ({price})",
        mailServer: "خادم بريد ({price})",
      },
      subtotal: "الإجمالي الفرعي",
      setupFee: "إعداد ومعالجة SQL",
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
      description: "هل لديك مشروع معين أو تحتاج إلى استشارة خبيرة في النشر؟ فريقنا جاهز لمساعدتك في التوسع.",
      form: {
        title: "أرسل لنا رسالة",
        description: "أخبرنا عن مشروعك وسنعاود الاتصال بك بحل مخصص خلال 24 ساعة.",
        labels: {
          fullName: "الاسم الكامل *",
          email: "البريد الإلكتروني *",
          phone: "رقم الهاتف",
          country: "الدولة",
          company: "الشركة / المنظمة",
          message: "تفاصيل المشروع *",
        },
        placeholders: {
          fullName: "محمد أحمد",
          email: "example@email.com",
          phone: "+966 5x xxx xxxx",
          country: "المملكة العربية السعودية",
          company: "اسم الشركة",
          message: "صف مشروعك، الجدول الزمني، والمتطلبات التقنية...",
        },
        submit: "إرسال الرسالة",
        submitting: "جاري المعالجة...",
      },
      toast: {
        successTitle: "تم استلام الرسالة",
        successDescription: "شكراً لتواصلك معنا. سيراجع أحد المتخصصين طلبك ويتصل بك قريباً.",
        errorTitle: "خطأ في الإرسال",
        errorDescription: "لم نتمكن من معالجة رسالتك. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.",
      },
      contactDetails: {
        email: { label: "البريد الإلكتروني المباشر", value: "info@mdeploy.dev" },
        whatsapp: { label: "دعم واتساب", cta: "تحدث معنا" },
        telegram: { label: "تيليجرام", cta: "راسل فريقنا" },
        location: { label: "المقر الرئيسي", value: "المملكة العربية السعودية" },
        hoursTitle: "ساعات العمل",
        hoursWeekday: "الأحد - الخميس: 9:00 ص - 6:00 م (GMT+3)",
        hoursWeekend: "الجمعة - السبت: دعم عبر البريد الإلكتروني",
      },
      faq: {
        title: "الأسئلة الشائعة",
        items: [
          {
            question: "ما هي المعلومات التي تحتاجونها لتقديم عرض سعر؟",
            answer: "للحصول على تقدير دقيق، يرجى تقديم تفاصيل حول التقنيات المستخدمة (مثل Next.js، Flutter)، وعدد الصفحات/الشاشات، وأي تكاملات خارجية مطلوبة.",
          },
          {
            question: "هل تديرون عمليات النشر بدون توقف (Zero-downtime)؟",
            answer: "نعم، نحن متخصصون في عمليات النشر السلسة باستخدام أنابيب CI/CD الحديثة لضمان بقاء خدماتك متصلة بالإنترنت أثناء التحديثات.",
          },
          {
            question: "هل تتوفر صيانة مستمرة؟",
            answer: "بالتأكيد. نحن نقدم مستويات دعم متنوعة لمراقبة وإدارة بنيتك التحتية بعد فترة طويلة من التسليم الأولي.",
          },
        ]
      }
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
      calculator: "الأسعار",
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
        invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
        networkError: "تعذر الوصول إلى خادم المصادقة، حاول مرة أخرى لاحقًا.",
        configMissing: "بيانات Supabase غير مضبوطة. حدّث المتغيرات NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY.",
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
        authRequired: "يرجى تسجيل الدخول للوصول إلى لوحة التحكم",
        configMissing: "بيانات Supabase غير مضبوطة. حدّث المتغيرات NEXT_PUBLIC_SUPABASE_URL و NEXT_PUBLIC_SUPABASE_ANON_KEY.",
      },
    },
    logout: {
      label: "تسجيل الخروج",
      loading: "جاري تسجيل الخروج...",
      success: "تم تسجيل الخروج بنجاح",
      error: "فشل تسجيل الخروج",
    },
    appsGallery: {
      title: "تطبيقاتي",
      description: "تصفح مجموعتنا من التطبيقات المنشورة.",
      empty: "لا توجد تطبيقات.",
      error: "فشل تحميل التطبيقات.",
      viewProject: "عرض المشروع",
      preview: "معاينة",
      download: "تحميل",
      form: {
        title: "عنوان المنتج",
        thumbnail: "شعار المنتج (رابط الصورة)",
        url: "رابط المشروع",
        previewUrl: "رابط المعاينة",
        description: "وصف المشروع",
        descriptionAr: "(بالعربية)",
        downloadUrl: "رابط التحميل",
      }
    },
    cookieBanner: {
      message: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك. من خلال الاستمرار في زيارة هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.",
      accept: "قبول",
      decline: "رفض",
    },
  },
}

export type Language = keyof typeof translations
export type TranslationKeys = keyof typeof translations.en
