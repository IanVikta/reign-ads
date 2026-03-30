<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use App\Mail\QuoteRequestMail;
use App\Mail\QuoteConfirmationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json(ContactMessage::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'service' => 'nullable|string|max:255',
            'timeline' => 'nullable|string|max:255',
            'locations' => 'nullable|string|max:500',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        // Save to database
        $contactMessage = ContactMessage::create($validated);

        // Check if this is a quote request (has service field)
        if (!empty($validated['service'])) {
            try {
                // Send email to company
                $companyEmail = env('COMPANY_EMAIL', 'info@reignadsuganda.com');
                Mail::to($companyEmail)->send(new QuoteRequestMail($validated));

                // Send confirmation email to customer
                Mail::to($validated['email'])->send(new QuoteConfirmationMail($validated));

                Log::info('Quote request emails sent successfully', ['customer_email' => $validated['email']]);
            } catch (\Exception $e) {
                Log::error('Failed to send quote request emails: ' . $e->getMessage());
                // Don't fail the request if email fails, just log it
            }
        }

        return response()->json($contactMessage, 201);
    }

    public function markAsRead(ContactMessage $contactMessage)
    {
        $contactMessage->update(['read_at' => now()]);
        return response()->json($contactMessage);
    }
}
