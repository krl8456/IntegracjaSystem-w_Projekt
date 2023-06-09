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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('Zmienna');
            $table->string('Typ informacji');
            $table->string('Towary nieżywnościowe i usługi konsumpcyjne');
            $table->string('Towary żywnościowe');
            $table->string('Jednostka terytorialna');
            $table->decimal('2021 M01', 8, 2);
            $table->integer('2021 M01-Flaga');
            $table->decimal('2021 M02', 8, 2);
            $table->integer('2021 M02-Flaga');
            $table->decimal('2021 M03', 8, 2);
            $table->integer('2021 M03-Flaga');
            $table->decimal('2021 M04', 8, 2);
            $table->integer('2021 M04-Flaga');
            $table->decimal('2021 M05', 8, 2);
            $table->integer('2021 M05-Flaga');
            $table->decimal('2021 M06', 8, 2);
            $table->integer('2021 M06-Flaga');
            $table->decimal('2021 M07', 8, 2);
            $table->integer('2021 M07-Flaga');
            $table->decimal('2021 M08', 8, 2);
            $table->integer('2021 M08-Flaga');
            $table->decimal('2021 M09', 8, 2);
            $table->integer('2021 M09-Flaga');
            $table->decimal('2021 M10', 8, 2);
            $table->integer('2021 M10-Flaga');
            $table->decimal('2021 M11', 8, 2);
            $table->integer('2021 M11-Flaga');
            $table->decimal('2021 M12', 8, 2);
            $table->integer('2021 M12-Flaga');
            $table->decimal('2022 M01', 8, 2);
            $table->integer('2022 M01-Flaga');
            $table->decimal('2022 M02', 8, 2);
            $table->integer('2022 M02-Flaga');
            $table->decimal('2022 M03', 8, 2);
            $table->integer('2022 M03-Flaga');
            $table->decimal('2022 M04', 8, 2);
            $table->integer('2022 M04-Flaga');
            $table->decimal('2022 M05', 8, 2);
            $table->integer('2022 M05-Flaga');
            $table->decimal('2022 M06', 8, 2);
            $table->integer('2022 M06-Flaga');
            $table->decimal('2022 M07', 8, 2);
            $table->integer('2022 M07-Flaga');
            $table->decimal('2022 M08', 8, 2);
            $table->integer('2022 M08-Flaga');
            $table->decimal('2022 M09', 8, 2);
            $table->integer('2022 M09-Flaga');
            $table->decimal('2022 M10', 8, 2);
            $table->integer('2022 M10-Flaga');
            $table->decimal('2022 M11', 8, 2);
            $table->integer('2022 M11-Flaga');
            $table->decimal('2022 M12', 8, 2);
            $table->integer('2022 M12-Flaga');
            $table->decimal('2023 M01', 8, 2);
            $table->integer('2023 M01-Flaga');
            $table->decimal('2023 M02', 8, 2);
            $table->integer('2023 M02-Flaga');
            $table->decimal('2023 M03', 8, 2);
            $table->integer('2023 M03-Flaga');
            $table->decimal('2023 M04', 8, 2);
            $table->integer('2023 M04-Flaga');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};