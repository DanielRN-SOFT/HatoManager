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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->dateTime('date')->useCurrent();
            $table->enum('bussiness_status', [
                'Pendiente de confirmacion',
                'Cancelado por comprador',
                'Rechazado por ganadero',
                'Confirmado',
                'Completado',
            ])->default('Pendiente de confirmacion');
            $table->enum('payment_status', [
                'Pendiente',
                'Aprobado',
                'Rechazado',
                'Expirado',
                'Reembolsado',
            ])->default('Pendiente');
            $table->decimal('subtotal', 10, 2);
            $table->string('referencia', 100)->unique()->nullable();
           $table->foreignId('user_id')->constrained()->restrictOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
