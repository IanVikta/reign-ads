<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'slug', 'description', 'project_category_id', 'images', 'video_url', 'is_featured'
    ];

    protected $casts = [
        'images' => 'array',
        'is_featured' => 'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(ProjectCategory::class , 'project_category_id');
    }
}
