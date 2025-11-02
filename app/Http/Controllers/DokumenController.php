<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DokumenController extends Controller
{
    public function download($path, $name)
    {
        if (!Storage::exists($path)) {
            abort(404, 'File not found');
        }
        return Storage::download($path, $name);
    }
}
