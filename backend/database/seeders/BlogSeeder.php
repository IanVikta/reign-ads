<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogPostNew;
use Carbon\Carbon;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $blogPosts = [
            [
                'title' => 'How Billboard Advertising Still Dominates Brand Awareness',
                'slug' => 'billboard-advertising-dominates',
                'excerpt' => 'In an era dominated by digital marketing and social media advertising, one might assume that traditional outdoor advertising has lost its relevance. However, billboard advertising continues to be one of the most powerful tools for building brand awareness.',
                'content' => 'In an era dominated by digital marketing and social media advertising, one might assume that traditional outdoor advertising has lost its relevance. However, billboard advertising continues to be one of the most powerful tools for building brand awareness and reaching mass audiences across East Africa.',
                'image_path' => 'images/blog/double_decker.jpg',
                'image_url' => '/images/blog/double_decker.jpg',
                'read_time' => '5 min read',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(5)
            ],
            [
                'title' => 'Top Advertising Locations in Kampala',
                'slug' => 'top-advertising-locations-kampala',
                'excerpt' => 'Kampala, Uganda\'s bustling capital, offers numerous strategic locations for outdoor advertising. With over 2 million residents and countless daily commuters, choosing the right billboard placement can make or break your advertising campaign.',
                'content' => 'Kampala, Uganda\'s bustling capital, offers numerous strategic locations for outdoor advertising. With over 2 million residents and countless daily commuters, choosing the right billboard placement can make or break your advertising campaign.',
                'image_path' => 'images/blog/kampala_city.jpg',
                'image_url' => 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80',
                'read_time' => '6 min read',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(10)
            ],
            [
                'title' => 'Outdoor Advertising Trends in Africa',
                'slug' => 'outdoor-advertising-trends-africa',
                'excerpt' => 'The outdoor advertising landscape across Africa is experiencing unprecedented transformation. From digital billboards in Lagos to innovative street furniture in Nairobi, the continent is embracing new technologies.',
                'content' => 'The outdoor advertising landscape across Africa is experiencing unprecedented transformation. From digital billboards in Lagos to innovative street furniture in Nairobi, the continent is embracing new technologies and creative approaches that are reshaping how brands connect with consumers.',
                'image_path' => 'images/blog/africa_advertising.jpg',
                'image_url' => '/images/portfolio/wall-branding/mtn_wall_lugogo.jpg',
                'read_time' => '7 min read',
                'is_published' => true,
                'published_at' => Carbon::now()->subDays(15)
            ]
        ];

        foreach ($blogPosts as $post) {
            BlogPostNew::create($post);
        }
    }
}