<?php

namespace App\Http\Controllers;

use App\Models\ConsumerProduct;
use Illuminate\Http\Request;

class ConsumerProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $consumerProducts = ConsumerProduct::all();
        return response()->json($consumerProducts);
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
        $consumerProduct = ConsumerProduct::find($id);

        if (!$consumerProduct) {
            return response()->json(['message' => 'Consumer product not found'], 404);
        }

        return response()->json($consumerProduct);
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