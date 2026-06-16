<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * ============================
     * NOTA: El campo user_id es para saber a que persona le pertenece ese animal, para notificaciones para el ganadero y trazabilidad
     */
    public function up(): void
    {
        Schema::create('animal_order', function (Blueprint $table) {
            $table->id();
            $table->foreignId('animal_id')->constrained()->restrictOnDelete();
            $table->foreignId('order_id')->constrained()->restrictOnDelete();
            $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->enum('status_order', [
                'Pendiente de pago',
                'Pendiente de confirmacion',
                'Confirmado',
                'Rechazado',
                'Cancelado',
            ])->default('Pendiente de pago');
            $table->decimal('snapshot_price', 10, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animal_order');
    }
};
