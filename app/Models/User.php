<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'status',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function pesantren()
    {
        return $this->hasOne(Pesantren::class);
    }

    public function scopeHasPesantrenEditPermission($query)
    {
        return $query->whereHas('roles.permissions', function ($query) {
            $query->where('name', 'pesantren_edit');
        })->where('id', '!=', 1);
    }

    public function scopePesantrenEmpty($query)
    {
        return $query->whereDoesntHave('pesantren');
    }

    public function scopeHasPesantrenEditPermissionAndNoPesantren(Builder $query)
    {
        return $query->hasPesantrenEditPermission()->pesantrenEmpty();
    }
}
