<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PesantrenPhoto extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $fillable = ['pesantren_id', 'file'];

    public function pesantren()
    {
        return $this->belongsTo(Pesantren::class);
    }
}
