<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getPendingComments()
    {
        $comments = Comment::where('is_approved', false)
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'comments' => $comments
        ]);
    }

    public function approveComment($commentId)
    {
        $comment = Comment::findOrFail($commentId);
        $comment->update(['is_approved' => true]);

        return response()->json([
            'success' => true,
            'message' => 'Comment approved successfully'
        ]);
    }

    public function rejectComment($commentId)
    {
        $comment = Comment::findOrFail($commentId);
        $comment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Comment rejected and deleted'
        ]);
    }

    public function getAllComments()
    {
        $comments = Comment::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'comments' => $comments
        ]);
    }
}