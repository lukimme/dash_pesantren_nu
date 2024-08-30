<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePesantrenRequest;
use App\Http\Requests\UpdatePesantrenRequest;
use App\Models\Media;
use App\Models\Pesantren;
use App\Models\Program;
use App\Models\Tingkat;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Gate;

class PesantrenController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::define('pesantren_access', function ($user) {
            return $user->can('pesantren_access_all') || $user->can('pesantren_access_self');
        });
        if (Gate::check('pesantren_access_all')) {
            $pesantrenData = Pesantren::with('user', 'programs', 'tingkats')->get();
            return inertia('Pesantren/Index', [
                'pesantrenData' => $pesantrenData
            ]);
        }

        if (Gate::check('pesantren_access_self')) {
            $pesantrenData = Pesantren::with('user', 'programs', 'tingkats')
                ->where('user_id', auth()->user()->id)
                ->get();
            return inertia('Pesantren/Index', [
                'pesantrenData' => $pesantrenData
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('pesantren_create');

        $users = User::HasPesantrenEditPermissionAndNoPesantren()->get();

        $program = Program::all();
        $tingkat = Tingkat::all();

        return inertia('Pesantren/Create', [
            'users' => $users,
            'program' => $program,
            'tingkat' => $tingkat,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePesantrenRequest $request)
    {
        Gate::authorize('pesantren_create');

        $pesantren = new Pesantren;
        $uuid = Str::uuid()->__tostring();
        $pesantren->id = $uuid;
        $pesantren->fill($request->validated());


        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $filename = 'logo.' . $logo->getClientOriginalExtension();
            $logo->storeAs("public/pesantren/{$pesantren->slug}", $filename);
            $pesantren->logo = $filename;
        }

        if ($request->hasFile('foto_sampul')) {
            $foto_sampul = $request->file('foto_sampul');
            $filename = 'foto_sampul.' . $foto_sampul->getClientOriginalExtension();
            $foto_sampul->storeAs("public/pesantren/{$pesantren->slug}", $filename);
            $pesantren->foto_sampul = $filename;
        }

        $pesantren->save();

        $pesantren = Pesantren::find($uuid);

        $media = new Media([
            'pesantren_id' => $pesantren->id,
        ]);

        $pesantren->media()->save($media);

        $pesantren->programs()->attach($request->program);
        $pesantren->tingkats()->attach($request->tingkat);

        return redirect()->route('pesantren.index');
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

        $users = User::HasPesantrenEditPermissionAndNoPesantren()->get();
        $users = $users->push(User::find($pesantren->user_id));

        $program = Program::all();
        $tingkat = Tingkat::all();

        $pesantren = Pesantren::with('user', 'programs', 'tingkats')->find($pesantren->id);

        return inertia('Pesantren/Edit', [
            'users' => $users,
            'program' => $program,
            'tingkat' => $tingkat,
            'pesantren' => $pesantren
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePesantrenRequest $request, Pesantren $pesantren)
    {
        Gate::authorize('pesantren_edit');

        if ($pesantren->slug != $request->slug) {
            rename(storage_path("app/public/pesantren/{$pesantren->slug}"), storage_path("app/public/pesantren/{$request->slug}"));
        }

        $pesantren->update($request->validated());

        if ($request->hasFile('logo')) {
            $logo = $request->file('logo');
            $filename = 'logo.' . $logo->getClientOriginalExtension();

            if ($pesantren->logo) {
                Storage::delete("public/pesantren/{$pesantren->slug}/{$pesantren->logo}");
                $pesantren->update([
                    'logo' => $filename,
                ]);
            } else {
                $pesantren->logo = $filename;
                $pesantren->save();
            }

            $logo->storeAs("public/pesantren/{$pesantren->slug}", $filename);
        }

        if ($request->hasFile('foto_sampul')) {
            $foto_sampul = $request->file('foto_sampul');
            $filename = 'foto_sampul.' . $foto_sampul->getClientOriginalExtension();

            if ($pesantren->foto_sampul) {
                Storage::delete("public/pesantren/{$pesantren->slug}/{$pesantren->foto_sampul}");
                $pesantren->update([
                    'foto_sampul' => $filename,
                ]);
            } else {
                $pesantren->foto_sampul = $filename;
                $pesantren->save();
            }

            $foto_sampul->storeAs("public/pesantren/{$pesantren->slug}", $filename);
        }

        $pesantren->programs()->sync($request->program);
        $pesantren->tingkats()->sync($request->tingkat);

        return redirect()->route('pesantren.deskripsi.edit', $pesantren->id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pesantren $pesantren)
    {
        Gate::authorize('pesantren_delete');

        Storage::deleteDirectory("public/pesantren/{$pesantren->slug}");
        $pesantren->delete();
        return redirect()->route('pesantren.index');
    }
}
