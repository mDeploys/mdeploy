export default function TermsPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto max-w-4xl px-4 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>

        <div className="prose prose-neutral max-w-none space-y-6 dark:prose-invert">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Agreement to Terms</h2>
            <p className="leading-relaxed text-muted-foreground">
              By accessing or using MDeploy's services, you agree to be bound by these Terms of Service. If you do not
              agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Services</h2>
            <p className="leading-relaxed text-muted-foreground">
              MDeploy provides deployment services for websites, web applications, mobile applications, and desktop
              applications. Service specifications and deliverables will be outlined in individual project agreements.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Pricing and Payment</h2>
            <p className="leading-relaxed text-muted-foreground">
              Our pricing is transparent and based on the calculator provided on our website. All prices are subject to
              the inclusion of a setup and handling fee. Payment terms will be specified in your project quote.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Intellectual Property</h2>
            <p className="leading-relaxed text-muted-foreground">
              Upon full payment, you retain all rights to your deployed applications and content. MDeploy retains rights
              to our proprietary tools, processes, and methodologies used in providing our services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Limitation of Liability</h2>
            <p className="leading-relaxed text-muted-foreground">
              MDeploy shall not be liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use of our services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Contact</h2>
            <p className="leading-relaxed text-muted-foreground">
              For questions about these Terms of Service, please contact us at hello@mdeploy.dev
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
