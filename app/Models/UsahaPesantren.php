<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UsahaPesantren extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = ['pesantren_id', 'name', 'alamat', 'deskripsi', 'contact'];

    public function pesantren()
    {
        return $this->belongsTo(Pesantren::class);
    }

    public function photos()
    {
        return $this->hasMany(UsahaPesantrenPhoto::class, 'usaha_pesantren_id');
    }

    public function categoryUsaha()
    {
        return $this->belongsToMany(CategoryUsaha::class);
    }
}
