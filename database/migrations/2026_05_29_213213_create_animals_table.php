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
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('ear_tag')->unique();
            $table->string('breed');
            $table->string('sex');
            $table->text('photo');
            $table->date('birth_date');
            $table->string('status');
            $table->text('description')->nullable();
            $table->text('previous_diseases');
            $table->decimal('price', 10, 4);
            $table->integer('target_weight');
            $table->decimal('price_weight', 10, 4);
            $table->date('publication_date');
            $table->foreignId('farm_id')->constrained()->restrictOnDelete();
            $table->foreignId('animal_category_id')->constrained()->restrictOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
