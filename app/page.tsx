import Link from "next/link"
import {
  ArrowRight,
  Server,
  Smartphone,
  Globe,
  Monitor,
  Zap,
  Shield,
  Rocket,
  Sparkles,
  Cloud,
  Code2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceCalculator } from "@/components/service-calculator"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <section className="relative min-h-[90vh] overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-800 to-fuchsia-900 animate-gradient" />

        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-purple-500/30 blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-fuchsia-500/30 blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-3xl" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="container relative mx-auto px-4 py-32 lg:px-8 lg:py-40">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                Professional Deployment Services
              </div>

              <h1 className="mb-6 text-balance text-4xl font-bold tracking-tight text-white lg:text-6xl xl:text-7xl">
                Deploy with
                <span className="block bg-gradient-to-r from-purple-300 via-pink-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Confidence
                </span>
              </h1>

              <p className="mb-8 text-pretty text-lg text-purple-100/90 lg:text-xl">
                From websites to desktop applications, we handle your deployment needs with expertise and precision.
                Transparent pricing, reliable delivery.
              </p>

              <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 text-base bg-white text-purple-900 shadow-xl shadow-purple-900/30 hover:bg-purple-100"
                >
                  <Link href="/calculator">
                    Calculate Your Project <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                <div>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-purple-200/70">Projects Deployed</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">99.9%</div>
                  <div className="text-sm text-purple-200/70">Uptime Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">24/7</div>
                  <div className="text-sm text-purple-200/70">Support</div>
                </div>
              </div>
            </div>

            {/* Floating cards illustration */}
            <div className="relative hidden lg:block">
              <div className="relative h-[500px]">
                {/* Main card */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-float">
                  <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
                        <Rocket className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <div className="font-semibold text-white">Deployment Ready</div>
                        <div className="text-xs text-purple-200/70">All systems go</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                        <span className="text-sm text-purple-100">Server configured</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                        <span className="text-sm text-purple-100">SSL installed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-400" />
                        <span className="text-sm text-purple-100">CDN enabled</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating icons */}
                <div className="absolute top-10 left-10 animate-float" style={{ animationDelay: "1s" }}>
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-xl">
                    <Globe className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="absolute top-20 right-10 animate-float-delay">
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-xl">
                    <Smartphone className="h-7 w-7 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-20 left-20 animate-float" style={{ animationDelay: "0.5s" }}>
                  <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-xl">
                    <Monitor className="h-7 w-7 text-white" />
                  </div>
                </div>

                <div className="absolute bottom-10 right-20 animate-float-delay">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl">
                    <Cloud className="h-8 w-8 text-white" />
                  </div>
                </div>

                <div className="absolute top-1/3 right-5 animate-float" style={{ animationDelay: "1.5s" }}>
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-xl">
                    <Code2 className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Services Section - updated colors */}
      <section id="services" className="border-b border-border py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Server className="h-4 w-4" />
              What We Offer
            </div>
            <h2 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">Our Services</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Comprehensive deployment solutions tailored to your needs
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="group overflow-hidden border-2 transition-all hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10">
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-purple-500/10 to-violet-500/10">
                <Image
                  src="/website-deployment-browser-wireframe-modern-blue.jpg"
                  alt="Website Deployment"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <div className="mb-2 h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Website Deployment</CardTitle>
                <CardDescription className="text-base font-semibold text-purple-600 dark:text-purple-400">
                  250 SAR per page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Static and dynamic website deployment with optimized performance and SEO.
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-2 transition-all hover:border-fuchsia-500 hover:shadow-xl hover:shadow-fuchsia-500/10">
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10">
                <Image
                  src="/web-application-dashboard-api-database-purple.jpg"
                  alt="Web Applications"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <div className="mb-2 h-12 w-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-pink-600 flex items-center justify-center">
                  <Server className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Web Applications</CardTitle>
                <CardDescription className="text-base font-semibold text-fuchsia-600 dark:text-fuchsia-400">
                  300 SAR per page
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Full-stack web application deployment with database integration and APIs.
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-2 transition-all hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-500/10">
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-emerald-500/10 to-teal-500/10">
                <Image
                  src="/mobile-app-ios-android-smartphone-interface-green.jpg"
                  alt="Mobile Apps"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <div className="mb-2 h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Mobile Apps</CardTitle>
                <CardDescription className="text-base font-semibold text-emerald-600 dark:text-emerald-400">
                  400 SAR per screen
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  iOS and Android app deployment to stores with proper configuration.
                </p>
              </CardContent>
            </Card>

            <Card className="group overflow-hidden border-2 transition-all hover:border-amber-500 hover:shadow-xl hover:shadow-amber-500/10">
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-amber-500/10 to-orange-500/10">
                <Image
                  src="/desktop-windows-application-software-interface-ora.jpg"
                  alt="Desktop Apps"
                  width={400}
                  height={200}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <CardHeader>
                <div className="mb-2 h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Monitor className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Desktop Apps</CardTitle>
                <CardDescription className="text-base font-semibold text-amber-600 dark:text-amber-400">
                  180 SAR per function
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Windows desktop application development and distribution setup.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculator Preview - updated with purple theme */}
      <section className="relative overflow-hidden border-b border-border py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-background to-fuchsia-500/5" />
        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              Instant Pricing
            </div>
            <h2 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">Calculate Your Project Cost</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              Get instant pricing with our transparent calculator
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <ServiceCalculator />
            <div className="mt-6 text-center">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-700 hover:to-fuchsia-700"
              >
                <Link href="/calculator">Go to Full Calculator & Submit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section - updated with purple gradients */}
      <section className="border-b border-border py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Rocket className="h-4 w-4" />
              Our Process
            </div>
            <h2 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">How We Work</h2>
            <p className="mx-auto max-w-2xl text-pretty text-lg text-muted-foreground">
              A streamlined process from quote to deployment
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 text-xl font-bold text-white shadow-lg shadow-purple-500/25">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Get a Quote</h3>
              <p className="text-sm text-muted-foreground">
                Use our calculator to get instant pricing for your project requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-pink-600 text-xl font-bold text-white shadow-lg shadow-fuchsia-500/25">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Discuss & Plan</h3>
              <p className="text-sm text-muted-foreground">
                We review your requirements and create a detailed deployment plan.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-xl font-bold text-white shadow-lg shadow-emerald-500/25">
                <Rocket className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Deploy & Deliver</h3>
              <p className="text-sm text-muted-foreground">
                We handle the deployment with precision and hand over a production-ready system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-b border-border bg-muted/40 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Testimonials
            </div>
            <h2 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">Trusted by Developers</h2>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            <Card className="border-2 border-transparent hover:border-purple-500/50 transition-colors">
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-sm italic text-muted-foreground">
                  "MDeploy handled our entire deployment pipeline. Professional, efficient, and transparent pricing made
                  the whole process seamless."
                </p>
                <div className="font-medium">Sarah Chen</div>
                <div className="text-sm text-muted-foreground">Tech Lead, StartupCo</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-fuchsia-500/50 transition-colors">
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-sm italic text-muted-foreground">
                  "The calculator helped us budget accurately, and the delivery exceeded expectations. Highly recommend
                  for any deployment needs."
                </p>
                <div className="font-medium">Ahmed Al-Rashid</div>
                <div className="text-sm text-muted-foreground">CTO, TechFlow</div>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent hover:border-emerald-500/50 transition-colors">
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-sm italic text-muted-foreground">
                  "From mobile apps to web platforms, MDeploy has been our go-to deployment partner. Reliable and
                  knowledgeable team."
                </p>
                <div className="font-medium">Maria Garcia</div>
                <div className="text-sm text-muted-foreground">Product Manager, InnovateLabs</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-b border-border py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold lg:text-4xl">Frequently Asked Questions</h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How is pricing calculated?</AccordionTrigger>
                <AccordionContent>
                  Our pricing is transparent and straightforward. Website pages are 250 SAR each, web app pages are 300
                  SAR, mobile screens are 400 SAR, and desktop functions are 180 SAR. Every project includes a one-time
                  setup and handling fee of 200 SAR.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>What's included in deployment?</AccordionTrigger>
                <AccordionContent>
                  Deployment includes server configuration, environment setup, domain configuration, SSL certificates,
                  database setup (if applicable), and initial optimization. We ensure your application is
                  production-ready and secure.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept payments in both SAR and USD via bank transfer, credit card, and major digital payment
                  platforms. Payment details will be provided after quote approval.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>How long does deployment take?</AccordionTrigger>
                <AccordionContent>
                  Deployment timelines vary based on project complexity. Simple websites can be deployed within 2-3
                  business days, while complex applications may take 1-2 weeks. We'll provide a detailed timeline during
                  the planning phase.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Do you offer post-deployment support?</AccordionTrigger>
                <AccordionContent>
                  Yes, we provide post-deployment support to ensure everything runs smoothly. Support packages can be
                  discussed based on your needs during the quote process.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section - updated with purple gradient */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-violet-600 to-fuchsia-600" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

        <div className="container relative mx-auto px-4 text-center lg:px-8">
          <h2 className="mb-4 text-balance text-3xl font-bold text-white lg:text-4xl">Ready to Deploy Your Project?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-pretty text-lg text-white/90">
            Get started with our calculator or reach out to discuss your specific needs.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-white text-purple-700 hover:bg-purple-50">
              <Link href="/calculator">Calculate Your Quote</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
