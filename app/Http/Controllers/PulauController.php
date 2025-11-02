<?php

namespace App\Http\Controllers;

use App\Models\MstPulau;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PulauController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pulau = MstPulau::orderBy('nama')->get();

        return Inertia::render('master-data/pulau/index', [
            'pulau' => $pulau,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'longitude' => ['nullable', 'numeric'],
            'latitude' => ['nullable', 'numeric'],
        ]);

        MstPulau::create($validated);

        return redirect()->route('pulau.index')->with('success', 'Data pulau berhasil ditambahkan');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MstPulau $pulau)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'longitude' => ['nullable', 'numeric'],
            'latitude' => ['nullable', 'numeric'],
        ]);

        $pulau->update($validated);

        return back()->with('success', 'Data pulau berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $pulau = null)
    {
        if ($pulau) {
            $model = MstPulau::findOrFail($pulau);
            $model->delete();

            return redirect()->back()->with('success', 'Pulau berhasil dihapus');
        }

        $ids = $request->input('ids', []);
        if (!empty($ids)) {
            MstPulau::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Beberapa data pulau berhasil dihapus');
        }

        return redirect()->back()->with('error', 'Tidak ada ID yang dipilih');
    }
}
