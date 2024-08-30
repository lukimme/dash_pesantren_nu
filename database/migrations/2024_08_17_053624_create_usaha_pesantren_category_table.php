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
        Schema::create('usaha_pesantren_category', function (Blueprint $table) {
            $table->uuid('usaha_pesantren_id');
            $table->foreign('usaha_pesantren_id')->references('id')->on('usaha_pesantrens')->onDelete('cascade');
            $table->foreignId('category_usaha_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usaha_pesantren_category');
    }
};
