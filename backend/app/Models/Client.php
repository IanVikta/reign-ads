<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $fillable = ['name', 'logo_path', 'website_url', 'is_featured'];

    protected $casts = [
        'is_featured' => 'boolean',
    ];
}
