<?php

namespace App\Http\Controllers;

use App\Models\JenisData;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JenisDataController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $jenisData = JenisData::orderBy('nama')->get();

        return Inertia::render('master-data/jenis-data/index', [
            'jenis_data' => $jenisData,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'deskripsi' => ['nullable', 'string'],
        ]);

        JenisData::create($validated);

        return redirect()->route('jenis-data.index')->with('success', 'Data jenis data berhasil ditambahkan');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, JenisData $jenisData)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
            'deskripsi' => ['nullable', 'string'],
        ]);

        $jenisData->update($validated);

        return back()->with('success', 'Data jenis data berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $jenisData = null)
    {
        if ($jenisData) {
            $model = JenisData::findOrFail($jenisData);
            $model->delete();

            return redirect()->back()->with('success', 'Jenis data berhasil dihapus');
        }

        $ids = $request->input('ids', []);
        if (!empty($ids)) {
            JenisData::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Beberapa data jenis data berhasil dihapus');
        }

        return redirect()->back()->with('error', 'Tidak ada ID yang dipilih');
    }
}
