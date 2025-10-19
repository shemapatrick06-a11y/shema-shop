import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.265.058 2.148.277 2.91.576.78.303 1.434.77 2.05 1.385.617.612 1.083 1.27 1.386 2.05.298.762.518 1.645.576 2.91.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.058 1.265-.278 2.148-.576 2.91-.303.78-.77 1.434-1.385 2.05-.612.617-1.27 1.083-2.05 1.386-.762.298-1.645.518-2.91.576-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.265-.058-2.148-.278-2.91-.576-.78-.303-1.434-.77-2.05-1.385C2.227 17.77 1.76 17.116 1.458 16.336c-.298-.762-.518-1.645-.576-2.91C.825 15.584.813 15.204.813 12s.012-3.584.07-4.85c.058-1.265.278-2.148.576-2.91.303-.78.77-1.434 1.385-2.05.612-.617 1.27-1.083 2.05-1.386.762-.298 1.645-.518 2.91-.576C8.416 2.175 8.796 2.163 12 2.163m0-1.082c-3.259 0-3.667.014-4.947.072-1.28.058-2.277.266-3.084.576-.827.32-1.554.81-2.25 1.507C1.002 4.24.51 4.967.19 5.794c-.31.807-.518 1.804-.576 3.084C-.443 10.154-.455 10.56-.455 12s.012 1.846.07 3.12c.058 1.28.266 2.277.576 3.084.32.827.81 1.554 1.507 2.25.697.697 1.424 1.188 2.25 1.507.807.31 1.804.518 3.084.576 1.28.058 1.688.072 4.947.072s3.667-.014 4.947-.072c1.28-.058 2.277-.266 3.084-.576.827-.32 1.554-.81 2.25-1.507.697-.697 1.188-1.424 1.507-2.25.31-.807.518-1.804.576-3.084.058-1.274.07-1.68.07-3.12s-.012-1.846-.07-3.12c-.058-1.28-.266-2.277-.576-3.084-.32-.827-.81-1.554-1.507-2.25C20.998 2.227 20.27 1.736 19.444 1.426c-.807-.31-1.804-.518-3.084-.576C15.084 1.095 14.676 1.082 12 1.082zM12 7.23a4.77 4.77 0 1 0 0 9.54 4.77 4.77 0 0 0 0-9.54zm0 7.822a3.052 3.052 0 1 1 0-6.104 3.052 3.052 0 0 1 0 6.104zM18.804 5.196a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
  </svg>
);

export default function SiteFooter() {
  return (
    <footer className="w-full border-t bg-card">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 text-center md:grid-cols-4 md:text-left">
        <div>
          <h3 className="font-headline text-lg font-semibold">Shema Shop</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Your destination for modern fashion.
          </p>
        </div>
        <div>
          <h4 className="font-semibold tracking-wider text-muted-foreground">
            SUBSCRIBE
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            Get the latest styles and offers.
          </p>
          <div className="mt-4 flex justify-center md:justify-start">
            <Input
              type="email"
              placeholder="Your email"
              className="max-w-xs"
            />
            <Button className="ml-2">Subscribe</Button>
          </div>
        </div>
        <div>
          <h4 className="font-semibold tracking-wider text-muted-foreground">
            FOLLOW US
          </h4>
          <div className="mt-4 flex justify-center gap-4 md:justify-start">
            <Link href="https://www.facebook.com/profile.php?id=100083285062420" aria-label="Facebook" target="_blank">
              <FacebookIcon className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
            <Link href="https://www.instagram.com/shema9862/" aria-label="Instagram" target="_blank">
              <InstagramIcon className="h-6 w-6 text-muted-foreground transition-colors hover:text-foreground" />
            </Link>
          </div>
        </div>
        <div>
          <h4 className="font-semibold tracking-wider text-muted-foreground">
            CONTACT
          </h4>
          <p className="mt-2 text-sm text-muted-foreground">
            <a href="mailto:shemapatrick06@gmail.com" className="hover:text-foreground">
              shemapatrick06@gmail.com
            </a>
          </p>
        </div>
      </div>
      <div className="border-t">
        <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-6 text-sm text-muted-foreground">
          <p>© 2025 Shema Shop. All Rights Reserved.</p>
          <div className="flex gap-4">
            <Link href="/admin" className="hover:text-foreground">
              Admin
            </Link>
            <Link href="#" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
