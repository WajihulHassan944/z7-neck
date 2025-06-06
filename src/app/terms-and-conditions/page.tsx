import React from 'react'
import Footer from '@/component/footer'
import Image from 'next/image'
import Link from 'next/link'

const TermsAndConditions = () => {
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/" className='flex justify-center items-center mb-10'>
          <Image src="/images/thelogo.png" alt="Z7 Neck Brackets Logo" width={100} height={100} />
        </Link>
        <h1 className="text-4xl font-bold mb-8 text-center">TERMS &amp; CONDITIONS – Z7 NECK BRACE</h1>
        <div className="space-y-8 text-gray-700 leading-relaxed">
          <section>
            <p>
              <strong>WELCOME TO THE OFFICIAL SITE FOR THE Z7 NECK BRACE.</strong> PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE MAKING A PURCHASE.
            </p>
            <p>
              By purchasing the Z7 Neck Brace through our site or any authorized distributor, you agree to the following Terms and Conditions. If you do not agree, do not proceed with your purchase. These terms may be updated at any time and will take effect immediately upon posting.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">RESTRICTIONS ON USE OF MATERIALS</h2>
            <p>
              All product designs, logos, product names, and written materials related to the Z7 Neck Brace are the sole intellectual property of the manufacturer. Unauthorized use, duplication, or distribution is prohibited and may be subject to legal action.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">TAX AND TAX EXEMPTION</h2>
            <p>
              Sales tax is applied according to the laws of your local jurisdiction. We do not accept or process tax-exempt orders through the online store at this time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">RETURNS &amp; REFUNDS</h2>
            <p>
              Returns must be initiated within 30 days of delivery. To begin a return, contact our support team at <a href="mailto:info@z7neckbrace.com" className="underline">info@z7neckbrace.com</a> to request a Return Authorization Number (RA#). Returns sent without authorization will not be accepted.
            </p>
            <p>
              <strong>Eligibility Criteria:</strong><br />
              The item must be unused, unwashed, and in its original packaging.<br />
              No returns or refunds will be issued for any product that shows signs of use, wear, or tampering.
            </p>
            <p>
              <strong>Restocking Fee:</strong><br />
              A $25 restocking fee applies to all non-defective returns.<br />
              No restocking fee is charged for approved returns involving manufacturer defects.<br />
              Returns that do not follow this policy will not be accepted. No exceptions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">ORDER CANCELLATION POLICY</h2>
            <p>
              Orders cannot be canceled or modified once submitted. Please verify all product specifications, sizing, and quantities before completing your purchase. For assistance prior to ordering, contact us using the info below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">WARRANTY INFORMATION</h2>
            <p>
              The Z7 Neck Brace includes a one (1) year limited warranty covering manufacturing defects under normal use.
            </p>
            <p>
              <strong>This warranty is void under the following conditions:</strong>
              <ol className="list-decimal pl-6">
                <li>Product was altered, modified, or repaired by unauthorized personnel.</li>
                <li>Product was misused or used in non-recommended applications.</li>
                <li>Evidence of damage from impact, abuse, or neglect.</li>
                <li>Serial number, label, or warranty tag has been removed or defaced.</li>
              </ol>
            </p>
            <p>
              To initiate a warranty claim, email a description, photos, and proof of purchase to <a href="mailto:info@z7neckbrace.com" className="underline">info@z7neckbrace.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">DELIVERY INFORMATION</h2>
            <p>
              In-stock items typically ship within 3–5 business days. Custom or high-demand items may require 2–4 weeks for fulfillment. We are not liable for delays caused by shipping carriers, weather, or other events beyond our control.
            </p>
            <p>
              Inspect your package upon delivery. All claims for damaged or missing items must be reported within 48 hours.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">FREIGHT CLAIMS</h2>
            <p>
              We are not responsible for products lost or damaged during transit. If an issue occurs, we will help you file a claim with the carrier, provided proper documentation is submitted promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">PRIVACY &amp; SECURITY</h2>
            <p>
              We value your privacy. Any personal information collected during checkout is used only to process your order and communicate product updates. Your information is never sold or shared with third parties.
            </p>
            <p>
              We use secure encryption technology to safeguard your transactions. If you suspect misuse of your data, contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">CONTACT</h2>
            <p>
              For all questions, returns, or warranty support, please contact us at:<br />
              <a href="mailto:info@z7neckbrace.com" className="underline">info@z7neckbrace.com</a><br />
              623-428-8600
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

export default TermsAndConditions