<?php

use App\Http\Controllers\PulauController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    Route::get('kelola-data/pantai', function () {
        return Inertia::render('kelola-data/pantai');
    })->name('kelola-data.pantai');

    Route::get('/master-data/pulau', [PulauController::class, 'index'])->name('pulau.index');
    Route::post('/master-data/pulau', [PulauController::class, 'store'])->name('pulau.store');
    Route::put('/master-data/pulau/{pulau}', [PulauController::class, 'update'])->name('pulau.update');
    Route::delete('/master-data/pulau/{pulau?}', [PulauController::class, 'destroy'])->name('pulau.delete');
});

require __DIR__.'/settings.php';
