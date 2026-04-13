<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = [
        'blog_post_id',
        'author_name',
        'author_email',
        'content',
        'is_approved',
        'is_anonymous',
        'ip_address'
    ];

    protected $casts = [
        'is_approved' => 'boolean',
        'is_anonymous' => 'boolean',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    public function scopeForPost($query, $postId)
    {
        return $query->where('blog_post_id', $postId);
    }
}
