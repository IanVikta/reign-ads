<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New Quote Request - {{ $quoteData['service'] }}</title>
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
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
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
            margin-bottom: 16px;
        }
        .service-badge {
            background: #ffd22a;
            color: #0220aa;
            padding: 12px 24px;
            border-radius: 50px;
            font-weight: 800;
            font-size: 14px;
            display: inline-block;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .content {
            padding: 40px 30px;
        }
        .urgent-alert {
            background: linear-gradient(135deg, #dc2626 0%, #ef4444 100%);
            color: white;
            padding: 20px;
            border-radius: 12px;
            text-align: center;
            font-weight: 700;
            margin-bottom: 30px;
            position: relative;
            overflow: hidden;
        }
        .urgent-alert::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: #ffd22a;
        }
        .urgent-icon {
            font-size: 24px;
            margin-bottom: 8px;
        }
        .section-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 24px;
            margin: 24px 0;
            border-left: 4px solid #0220aa;
        }
        .section-title {
            color: #0220aa;
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
        }
        .info-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #e5e7eb;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .info-label {
            font-weight: 700;
            color: #0220aa;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: 8px;
        }
        .info-value {
            color: #374151;
            font-size: 16px;
            font-weight: 500;
        }
        .message-card {
            background: white;
            padding: 24px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            border-left: 4px solid #ffd22a;
        }
        .message-text {
            font-style: italic;
            color: #4b5563;
            font-size: 15px;
            line-height: 1.7;
        }
        .priority-section {
            background: linear-gradient(135deg, #0220aa 0%, #1e40af 100%);
            color: white;
            padding: 24px;
            border-radius: 12px;
            margin: 30px 0;
            text-align: center;
        }
        .priority-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
        }
        .priority-text {
            opacity: 0.9;
            font-size: 16px;
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
            margin-bottom: 16px;
        }
        .footer-details {
            font-size: 14px;
            opacity: 0.7;
            line-height: 1.6;
        }
        .timestamp {
            background: rgba(255, 255, 255, 0.1);
            padding: 8px 16px;
            border-radius: 20px;
            font-size: 12px;
            margin-top: 12px;
            display: inline-block;
        }
        @media (max-width: 600px) {
            .email-container { margin: 10px; border-radius: 12px; }
            .header, .content { padding: 24px 20px; }
            .info-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <div class="header-content">
                <div class="logo">REIGN ADS</div>
                <div class="header-subtitle">New Quote Request Alert</div>
                <div class="service-badge">{{ $quoteData['service'] }}</div>
            </div>
        </div>

        <div class="content">
            <div class="urgent-alert">
                <div class="urgent-icon">🚨</div>
                <div style="font-size: 18px; margin-bottom: 4px;">URGENT: New Quote Request</div>
                <div style="opacity: 0.9; font-weight: 500;">Respond within 24 hours as promised to the customer</div>
            </div>

            <div class="section-card">
                <div class="section-title">
                    <span>👤</span> Customer Information
                </div>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-label">Full Name</div>
                        <div class="info-value">{{ $quoteData['name'] }}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Email Address</div>
                        <div class="info-value">{{ $quoteData['email'] }}</div>
                    </div>
                    <div class="info-card">
                        <div class="info-label">Phone Number</div>
                        <div class="info-value">{{ $quoteData['phone'] }}</div>
                    </div>
                    @if($quoteData['company'])
                    <div class="info-card">
                        <div class="info-label">Company</div>
                        <div class="info-value">{{ $quoteData['company'] }}</div>
                    </div>
                    @endif
                </div>
            </div>

            <div class="section-card">
                <div class="section-title">
                    <span>📊</span> Campaign Requirements
                </div>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-label">Service Requested</div>
                        <div class="info-value">{{ $quoteData['service'] }}</div>
                    </div>
                    @if($quoteData['timeline'])
                    <div class="info-card">
                        <div class="info-label">Campaign Timeline</div>
                        <div class="info-value">{{ $quoteData['timeline'] }}</div>
                    </div>
                    @endif
                </div>
                @if($quoteData['locations'])
                <div class="info-card" style="margin-top: 16px;">
                    <div class="info-label">Preferred Locations</div>
                    <div class="info-value">{{ $quoteData['locations'] }}</div>
                </div>
                @endif
            </div>

            <div class="section-card">
                <div class="section-title">
                    <span>💬</span> Customer Message
                </div>
                <div class="message-card">
                    <div class="message-text">
                        "{{ $quoteData['message'] }}"
                    </div>
                </div>
            </div>

            <div class="priority-section">
                <div class="priority-title">⏰ Action Required</div>
                <div class="priority-text">
                    This customer is expecting a response within 24 hours. Please prepare and send a customized quote as soon as possible.
                </div>
            </div>
        </div>

        <div class="footer">
            <div class="footer-logo">REIGN ADS UGANDA</div>
            <div class="footer-tagline">Internal Quote Request Notification</div>
            <div class="footer-details">
                📧 sales@reignads.co.ug | 📞 +256 706 829 331<br>
                This is an automated notification from your website quote system
            </div>
            <div class="timestamp">
                Submitted: {{ date('F j, Y \a\t g:i A T') }}
            </div>
        </div>
    </div>
</body>
</html>