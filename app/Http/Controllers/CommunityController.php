<?php

namespace App\Http\Controllers;

use App\Models\CommunityPost;
use App\Models\Tag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityController extends Controller
{
    public function index(Request $request)
    {
        $query = CommunityPost::with(['user', 'tags'])->latest();

        // Filtro por Tag
        if ($request->has('tag') && $request->tag !== 'Geral') {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('name', $request->tag);
            });
        }

        return Inertia::render('Authenticated/Community/Index', [
            'posts' => $query->get(),
            'tags' => Tag::all(),
            'currentTag' => $request->tag ?? 'Geral',
        ]);
    }

    public function create(Request $request)
    {
        $tags = Tag::select('id', 'name')->get()->map(function ($tag) {
            return [
                'value' => $tag->id,
                'label' => $tag->name
            ];
        });

        return Inertia::render('Authenticated/Community/Create', [
            'tags' => $tags,
            'currentTag' => $request->tag ?? 'Geral',
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'content' => 'required|string|max:1000',
            'tags' => 'required|array',
            'tags.*' => 'exists:tags,id',
        ]);

        $post = $request->user()->communityPosts()->create([
            'content' => $validated['content'],
        ]);

        $post->tags()->attach($validated['tags']);

        return redirect()->route('community.index');
    }
}
