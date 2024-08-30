<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pesantrens', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('alamat')->nullable();
            $table->enum('kecamatan', ['lowokwaru', 'blimbing', 'kedungkandang', 'klojen', 'sukun'])->nullable();
            $table->string('pendiri')->nullable();
            $table->string('pengasuh')->nullable();
            $table->datetime('tanggal_berdiri')->nullable();
            $table->text('deskripsi')->nullable();
            $table->integer('jumlah_santri')->nullable();
            $table->enum('gender', ['putra', 'putri', 'putra_putri'])->nullable();
            $table->string('program_unggulan')->nullable();
            $table->string('contact')->nullable();
            $table->string('logo')->nullable();
            $table->string('video_profil')->nullable();
            $table->string('foto_sampul')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesantrens');
    }
};
