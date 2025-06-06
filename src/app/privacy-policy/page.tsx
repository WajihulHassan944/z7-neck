import React from 'react'
import Footer from '@/component/footer'
import Link from 'next/link'
import Image from 'next/image'

const PrivacyPolicy = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className='flex justify-center items-center mb-10'>
          <Image src="/images/thelogo.png" alt="Z7 Neck Brackets Logo" width={100} height={100} />
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy for Z7 Neck Brace</h1>
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <p><strong>Effective Date:</strong> January 1, 2025</p>
            <p>
              Welcome to Z7 Neck Brace (“we,” “our,” or “us”). We are committed to protecting your privacy and ensuring your personal information is handled responsibly. This Privacy Policy describes how your data is collected, used, and protected when you visit or make a purchase from <a href="https://www.z7neckbrace.online" className="underline" target="_blank" rel="noopener noreferrer">www.z7neckbrace.online</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
            <p>
              We collect the following types of personal information when you interact with our site:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Contact Information:</strong> Name, email, phone number, and shipping/billing address</li>
              <li><strong>Order Information:</strong> Items purchased, payment method (via secure third-party processors), and order history</li>
              <li><strong>Device Information:</strong> IP address, browser type, device type, and activity via cookies and analytics tools</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
            <p>Your information helps us:</p>
            <ul className="list-disc pl-6">
              <li>Process and fulfill orders</li>
              <li>Communicate with you about orders and inquiries</li>
              <li>Improve our website, products, and services</li>
              <li>Send promotional offers (only if you opt-in)</li>
              <li>Comply with legal requirements</li>
            </ul>
            <p>We do <strong>not</strong> sell your data to third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">3. Sharing Information</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6">
              <li>Shipping providers to deliver your order</li>
              <li>Payment processors to securely handle transactions</li>
              <li>Email marketing platforms (if you opt-in for newsletters)</li>
            </ul>
            <p>All partners are contractually required to keep your information secure.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">4. Your Privacy Choices</h2>
            <ul className="list-disc pl-6">
              <li>Opt out of promotional emails at any time</li>
              <li>Request to view, update, or delete your personal information by contacting us</li>
              <li>Adjust cookie settings through your browser</li>
            </ul>
            <p className="mt-2">Note: You cannot opt out of transactional emails related to orders.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">5. Security</h2>
            <p>
              We use industry-standard security measures to protect your data, including encryption, firewalls, and secure servers. However, no online system is 100% foolproof.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">6. Cookies</h2>
            <p>
              Our site uses cookies to improve user experience and collect anonymous analytics. You can disable cookies in your browser settings if desired.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">7. Childrens Privacy</h2>
            <p>
              We do not knowingly collect personal data from children under 13. Our products and website are intended for adult use only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">8. Policy Updates</h2>
            <p>
              We may revise this policy as needed. Updates will be posted to this page with an updated effective date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or your personal data, please contact us at:<br />
              <span className="block">Email: <a href="mailto:info@z7neckbrace.com" className="underline">info@z7neckbrace.com</a></span>
              <span className="block">Phone: 623-428-8600</span>
              <span className="block">Website: <a href="https://www.z7neckbrace.online" className="underline" target="_blank" rel="noopener noreferrer">www.z7neckbrace.online</a></span>
            </p>
          </section>
        </div>
      </div>
      <div id="footer">
        <Footer />
      </div>
    </>
  )
}

export default PrivacyPolicy