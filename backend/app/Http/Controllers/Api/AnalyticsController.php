<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Analytic;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
    public function index()
    {
        return response()->json(Analytic::orderBy('date', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'page' => 'required|string',
            'date' => 'required|date',
        ]);

        $analytic = Analytic::firstOrCreate(
        ['page' => $validated['page'], 'date' => $validated['date']],
        ['visits' => 0]
        );

        $analytic->increment('visits');

        return response()->json($analytic, 201);
    }
}
