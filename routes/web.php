<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PulauController;
use App\Http\Controllers\JenisDataController;
use App\Http\Controllers\DataPantaiController;
use App\Http\Controllers\DataLimbahController;
use App\Http\Controllers\DataAirController;
use App\Http\Controllers\DokumenController;
use App\Http\Controllers\UnitKerjaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Route::get('dashboard', function () {
    //     return Inertia::render('dashboard');
    // })->name('dashboard');
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/master-data/pulau', [PulauController::class, 'index'])->name('pulau.index');
    Route::post('/master-data/pulau', [PulauController::class, 'store'])->name('pulau.store');
    Route::put('/master-data/pulau/{pulau}', [PulauController::class, 'update'])->name('pulau.update');
    Route::delete('/master-data/pulau/{pulau?}', [PulauController::class, 'destroy'])->name('pulau.delete');

    Route::get('/master-data/jenis-data', [JenisDataController::class, 'index'])->name('jenis-data.index');
    Route::post('/master-data/jenis-data', [JenisDataController::class, 'store'])->name('jenis-data.store');
    Route::put('/master-data/jenis-data/{pulau}', [JenisDataController::class, 'update'])->name('jenis-data.update');
    Route::delete('/master-data/jenis-data/{pulau?}', [JenisDataController::class, 'destroy'])->name('jenis-data.delete');

    Route::get('/master-data/unit-kerja', [UnitKerjaController::class, 'index'])->name('unit-kerja.index');
    Route::post('/master-data/unit-kerja', [UnitKerjaController::class, 'store'])->name('unit-kerja.store');
    Route::put('/master-data/unit-kerja/{unit_kerja}', [UnitKerjaController::class, 'update'])->name('unit-kerja.update');
    Route::delete('/master-data/unit-kerja/{unit_kerja?}', [UnitKerjaController::class, 'destroy'])->name('unit-kerja.delete');

    Route::get('/kelola-data/pantai', [DataPantaiController::class, 'index'])->name('kelola-data.pantai.index');
    Route::post('/kelola-data/pantai', [DataPantaiController::class, 'store'])->name('kelola-data.pantai.store');
    Route::put('/kelola-data/pantai/{dataPantai}', [DataPantaiController::class, 'update'])->name('kelola-data.pantai.update');
    Route::delete('/kelola-data/pantai/{dataPantai?}', [DataPantaiController::class, 'destroy'])->name('kelola-data.pantai.delete');

    Route::get('/kelola-data/limbah', [DataLimbahController::class, 'index'])->name('kelola-data.limbah.index');
    Route::post('/kelola-data/limbah', [DataLimbahController::class, 'store'])->name('kelola-data.limbah.store');
    Route::put('/kelola-data/limbah/{dataLimbah}', [DataLimbahController::class, 'update'])->name('kelola-data.limbah.update');
    Route::delete('/kelola-data/limbah/{dataLimbah?}', [DataLimbahController::class, 'destroy'])->name('kelola-data.limbah.delete');

    Route::get('/kelola-data/air', [DataAirController::class, 'index'])->name('kelola-data.air.index');
    Route::post('/kelola-data/air', [DataAirController::class, 'store'])->name('kelola-data.air.store');
    Route::put('/kelola-data/air/{dataAir}', [DataAirController::class, 'update'])->name('kelola-data.air.update');
    Route::delete('/kelola-data/air/{dataAir?}', [DataAirController::class, 'destroy'])->name('kelola-data.air.delete');

    Route::get('/download/{path}/{nama}', [DokumenController::class, 'download'])->where('path', '.*');
});

require __DIR__.'/settings.php';
