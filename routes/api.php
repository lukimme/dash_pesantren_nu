<?php

use App\Http\Controllers\Api\PesantrenController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/api/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/pesantren', [PesantrenController::class, 'index']);
Route::get('/pesantren/{slug}', [PesantrenController::class, 'show']);