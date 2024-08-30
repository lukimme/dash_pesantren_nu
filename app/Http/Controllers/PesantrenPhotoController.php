<?php

namespace App\Http\Controllers;

use App\Models\Pesantren;
use App\Models\PesantrenPhoto;
use App\Http\Requests\StorePesantrenPhotoRequest;
use App\Http\Requests\UpdatePesantrenPhotoRequest;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;

class PesantrenPhotoController extends Controller
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
    public function store(StorePesantrenPhotoRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(PesantrenPhoto $pesantrenPhoto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Pesantren $pesantren)
    {
        Gate::authorize('pesantren_edit');

        $pesantren = Pesantren::with('photos')->find($pesantren->id);

        return inertia('Pesantren/EditPhoto', [
            'pesantren' => $pesantren
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePesantrenPhotoRequest $request, Pesantren $pesantren)
    {
        Gate::authorize('pesantren_edit');
        if ($request->hasFile('photos')) {
            $photos = $request->file('photos');
            if ($pesantren->photos()->count() > 0) {
                Storage::deleteDirectory("public/pesantren/{$pesantren->slug}/photos");
                $pesantren->photos()->delete();
            }
            for ($i = 0; $i < count($photos); $i++) {
                $photo = $photos[$i];
                $photoName = $i + 1 . '.' . $photo->getClientOriginalExtension();
                $photo->storeAs("public/pesantren/{$pesantren->slug}/photos", $photoName);
                $pesantren->photos()->create([
                    'pesantren_id' => $pesantren->id,
                    'file' => $photoName
                ]);
            }
        }

        $validatedData = $request->validated();

        $pesantren->update([
            'video_profil' => $validatedData['video_profil']
        ]);

        return redirect()->route('pesantren.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PesantrenPhoto $pesantrenPhoto)
    {
        //
    }
}
