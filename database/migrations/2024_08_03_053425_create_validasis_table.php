<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('validasis', function (Blueprint $table) {
            $table->id();
            $table->uuid('pesantren_id');
            $table->foreign('pesantren_id')->references('id')->on('pesantrens')->onDelete('cascade');
            $table->string('kategori_validasi');
            $table->string('file');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('validasis');
    }
};
