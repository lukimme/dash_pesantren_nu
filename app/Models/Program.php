<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function pesantren()
    {
        return $this->belongsToMany(Pesantren::class, 'pesantren_program');
    }
}
