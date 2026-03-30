<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $query = Project::with('category')->orderBy('created_at', 'desc');

        if ($request->has('category_slug')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category_slug);
            });
        }

        if ($request->has('featured')) {
            $query->where('is_featured', true);
        }

        return response()->json($query->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|unique:projects,slug',
            'description' => 'nullable|string',
            'project_category_id' => 'required|exists:project_categories,id',
            'images' => 'nullable|array',
            'video_url' => 'nullable|string',
            'is_featured' => 'boolean',
        ]);

        $project = Project::create($validated);
        return response()->json($project, 201);
    }

    public function show(Project $project)
    {
        return response()->json($project->load('category'));
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'slug' => 'string|unique:projects,slug,' . $project->id,
            'description' => 'nullable|string',
            'project_category_id' => 'exists:project_categories,id',
            'images' => 'nullable|array',
            'video_url' => 'nullable|string',
            'is_featured' => 'boolean',
        ]);

        $project->update($validated);
        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();
        return response()->json(null, 204);
    }
}
