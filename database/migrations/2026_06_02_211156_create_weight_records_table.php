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
        Schema::create('weight_records', function (Blueprint $table) {
            $table->id();
            $table->dateTime('weight_date');
            $table->decimal('weight', 7,2);
            $table->enum('body_condition_score', ['1', '2', '3', '4', '5']);
            $table->text('observations');
            $table->foreignId('animals_id')->constrained()->restrictOnDelete();
            $table->foreignId('productive_stages_id')->constrained()->restrictOnDelete();
            $table->foreignId('weight_methods_id')->constrained()->restrictOnDelete();
            $table->boolean('previous_fast');
            $table->enum('pregnancy', ['Vacia', 'Seca', 'Lactante', 'Gestante']);
            $table->integer('lactation days');
            $table->integer('number_of_births');
            $table->decimal('room_temperature', 10, 5);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('weight_records');
    }
};
