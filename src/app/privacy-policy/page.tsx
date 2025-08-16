"use client";
import Image from "next/image";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header with FACES Logo */}
      <div className="w-full py-4 lg:py-8 ">
        <div className="max-w-[1000px] md:max-w-[1200px] px-8 py-4 lg:py-0 mx-auto">
          <Image
            src="/faces_black_logo.png"
            alt="Faces logo"
            width={120}
            height={120}
            className="h-auto w-40 sm:w-48"
          />
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-[1000px] md:max-w-[1200px] mx-auto px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700">
            <p className="text-sm text-gray-600">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p>
                FACES ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our outdoor media services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium text-gray-900 mb-2">2.1 Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact information (email address, phone number)</li>
                <li>Company information</li>
                <li>Marketing preferences</li>
                <li>Communication history</li>
              </ul>
              
              <h3 className="text-xl font-medium text-gray-900 mb-2 mt-4">2.2 Automatically Collected Information</h3>
              <p>When you visit our website, we automatically collect certain information, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>IP address and device information</li>
                <li>Browser type and version</li>
                <li>Pages visited and time spent</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p>We use the collected information for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide and maintain our services</li>
                <li>Process your requests and transactions</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
                <li>Protect against fraud and security threats</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Legal requirements and law enforcement</li>
                <li>Business transfers or mergers</li>
                <li>Protection of rights and safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access and review your data</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Object to processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user behavior. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected such information, please contact us immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. International Data Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with applicable laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="rounded-lg mt-4">
                <p className="font-medium">FACES</p>
                <p>Email: sales@faces.com.mt</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
