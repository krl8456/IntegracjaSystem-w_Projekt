<?php

use App\Http\Controllers\ConsumerProductController;
use App\Http\Controllers\NonConsumerProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\JsonToXmlController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/register', [AuthController::class, 'register'])->name('register');

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::put('/user/update', [AuthController::class, 'update']);
    Route::delete('/user/delete', [AuthController::class, 'delete']);
    Route::get('/xml', [JsonToXmlController::class, 'getCombinedXmlData']);
    Route::get('/consumer-products/xml', [JsonToXmlController::class, 'convertConsumerProducts']);
    Route::get('/non-consumer-products/xml', [JsonToXmlController::class, 'convertNonConsumerProducts']);
    // Route::get('/consumer-products', [ConsumerProductController::class, 'index']);
    // Route::get('/consumer-products/{id}', [ConsumerProductController::class, 'show']);
    // Route::get('/non-consumer-products', [NonConsumerProductController::class, 'index']);
    // Route::get('/non-consumer-products/{id}', [NonConsumerProductController::class, 'show']);
    
});