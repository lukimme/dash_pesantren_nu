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
        Schema::create('usaha_pesantren_photos', function (Blueprint $table) {
            $table->id();
            $table->uuid('usaha_pesantren_id');
            $table->foreign('usaha_pesantren_id')->references('id')->on('usaha_pesantrens')->onDelete('cascade');
            $table->string('file');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usaha_pesantren_photos');
    }
};
