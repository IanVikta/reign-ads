<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Quote Request Confirmation - Reign Ads Uganda</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            padding: 20px;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .header {
            background: linear-gradient(135deg, #0220aa 0%, #1e40af 100%);
            color: white;
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="75" cy="75" r="1" fill="rgba(255,255,255,0.1)"/><circle cx="50" cy="10" r="0.5" fill="rgba(255,255,255,0.05)"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
        }
        .header-content {
            position: relative;
            z-index: 1;
        }
        .logo {
            font-size: 28px;
            font-weight: 900;
            letter-spacing: 2px;
            margin-bottom: 8px;
        }
        .header-subtitle {
            font-size: 16px;
            opacity: 0.9;
            font-weight: 500;
        }
        .success-badge {
            background: #ffd22a;
            color: #0220aa;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 800;
            font-size: 14px;
            margin: 20px auto 0;
            display: inline-block;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 20px;
            color: #0220aa;
            font-weight: 700;
            margin-bottom: 20px;
        }
        .intro-text {
            font-size: 16px;
            color: #4b5563;
            margin-bottom: 30px;
            line-height: 1.7;
        }
        .highlight-card {
            background: linear-gradient(135deg, #0220aa 0%, #1e40af 100%);
            color: white;
            padding: 24px;
            border-radius: 12px;
            text-align: center;
            margin: 30px 0;
            position: relative;
            overflow: hidden;
        }
        .highlight-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: #ffd22a;
        }
        .highlight-icon {
            font-size: 24px;
            margin-bottom: 8px;
        }
        .section-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            border-left: 4px solid #ffd22a;
        }
        .section-title {
            color: #0220aa;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 16px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .steps-list {
            list-style: none;
            padding: 0;
        }
        .step-item {
            background: white;
            padding: 16px 20px;
            margin-bottom: 12px;
            border-radius: 8px;
            border-left: 4px solid #0220aa;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: flex-start;
            gap: 12px;
        }
        .step-number {
            background: #0220aa;
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: 700;
            flex-shrink: 0;
        }
        .step-content strong {
            color: #0220aa;
            font-weight: 600;
        }
        .summary-grid {
            display: grid;
            gap: 12px;
        }
        .summary-item {
            background: white;
            padding: 16px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .summary-label {
            font-weight: 600;
            color: #0220aa;
            font-size: 14px;
        }
        .summary-value {
            color: #374151;
            font-weight: 500;
        }
        .contact-card {
            background: linear-gradient(135deg, #0220aa 0%, #1e40af 100%);
            color: white;
            padding: 24px;
            border-radius: 12px;
            margin: 24px 0;
        }
        .contact-title {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 16px;
            color: white;
        }
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 12px;
        }
        .contact-item {
            background: rgba(255, 255, 255, 0.1);
            padding: 12px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
        }
        .footer {
            background: #1f2937;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .footer-logo {
            font-size: 20px;
            font-weight: 900;
            margin-bottom: 8px;
        }
        .footer-tagline {
            opacity: 0.8;
            margin-bottom: 12px;
        }
        .footer-services {
            font-size: 12px;
            opacity: 0.6;
            line-height: 1.5;
        }
        @media (max-width: 600px) {
            .email-container { margin: 10px; border-radius: 12px; }
            .header, .content { padding: 24px 20px; }
            .contact-grid { grid-template-columns: 1fr; }
            .summary-item { flex-direction: column; gap: 8px; text-align: center; }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="header-content">
                <div class="logo">REIGN ADS</div>
                <div class="header-subtitle">Uganda's Premier Outdoor Advertising</div>
                <div class="success-badge">✓ Quote Request Received</div>
            </div>
        </div>

        <div class="content">
            <div class="greeting">Hello {{ $customerData['name'] }}! 👋</div>
            
            <p class="intro-text">
                Thank you for choosing Reign Ads Uganda for your advertising needs. We've successfully received your quote request for <strong>{{ $customerData['service'] }}</strong> and our team is already reviewing your requirements.
            </p>

            <div class="highlight-card">
                <div class="highlight-icon">⚡</div>
                <div style="font-size: 18px; font-weight: 700; margin-bottom: 4px;">24-Hour Response Guarantee</div>
                <div style="opacity: 0.9;">We'll contact you via email or phone within 24 hours with your customized quote</div>
            </div>

            <div class="section-card">
                <div class="section-title">
                    <span>🚀</span> What Happens Next?
                </div>
                <ul class="steps-list">
                    <li class="step-item">
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <strong>Requirements Review:</strong> Our experts analyze your campaign needs and objectives
                        </div>
                    </li>
                    <li class="step-item">
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <strong>Location Analysis:</strong> We identify the best billboard locations for maximum impact
                        </div>
                    </li>
                    <li class="step-item">
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <strong>Custom Quote:</strong> You receive a detailed, tailored proposal with pricing
                        </div>
                    </li>
                    <li class="step-item">
                        <div class="step-number">4</div>
                        <div class="step-content">
                            <strong>Strategy Call:</strong> We schedule a consultation to discuss your campaign strategy
                        </div>
                    </li>
                </ul>
            </div>

            <div class="section-card">
                <div class="section-title">
                    <span>📋</span> Your Request Summary
                </div>
                <div class="summary-grid">
                    <div class="summary-item">
                        <span class="summary-label">Service Requested</span>
                        <span class="summary-value">{{ $customerData['service'] }}</span>
                    </div>
                    @if($customerData['timeline'])
                    <div class="summary-item">
                        <span class="summary-label">Campaign Timeline</span>
                        <span class="summary-value">{{ $customerData['timeline'] }}</span>
                    </div>
                    @endif
                    @if($customerData['locations'])
                    <div class="summary-item">
                        <span class="summary-label">Preferred Locations</span>
                        <span class="summary-value">{{ $customerData['locations'] }}</span>
                    </div>
                    @endif
                    <div class="summary-item">
                        <span class="summary-label">Request Date</span>
                        <span class="summary-value">{{ date('F j, Y') }}</span>
                    </div>
                </div>
            </div>

            <div class="contact-card">
                <div class="contact-title">Need Immediate Assistance? 📞</div>
                <div class="contact-grid">
                    <div class="contact-item">
                        <strong>📧 Email:</strong><br>
                        sales@reignads.co.ug
                    </div>
                    <div class="contact-item">
                        <strong>📱 Phone:</strong><br>
                        +256 706 829 331
                    </div>
                    <div class="contact-item">
                        <strong>🕒 Hours:</strong><br>
                        Mon-Fri, 8AM-6PM EAT
                    </div>
                </div>
            </div>

            <p style="color: #4b5563; font-size: 16px; line-height: 1.7; margin-bottom: 20px;">
                We're excited to help you create an impactful advertising campaign that reaches your target audience across Uganda's most strategic locations. Our team has over 9 years of experience delivering results for leading brands.
            </p>

            <p style="color: #0220aa; font-weight: 600; font-size: 16px;">
                Best regards,<br>
                <strong>The Reign Ads Uganda Team</strong>
            </p>
        </div>

        <div class="footer">
            <div class="footer-logo">REIGN ADS UGANDA</div>
            <div class="footer-tagline">Taking Your Brand Places Since 2015</div>
            <div class="footer-services">
                Spectacular Billboards • LED Screens • Wall Branding • Automobile Branding<br>
                Fabrication & Signage • Large Format Printing
            </div>
        </div>
    </div>
</body>
</html>