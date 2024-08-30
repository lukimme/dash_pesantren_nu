<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Http\Resources\Api\PesantrenCollection;
use App\Http\Resources\Api\PesantrenResource;
use App\Models\Pesantren;
use Illuminate\Http\Request;

class PesantrenController extends Controller
{
    public function index(Request $request)
    {
        $query = Pesantren::with('programs', 'tingkats');

        $query->search($request->input('search'))
            ->gender($request->input('gender'))
            ->programs($request->input('program'))
            ->tingkats($request->input('tingkat'))
            ->kecamatan($request->input('kecamatan'));

        $pesantrens = $query->get();

        return new PesantrenCollection($pesantrens);
    }

    public function show(string $slug)
    {
        $pesantren = Pesantren::with('programs', 'tingkats', 'media', 'photos', 'validasi')->where('slug', $slug)->firstOrFail();
        return new PesantrenResource($pesantren);
    }
}