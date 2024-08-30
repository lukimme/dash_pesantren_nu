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
        Schema::create('pesantren_tingkat', function (Blueprint $table) {
            $table->uuid('pesantren_id');
            $table->foreign('pesantren_id')->references('id')->on('pesantrens')->onDelete('cascade');
            $table->foreignId('tingkat_id')->constrained()->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pesantren_tingkat');
    }
};
