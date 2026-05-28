<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('veterinarian_invitations', function (Blueprint $table) {
            $table->id();
            $table->string('email');
            $table->string('token')->nullable()->unique();
            $table->timestamp('token_expires_at')->nullable();
            $table->string('status')->default('pending');
            $table->timestamps();
            $table->unique(['farm_id', 'email', 'status']);
            $table->foreignId('farm_id')->constrained()->cascadeOnDelete();
            $table->foreignId('invited_by')->constrained('users')->cascadeOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('vet_invitations');
    }
};
