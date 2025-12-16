import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container mx-auto px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">MDeploy</h3>
            <p className="text-sm text-muted-foreground">
              Professional deployment services for websites, web apps, mobile apps, and desktop applications.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                  Website Deployment
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                  Web Apps
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-muted-foreground hover:text-foreground">
                  Desktop Development
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/calculator" className="text-muted-foreground hover:text-foreground">
                  Calculator
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MDeploy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
