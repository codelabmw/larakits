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
        Schema::create('kits', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('name');
            $table->string('vendor');
            $table->text('description')->nullable();
            $table->string('source_url')->nullable();
            $table->string('source_type')->nullable();
            $table->integer('stars')->default(0);
            $table->integer('downloads')->default(0);
            $table->json('maintainers')->nullable();
            $table->json('authors')->nullable();
            $table->json('licenses')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kits');
    }
};
