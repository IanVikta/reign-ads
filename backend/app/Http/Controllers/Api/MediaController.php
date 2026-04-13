<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PortfolioItem;
use App\Models\BlogPostNew;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Carbon\Carbon;

class MediaController extends Controller
{
    public function uploadPortfolioImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
            'category' => 'required|string|in:billboards,led-screens,wall-branding,signage,street-poles,automobile-branding',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:500'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $image = $request->file('image');
            $category = $request->input('category');
            
            // Generate unique filename
            $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            
            // Store in storage/app/public/images/portfolio/{category}/
            $path = $image->storeAs("images/portfolio/{$category}", $filename, 'public');
            $imageUrl = "/storage/images/portfolio/{$category}/{$filename}";
            
            // Create portfolio item in database
            $portfolioItem = PortfolioItem::create([
                'title' => $request->input('title'),
                'category' => $category,
                'description' => $request->input('description', ''),
                'image_path' => $path,
                'image_url' => $imageUrl,
                'is_active' => true,
                'sort_order' => 0
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Portfolio image uploaded successfully',
                'data' => $portfolioItem
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function uploadBlogImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:5120', // 5MB max
            'title' => 'required|string|max:255',
            'excerpt' => 'required|string|max:500',
            'slug' => 'required|string|max:255',
            'content' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        // Check if slug already exists
        if (BlogPostNew::where('slug', $request->input('slug'))->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Slug already exists. Please use a different slug.',
                'errors' => ['slug' => ['The slug has already been taken.']]
            ], 422);
        }

