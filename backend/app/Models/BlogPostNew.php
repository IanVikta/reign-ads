<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class BlogPostNew extends Model
{
    protected $table = 'blog_posts_new';

    protected $fillable = [
        'title',
        'slug',
        'excerpt',
        'content',
        'image_path',
        'image_url',
        'read_time',
        'is_published',
        'published_at'
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'date'
    ];

    // Scope for published posts
    public function scopePublished($query)
    {
        return $query->where('is_published', true)
                    ->where('published_at', '<=', Carbon::now());
    }

    // Scope for ordered posts (newest first)
    public function scopeOrdered($query)
    {
        return $query->orderBy('published_at', 'desc');
    }

    // Accessor for formatted date
    public function getFormattedDateAttribute()
    {
        return $this->published_at->format('Y-m-d');
    }
}
