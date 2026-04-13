<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Like;
use Illuminate\Http\Request;

class LikeController extends Controller
{
    public function toggle(Request $request, $postId)
    {
        $ipAddress = $request->ip();
        
        $existingLike = Like::where('blog_post_id', $postId)
            ->where('ip_address', $ipAddress)
            ->first();

        if ($existingLike) {
            // Unlike
            $existingLike->delete();
            $liked = false;
        } else {
            // Like
            Like::create([
                'blog_post_id' => $postId,
                'ip_address' => $ipAddress
            ]);
            $liked = true;
        }

        $totalLikes = Like::forPost($postId)->count();

        return response()->json([
            'success' => true,
            'liked' => $liked,
            'total_likes' => $totalLikes
        ]);
    }

    public function getStats($postId)
    {
        $totalLikes = Like::forPost($postId)->count();
        
        return response()->json([
            'success' => true,
            'total_likes' => $totalLikes
        ]);
    }

    public function checkLiked(Request $request, $postId)
    {
        $ipAddress = $request->ip();
        
        $liked = Like::where('blog_post_id', $postId)
            ->where('ip_address', $ipAddress)
            ->exists();

        return response()->json([
            'success' => true,
            'liked' => $liked
        ]);
    }
}