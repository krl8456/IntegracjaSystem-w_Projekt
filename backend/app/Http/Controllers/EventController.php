<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\DB;
use Illuminate\View\View;

use App\Models\Event;

class EventController extends Controller
{
    public function getChartDataCons()
    {
        $dane = Event::select('data', 'wydarzenia')->get();

        $formattedData = $dane->map(function ($data) {
            $values = [];
            foreach ($data->toArray() as $key => $value) {
                
                    $values[] = $value;
            }

            return [
                'data' => $data,
                'wydarzenia' => $values,
            ];
        });

        return response()->json($formattedData);
    }
}
