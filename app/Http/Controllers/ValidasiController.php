<?php

namespace App\Http\Controllers;

use App\Models\Pesantren;
use App\Models\Validasi;
use App\Http\Requests\StoreValidasiRequest;
use App\Http\Requests\UpdateValidasiRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;


class ValidasiController extends Controller
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
    public function store(StoreValidasiRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Validasi $validasi)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pesantren $pesantren)
    {
        Gate::authorize('pesantren_edit');
        $pesantren = Pesantren::with('validasi')->find($pesantren->id);
        return inertia('Pesantren/EditValidasi', [
            'pesantren' => $pesantren,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateValidasiRequest $request, Pesantren $pesantren)
    {
        Gate::authorize('pesantren_edit');
        if ($request->hasFile('kemenag')) {
            if ($pesantren->validasi()->where('kategori_validasi', 'kemenag')->first()) {
                Storage::delete("public/pesantren/{$pesantren->slug}/validasi/" . ($pesantren->validasi()->where('kategori_validasi', 'kemenag'))->first()->file);
                $pesantren->validasi()->where('kategori_validasi', 'kemenag')->first()->delete();
            }
            $file = $request->file('kemenag');
            $filename = 'kemenag.' . $file->getClientOriginalExtension();
            $file->storeAs("public/pesantren/{$pesantren->slug}/validasi", $filename);
            $pesantren->validasi()->create([
                'pesantren_id' => $pesantren->id,
                'kategori_validasi' => 'kemenag',
                'file' => $filename,
            ]);
        }

        if ($request->hasFile('rmi')) {
            if ($pesantren->validasi()->where('kategori_validasi', 'rmi')->first()) {
                Storage::delete("public/pesantren/{$pesantren->slug}/validasi/" . ($pesantren->validasi()->where('kategori_validasi', 'rmi'))->first()->file);
                $pesantren->validasi()->where('kategori_validasi', 'rmi')->first()->delete();
            }
            $file = $request->file('rmi');
            $filename = 'rmi.' . $file->getClientOriginalExtension();
            $file->storeAs("public/pesantren/{$pesantren->slug}/validasi", $filename);
            $pesantren->validasi()->create([
                'pesantren_id' => $pesantren->id,
                'kategori_validasi' => 'rmi',
                'file' => $filename,
            ]);
        }

        return redirect()->route('pesantren.photo.edit', $pesantren->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Validasi $validasi)
    {
        //
    }
}
