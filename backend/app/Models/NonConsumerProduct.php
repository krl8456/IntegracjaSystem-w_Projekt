<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NonConsumerProduct extends Model
{
    protected $fillable = [
        'Zmienna',
        'Typ informacji',
        'Towary nieżywnościowe i usługi konsumpcyjne',
        'Jednostka terytorialna',
        '2021 M01',
        '2021 M02',
        '2021 M03',
        '2021 M04',
        '2021 M05',
        '2021 M06',
        '2021 M07',
        '2021 M08',
        '2021 M09',
        '2021 M10',
        '2021 M11',
        '2021 M12',
        '2022 M01',
        '2022 M02',
        '2022 M03',
        '2022 M04',
        '2022 M05',
        '2022 M06',
        '2022 M07',
        '2022 M08',
        '2022 M09',
        '2022 M10',
        '2022 M11',
        '2022 M12',
        '2023 M01',
        '2023 M02',
        '2023 M03',
        '2023 M04',
];
    use HasFactory;
}
