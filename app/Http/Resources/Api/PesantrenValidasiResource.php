<?php

namespace App\Http\Resources\Api;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PesantrenValidasiResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'kategori_validasi' => $this->kategori_validasi,
            'file' => asset("storage/pesantren/{$this->pesantren->slug}/validasi/{$this->file}"),
        ];
    }
}
