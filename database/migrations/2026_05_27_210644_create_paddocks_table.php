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
        Schema::create('paddocks', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->decimal('area', 6, 2);
            $table->text('type_of_grass');
            $table->integer('capacity');
            $table->foreignId('farm_id')->constrained()->restrictOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('paddocks');
    }
};
