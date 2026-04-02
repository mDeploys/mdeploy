"use client"

export default function PassGenPrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto max-w-4xl px-4 lg:px-8">
        <h1 className="mb-8 text-4xl font-bold">Privacy Policy for PassGen Vault</h1>
        <div className="prose prose-neutral max-w-none space-y-6 dark:prose-invert">
          <p className="text-muted-foreground">
            Last updated: April 2, 2026
          </p>

          <p className="leading-relaxed text-muted-foreground">
            PassGen Vault ("PassGen", "we", "our", or "us") is a password manager and secure vault application for iPhone. This Privacy Policy explains what data may be processed when you use the PassGen Vault mobile app.
          </p>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">1. Data We Process</h2>
            <p className="leading-relaxed text-muted-foreground">
              PassGen Vault is designed to work primarily as a local encrypted vault on the user’s device.
            </p>
            <p className="leading-relaxed text-muted-foreground">
              Depending on the features you use, the app may process:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Email address, when you sign in with Apple or Google</li>
              <li>User ID, for account authentication and account-linked features</li>
              <li>Purchase and subscription status, through RevenueCat and Apple in-app purchases</li>
              <li>Encrypted user vault content, if you enable cloud sync or backup features</li>
              <li>Google Drive account access, if you choose Google Drive as your cloud sync provider</li>
              <li>Camera access, only when scanning 2FA QR codes</li>
              <li>Face ID / device authentication, only to unlock the vault securely on device</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">2. How We Use Data</h2>
            <p className="leading-relaxed text-muted-foreground">
              We use data only to provide app functionality, including:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Authenticating your account</li>
              <li>Enabling optional cloud-linked features</li>
              <li>Managing paid plans and subscription access</li>
              <li>Syncing or restoring encrypted vault backups when you choose to use cloud features</li>
              <li>Scanning 2FA setup QR codes</li>
              <li>Unlocking the app securely using Face ID or device authentication</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">3. Local Vault Storage</h2>
            <p className="leading-relaxed text-muted-foreground">
              Your vault data is intended to remain encrypted. Local vault data is stored on your device. If you use cloud sync or backup features, encrypted vault data may be transmitted to the selected cloud provider.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">4. Third-Party Services</h2>
            <p className="leading-relaxed text-muted-foreground">
              PassGen Vault may use the following third-party services depending on the features you enable:
            </p>
             <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Apple Sign In</li>
              <li>Google Sign-In</li>
              <li>Supabase</li>
              <li>RevenueCat</li>
              <li>Google Drive</li>
              <li>Apple iCloud</li>
            </ul>
            <p className="leading-relaxed text-muted-foreground">
              These services may process account, authentication, subscription, or storage-related data as required to provide their functionality.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">5. Tracking and Advertising</h2>
            <p className="leading-relaxed text-muted-foreground">
              PassGen Vault does not use personal data for third-party advertising or cross-app tracking.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">6. Data Sharing</h2>
            <p className="leading-relaxed text-muted-foreground">
              We do not sell your personal data. Data is only shared with service providers or platforms required to deliver the features you actively use.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">7. Data Retention</h2>
            <p className="leading-relaxed text-muted-foreground">
              Account-related data may be retained as necessary to support authentication, subscription status, and backend functionality. Encrypted vault backups stored with cloud providers remain subject to the storage choices you make.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">8. Your Choices</h2>
            <p className="leading-relaxed text-muted-foreground">
              You may:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-muted-foreground">
              <li>Use the local vault without account sign-in</li>
              <li>Disconnect your linked account</li>
              <li>Disable cloud sync</li>
              <li>Remove the app and local data from your device</li>
              <li>Manage or cancel subscriptions through Apple</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold">9. Contact</h2>
            <p className="leading-relaxed text-muted-foreground">
              If you have questions about this Privacy Policy, contact:<br />
              <a href="mailto:jalal@mdeploy.dev" className="text-primary hover:underline">jalal@mdeploy.dev</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
