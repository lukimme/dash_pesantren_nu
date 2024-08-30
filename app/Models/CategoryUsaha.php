<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CategoryUsaha extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function usaha()
    {
        return $this->belongsToMany(UsahaPesantren::class);
    }
}
