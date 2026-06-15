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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->string('deposit_id', 100)->nullable();
            $table->foreignId('transaction_id')->nullable()->constrained()->restrictOnDelete();
            $table->string('wompi_id', 255)->unique();
            $table->string('internal_reference', 100);
            $table->dateTime('transaction_date')->useCurrent();
            $table->string('moneda', 10)->default('COP');
            $table->decimal('amount', 10, 2);
            $table->enum('transaction_status', ["reembolsada", 'expirada', 'pendiente', 'aprobada', 'rechazada',]);
            $table->enum('transaction_type', ["reembolso", 'pago_subasta', 'deposito_subasta', 'compra']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
