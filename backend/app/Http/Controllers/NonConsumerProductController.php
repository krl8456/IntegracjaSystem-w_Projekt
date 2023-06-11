<?php

namespace App\Http\Controllers;

use App\Models\NonConsumerProduct;
use Illuminate\Http\Request;

class NonConsumerProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $nonConsumerProducts = NonConsumerProduct::all();
        return response()->json($nonConsumerProducts);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $nonConsumerProduct = NonConsumerProduct::find($id);

        if (!$nonConsumerProduct) {
            return response()->json(['message' => 'Non-consumer product not found'], 404);
        }

        return response()->json($nonConsumerProduct);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}