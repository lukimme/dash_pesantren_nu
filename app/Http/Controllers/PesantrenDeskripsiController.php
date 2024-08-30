<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdatePesantrenDeskripsiRequest;
use App\Models\Pesantren;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class PesantrenDeskripsiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function show(Pesantren $pesantren)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pesantren $pesantren)
    {
        Gate::authorize('pesantren_edit');

        return inertia('Pesantren/EditDeskripsi', [
            'pesantren' => $pesantren,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePesantrenDeskripsiRequest $request, Pesantren $pesantren)
    {
        $pesantren->update($request->validated());
        return redirect()->route('pesantren.media.edit', $pesantren->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pesantren $pesantren)
    {
        //
    }
}
