<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AddController;
use App\Http\Controllers\GetController;

header('Access-Control-Allow-Origin: *');
//Access-Control-Allow-Origin: *
header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/add', [AddController::class, 'add']);
Route::post('/add_tag', [AddController::class, 'addTag']);
Route::post('/add_category', [AddController::class, 'addCategory']);
Route::post('/add_kpi', [AddController::class, 'addKpi']);
Route::post('/update', [AddController::class, 'updateTable']);
Route::post('/delete', [AddController::class, 'delete']);

Route::get('/get_category/{kategoria}', [GetController::class, 'getCategory']);
Route::get('/get_tag/{tag}', [GetController::class, 'getTag']);
Route::get('/get_all_tags', [GetController::class, 'getAllTags']);
Route::get('/get_all_categories', [GetController::class, 'getAllCategories']);
Route::get('/get_kpi/{kpi}', [GetController::class, 'getKpi']);
Route::get('/get_all_kpis', [GetController::class, 'getAllKpis']);
Route::get('/get_grid_tags', [GetController::class, 'getGridTags']);
Route::get('/get_grid_data', [GetController::class, 'getGridData']);
Route::get('/search/{haku}', [GetController::class, 'searchData']);