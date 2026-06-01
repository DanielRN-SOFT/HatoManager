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
            $table->integer('ear_tag');
            $table->enum('sex', ['M', 'H']);
            $table->text('photo')->nullable();
            $table->date('birth_date');
            $table->string('status')->default('Activo');
            $table->text('description')->nullable();
            $table->text('previous_diseases')->nullable();
            $table->decimal('price', 15, 4);
            $table->integer('target_weight');
            $table->decimal('price_weight', 15, 4);
            $table->date('publication_date')->nullable();
            $table->foreignId('farm_id')->constrained()->restrictOnDelete();
            $table->foreignId('animal_category_id')->constrained()->restrictOnDelete();
            $table->foreignId('breed_id')->constrained()->restrictOnDelete();
            $table->unique(['farm_id', 'ear_tag']);
            $table->softDeletes();
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
