<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\AnalyticsController;
use App\Http\Controllers\Api\CommentController;
use App\Http\Controllers\Api\LikeController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\MediaController;
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

// Blog Comments and Likes (Public)
Route::prefix('blog/{postId}')->group(function () {
    Route::get('/comments', [CommentController::class, 'index']);
    Route::post('/comments', [CommentController::class, 'store']);
    Route::get('/comments/stats', [CommentController::class, 'getStats']);
    
    Route::post('/likes/toggle', [LikeController::class, 'toggle']);
    Route::get('/likes/stats', [LikeController::class, 'getStats']);
    Route::get('/likes/check', [LikeController::class, 'checkLiked']);
});

// Public Website Content (Database-driven)
Route::get('/website/portfolio', [MediaController::class, 'getWebsitePortfolio']);
Route::get('/website/blog', [MediaController::class, 'getWebsiteBlog']);
Route::get('/website/blog/{slug}', [MediaController::class, 'getBlogArticle']);

// Media Management (Public for now - can be protected later)
Route::prefix('media')->group(function () {
    Route::post('/portfolio/upload', [MediaController::class, 'uploadPortfolioImage']);
    Route::post('/blog/upload', [MediaController::class, 'uploadBlogImage']);
    Route::get('/portfolio', [MediaController::class, 'getPortfolioImages']);
    Route::get('/blog', [MediaController::class, 'getBlogImages']);
    Route::delete('/portfolio/{id}', [MediaController::class, 'deletePortfolioImage']);
    Route::delete('/blog/{id}', [MediaController::class, 'deleteBlogPost']);
    Route::patch('/portfolio/{id}/toggle', [MediaController::class, 'togglePortfolioStatus']);
    Route::patch('/blog/{id}/toggle', [MediaController::class, 'toggleBlogStatus']);
});

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

    // Admin Comment Management
    Route::prefix('admin/comments')->group(function () {
        Route::get('/pending', [AdminController::class, 'getPendingComments']);
        Route::get('/all', [AdminController::class, 'getAllComments']);
        Route::post('/{commentId}/approve', [AdminController::class, 'approveComment']);
        Route::delete('/{commentId}/reject', [AdminController::class, 'rejectComment']);
    });
});
