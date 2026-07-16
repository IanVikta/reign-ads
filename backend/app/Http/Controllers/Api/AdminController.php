<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

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

    // Inventory Management Methods
    public function getInventory()
    {
        $inventory = Inventory::orderBy('location')->get();

        return response()->json([
            'success' => true,
            'data' => $inventory
        ]);
    }

    public function createInventory(Request $request)
    {
        $validated = $request->validate([
            'location' => 'required|string|max:255',
            'size' => 'required|string|max:50',
            'traffic_level' => 'required|string|max:100',
            'status' => ['required', Rule::in(['Available', 'Booked'])]
        ]);

        $inventory = Inventory::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Inventory item created successfully',
            'data' => $inventory
        ], 201);
    }

    public function updateInventory(Request $request, $id)
    {
        $inventory = Inventory::findOrFail($id);

        $validated = $request->validate([
            'location' => 'required|string|max:255',
            'size' => 'required|string|max:50',
            'traffic_level' => 'required|string|max:100',
            'status' => ['required', Rule::in(['Available', 'Booked'])]
        ]);

        $inventory->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Inventory item updated successfully',
            'data' => $inventory
        ]);
    }

    public function deleteInventory($id)
    {
        $inventory = Inventory::findOrFail($id);
        $inventory->delete();

        return response()->json([
            'success' => true,
            'message' => 'Inventory item deleted successfully'
        ]);
    }
}