<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    public $timestamps = false;

    public $fillable = ['pesantren_id', 'instagram', 'facebook', 'youtube', 'tiktok', 'twitter', 'website'];

    public function pesantren()
    {
        return $this->belongsTo(Pesantren::class);
    }
}
