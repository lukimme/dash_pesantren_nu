<?php

use App\Http\Controllers\MediaController;
use App\Http\Controllers\PesantrenController;
use App\Http\Controllers\PesantrenDeskripsiController;
use App\Http\Controllers\PesantrenPhotoController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\TingkatController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ValidasiController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return redirect('/dashboard');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::resource('/pesantren', PesantrenController::class);
    Route::get('/pesantren/{pesantren}/edit/media', [MediaController::class, 'edit'])->name('pesantren.media.edit');
    Route::get('/pesantren/{pesantren}/edit/deskripsi', [PesantrenDeskripsiController::class, 'edit'])->name('pesantren.deskripsi.edit');
    Route::put('/pesantren/{pesantren}/update/deskripsi', [PesantrenDeskripsiController::class, 'update'])->name('pesantren.deskripsi.update');
    Route::put('/pesantren/{pesantren}/update/media', [MediaController::class, 'update'])->name('pesantren.media.update');
    Route::get('/pesantren/{pesantren}/edit/validasi', [ValidasiController::class, 'edit'])->name('pesantren.validasi.edit');
    Route::put('/pesantren/{pesantren}/update/validasi', [ValidasiController::class, 'update'])->name('pesantren.validasi.update');
    Route::get('/pesantren/{pesantren}/edit/photo', [PesantrenPhotoController::class, 'edit'])->name('pesantren.photo.edit');
    Route::put('/pesantren/{pesantren}/update/photo', [PesantrenPhotoController::class, 'update'])->name('pesantren.photo.update');

    Route::resource('/user', UserController::class);
    Route::resource('/role', RoleController::class);
});

require __DIR__ . '/auth.php';
