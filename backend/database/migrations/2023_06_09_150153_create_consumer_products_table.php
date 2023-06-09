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
        Schema::create('consumer_products', function (Blueprint $table) {
            $table->id();
            $table->string('Zmienna');
            $table->string('Typ informacji');
            $table->string('Towary żywnościowe');
            $table->string('Jednostka terytorialna');
            $table->decimal('2022 M02', 8, 5);
            $table->decimal('2022 M03', 8, 5);
            $table->decimal('2022 M04', 8, 5);
            $table->decimal('2022 M05', 8, 5);
            $table->decimal('2022 M06', 8, 5);
            $table->decimal('2022 M07', 8, 5);
            $table->decimal('2022 M08', 8, 5);
            $table->decimal('2022 M09', 8, 5);
            $table->decimal('2022 M10', 8, 5);
            $table->decimal('2022 M11', 8, 5);
            $table->decimal('2022 M12', 8, 5);
            $table->decimal('2023 M01', 8, 5);
            $table->decimal('2023 M02', 8, 5);
            $table->decimal('2023 M03', 8, 5);
            $table->decimal('2023 M04', 8, 5);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consumer_products');
    }
};