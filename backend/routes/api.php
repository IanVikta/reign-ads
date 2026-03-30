<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AnalyticsController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::post('/login', [AuthController::class , 'login']);

Route::get('/services', [ServiceController::class , 'index']);
Route::get('/services/{service:slug}', [ServiceController::class , 'show']);

Route::get('/projects', [ProjectController::class , 'index']);
Route::get('/projects/{project:id}', [ProjectController::class , 'show']);

Route::get('/clients', [ClientController::class , 'index']);
Route::get('/testimonials', [TestimonialController::class , 'index']);

Route::post('/contact', [ContactController::class , 'store']);
Route::post('/analytics', [AnalyticsController::class , 'store']);

// Protected Routes (Sanctum)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class , 'me']);
    Route::post('/logout', [AuthController::class , 'logout']);

    // Admin CRUD
    Route::apiResource('services', ServiceController::class)->except(['index', 'show']);
    Route::apiResource('projects', ProjectController::class)->except(['index', 'show']);
    Route::apiResource('clients', ClientController::class)->except(['index']);
    Route::apiResource('testimonials', TestimonialController::class)->except(['index']);

    Route::get('/contact/messages', [ContactController::class , 'index']);
    Route::post('/contact/messages/{contactMessage}/read', [ContactController::class , 'markAsRead']);

    Route::get('/analytics/data', [AnalyticsController::class , 'index']);
});
