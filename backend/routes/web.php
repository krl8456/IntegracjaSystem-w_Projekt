<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NonConsumerProductController;
use App\Http\Controllers\ConsumerProductController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/api/non-consumer-product-chart-data', [NonConsumerProductController::class, 'getChartData']);
Route::get('/api/consumer-product-chart-data', [ConsumerProductController::class, 'getChartDataCons']);

Route::get('/', function () {
    return view('welcome');
});
