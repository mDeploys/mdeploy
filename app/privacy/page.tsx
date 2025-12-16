export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-24">
      <div className="container mx-auto max-w-4xl px-4 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>

        <div className="prose prose-neutral max-w-none space-y-6 dark:prose-invert">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
            <p className="leading-relaxed text-muted-foreground">
              MDeploy ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how
              we collect, use, and safeguard your personal information when you use our website and services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Information We Collect</h2>
            <p className="leading-relaxed text-muted-foreground">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Name and contact information (email, phone number)</li>
              <li>Company information</li>
              <li>Project requirements and specifications</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">How We Use Your Information</h2>
            <p className="leading-relaxed text-muted-foreground">We use the information we collect to:</p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Provide and improve our services</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send you updates about your projects</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Data Security</h2>
            <p className="leading-relaxed text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your personal information
              against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
            <p className="leading-relaxed text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us at hello@mdeploy.dev
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
