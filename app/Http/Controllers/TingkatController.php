<?php

namespace App\Http\Controllers;

use App\Models\Tingkat;
use Illuminate\Http\Request;

class TingkatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tingkat = Tingkat::all();

        return inertia('Tingkat/Index', [
            'tingkat' => $tingkat
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Tingkat/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $tingkat = Tingkat::create([
            'nama' => $request->nama,
        ]);

        return redirect()->route('tingkat.index')->with('success', 'Tingkat berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Tingkat $tingkat)
    {
        // return inertia('Tingkat/Show', [
        //     'tingkat' => $tingkat
        // ]);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tingkat $tingkat)
    {
        return inertia('Tingkat/Edit', [
            'tingkat' => $tingkat
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tingkat $tingkat)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
        ]);

        $tingkat->update([
            'nama' => $request->nama,
        ]);

        return redirect()->route('tingkat.index')->with('success', 'Tingkat berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tingkat $tingkat)
    {
        $tingkat->delete();

        return redirect()->route('tingkat.index')->with('success', 'Tingkat berhasil dihapus.');
    }
}
