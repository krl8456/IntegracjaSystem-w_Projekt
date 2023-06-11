<?php

use App\Http\Controllers\ConsumerProductController;
use App\Http\Controllers\NonConsumerProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

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
    Route::get('/consumerproducts', [ConsumerProductController::class, 'index']);
    Route::get('/consumerproducts/{id}', [ConsumerProductController::class, 'show']);
    Route::get('/nonconsumerproducts', [NonConsumerProductController::class, 'index']);
    Route::get('/nonconsumerproducts/{id}', [NonConsumerProductController::class, 'show']);

});