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
        Schema::create('usaha_pesantrens', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('pesantren_id');
            $table->foreign('pesantren_id')->references('id')->on('pesantrens')->onDelete('cascade');
            $table->string('name');
            $table->string('alamat')->nullable();
            $table->text('deskripsi')->nullable();
            $table->string('contact')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usaha_pesantrens');
    }
};