        try {
            $image = $request->file('image');
            
            // Generate unique filename
            $filename = time() . '_' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            
            // Store in storage/app/public/images/blog/
            $path = $image->storeAs('images/blog', $filename, 'public');
            $imageUrl = "/storage/images/blog/{$filename}";
            
            // Create blog post in database
            $blogPost = BlogPostNew::create([
                'title' => $request->input('title'),
                'slug' => $request->input('slug'),
                'excerpt' => $request->input('excerpt'),
                'content' => $request->input('content', ''),
                'image_path' => $path,
                'image_url' => $imageUrl,
                'read_time' => $this->calculateReadTime($request->input('content', '')),
                'is_published' => true,
                'published_at' => Carbon::now()
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Blog post created successfully',
                'data' => $blogPost
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Upload failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getPortfolioImages()
    {
        try {
            $portfolioItems = PortfolioItem::active()
                ->ordered()
                ->get()
                ->map(function ($item) {
                    // Convert backend storage path to frontend public path for dashboard
                    $frontendPath = str_replace('/storage/images/', '/images/', $item->image_url);
                    
                    return [
                        'id' => $item->id,
                        'title' => $item->title,
                        'category' => $item->category,
                        'description' => $item->description,
                        'imageSrc' => $frontendPath, // Use frontend path
                        'uploaded_at' => $item->created_at->toISOString(),
                        'is_active' => $item->is_active
                    ];
                });
            
            return response()->json([
                'success' => true,
                'data' => $portfolioItems
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch portfolio images: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getBlogImages()
    {
        try {
            $blogPosts = BlogPostNew::published()
                ->ordered()
                ->get()
                ->map(function ($post) {
                    // Convert backend storage path to frontend public path for dashboard
                    $frontendPath = str_replace('/storage/images/', '/images/', $post->image_url);
                    
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'slug' => $post->slug,
                        'excerpt' => $post->excerpt,
                        'imageSrc' => $frontendPath, // Use frontend path
                        'date' => $post->formatted_date,
                        'readTime' => $post->read_time,
                        'content' => $post->content,
                        'uploaded_at' => $post->created_at->toISOString(),
                        'is_published' => $post->is_published
                    ];
                });
            
            return response()->json([
                'success' => true,
                'data' => $blogPosts
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch blog posts: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deletePortfolioImage(Request $request, $id)
    {
        try {
            $portfolioItem = PortfolioItem::findOrFail($id);
            
            // Delete the image file
            if (Storage::disk('public')->exists($portfolioItem->image_path)) {
                Storage::disk('public')->delete($portfolioItem->image_path);
            }
            
            // Delete the database record
            $portfolioItem->delete();

            return response()->json([
                'success' => true,
                'message' => 'Portfolio item deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Delete failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function deleteBlogPost(Request $request, $id)
    {
        try {
            $blogPost = BlogPostNew::findOrFail($id);
            
            // Delete the image file
            if (Storage::disk('public')->exists($blogPost->image_path)) {
                Storage::disk('public')->delete($blogPost->image_path);
            }
            
            // Delete the database record
            $blogPost->delete();

            return response()->json([
                'success' => true,
                'message' => 'Blog post deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Delete failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function togglePortfolioStatus(Request $request, $id)
    {
        try {
            $portfolioItem = PortfolioItem::findOrFail($id);
            $portfolioItem->is_active = !$portfolioItem->is_active;
            $portfolioItem->save();

            return response()->json([
                'success' => true,
                'message' => 'Portfolio item status updated successfully',
                'data' => $portfolioItem
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Status update failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function toggleBlogStatus(Request $request, $id)
    {
        try {
            $blogPost = BlogPostNew::findOrFail($id);
            $blogPost->is_published = !$blogPost->is_published;
            $blogPost->save();

            return response()->json([
                'success' => true,
                'message' => 'Blog post status updated successfully',
                'data' => $blogPost
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Status update failed: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getWebsitePortfolio()
    {
        try {
            $portfolioItems = PortfolioItem::active()
                ->ordered()
                ->get()
                ->map(function ($item) {
                    // Convert backend storage path to frontend public path
                    $frontendPath = str_replace('/storage/images/', '/images/', $item->image_url);
                    
                    return [
                        'id' => $item->id,
                        'title' => $item->title,
                        'category' => ['slug' => $item->category],
                        'image_url' => $frontendPath, // Use frontend path
                        'description' => $item->description,
                        'client' => 'Various Clients' // Default client name
                    ];
                });
            
            return response()->json([
                'success' => true,
                'data' => $portfolioItems
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch portfolio: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getWebsiteBlog()
    {
        try {
            $blogPosts = BlogPostNew::published()
                ->ordered()
                ->get()
                ->map(function ($post) {
                    // Convert backend storage path to frontend public path
                    $frontendPath = str_replace('/storage/images/', '/images/', $post->image_url);
                    
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'slug' => $post->slug,
                        'excerpt' => $post->excerpt,
                        'imageSrc' => $frontendPath, // Use frontend path
                        'date' => $post->formatted_date,
                        'readTime' => $post->read_time
                    ];
                });
            
            return response()->json([
                'success' => true,
                'data' => $blogPosts
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch blog posts: ' . $e->getMessage()
            ], 500);
        }
    }

    public function getBlogArticle($slug)
    {
        try {
            $blogPost = BlogPostNew::where('slug', $slug)
                ->where('is_published', true)
                ->first();

            if (!$blogPost) {
                return response()->json([
                    'success' => false,
                    'message' => 'Blog post not found'
                ], 404);
            }

            // Convert backend storage path to frontend public path
            $frontendPath = str_replace('/storage/images/', '/images/', $blogPost->image_url);
            
            $article = [
                'title' => $blogPost->title,
                'date' => $blogPost->formatted_date,
                'author' => 'Reign Ads Team',
                'readTime' => $blogPost->read_time,
                'image' => $frontendPath, // Use frontend path
                'content' => $this->parseContent($blogPost->content)
            ];
            
            return response()->json([
                'success' => true,
                'data' => $article
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch blog article: ' . $e->getMessage()
            ], 500);
        }
    }

    private function parseContent($content)
    {
        // Simple content parser - converts plain text to structured content
        $paragraphs = explode("\n\n", $content);
        $parsedContent = [];

        foreach ($paragraphs as $paragraph) {
            $paragraph = trim($paragraph);
            if (!empty($paragraph)) {
                // Check if it's a heading (starts with #)
                if (strpos($paragraph, '#') === 0) {
                    $parsedContent[] = [
                        'type' => 'heading',
                        'text' => ltrim($paragraph, '# ')
                    ];
                } else {
                    $parsedContent[] = [
                        'type' => 'paragraph',
                        'text' => $paragraph
                    ];
                }
            }
        }

        return $parsedContent;
    }

    private function calculateReadTime($content)
    {
        $wordCount = str_word_count(strip_tags($content));
        $readTime = ceil($wordCount / 200); // Average reading speed: 200 words per minute
        return $readTime . ' min read';
    }
}