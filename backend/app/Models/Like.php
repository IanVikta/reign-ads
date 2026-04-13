<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    protected $fillable = [
        'blog_post_id',
        'ip_address'
    ];

    public function scopeForPost($query, $postId)
    {
        return $query->where('blog_post_id', $postId);
    }
}
