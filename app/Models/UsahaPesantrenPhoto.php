<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsahaPesantrenPhoto extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = ['usaha_pesantren_id', 'file'];
    public function usaha()
    {
        return $this->belongsTo(UsahaPesantren::class);
    }
}
