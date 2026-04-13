<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function index($postId)
    {
        $comments = Comment::forPost($postId)
            ->approved()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'comments' => $comments
        ]);
    }

    public function store(Request $request, $postId)
    {
        $validator = Validator::make($request->all(), [
            'author_name' => 'nullable|string|max:255',
            'author_email' => 'nullable|email|max:255',
            'content' => 'required|string|max:1000',
            'is_anonymous' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $isAnonymous = $request->get('is_anonymous', false);
        
        $comment = Comment::create([
            'blog_post_id' => $postId,
            'author_name' => $isAnonymous ? null : $request->author_name,
            'author_email' => $isAnonymous ? null : $request->author_email,
            'content' => $request->content,
            'is_anonymous' => $isAnonymous,
            'ip_address' => $request->ip(),
            'is_approved' => true // Auto-approve for better UX
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Comment posted successfully!',
            'comment' => $comment
        ], 201);
    }

    public function getStats($postId)
    {
        $totalComments = Comment::forPost($postId)->approved()->count();
        
        return response()->json([
            'success' => true,
            'total_comments' => $totalComments
        ]);
    }
}