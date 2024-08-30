<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class Pesantren extends Model
{
    use HasFactory;

    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $incrementing = false;
    protected $fillable = ['user_id', 'name', 'slug', 'kecamatan', 'alamat', 'pendiri', 'pengasuh', 'tanggal_berdiri', 'jumlah_santri', 'deskripsi', 'gender', 'program_unggulan', 'contact', 'video_profil'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function programs()
    {
        return $this->belongsToMany(Program::class, 'pesantren_program');
    }

    public function tingkats()
    {
        return $this->belongsToMany(Tingkat::class, 'pesantren_tingkat');
    }

    public function media()
    {
        return $this->hasOne(Media::class);
    }

    public function photos()
    {
        return $this->hasMany(PesantrenPhoto::class, 'pesantren_id');
    }

    public function validasi()
    {
        return $this->hasMany(Validasi::class);
    }

    public function usaha()
    {
        return $this->hasMany(UsahaPesantren::class);
    }

    // Pesantren Search
    public function scopeSearch($query, $search)
    {
        return $query->when($search, function ($query) use ($search) {
            return $query->where('name', 'like', "%{$search}%");
        });
    }

    public function scopeGender($query, $gender)
    {
        return $query->when($gender, function ($query) use ($gender) {
            return $query->where('gender', in_array($gender, ['putra,putri', 'putri,putra']) ? 'putra_putri' : $gender);
        });
    }

    public function scopePrograms($query, $programs)
    {
        return $query->when($programs, function ($query) use ($programs) {
            return $query->whereHas('programs', function ($q) use ($programs) {
                $q->whereIn('name', explode(',', $programs));
            });
        });
    }

    public function scopeTingkats($query, $tingkats)
    {
        return $query->when($tingkats, function ($query) use ($tingkats) {
            return $query->whereHas('tingkats', function ($q) use ($tingkats) {
                $q->whereIn('name', explode(',', $tingkats));
            });
        });
    }

    public function scopeKecamatan($query, $kecamatans)
    {
        return $query->when($kecamatans, function ($query) use ($kecamatans) {
            return $query->whereIn('kecamatan', explode(',', $kecamatans));
        });
    }
}
