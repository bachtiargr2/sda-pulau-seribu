<?php

namespace App\Http\Controllers;

use App\Models\UnitKerja;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UnitKerjaController extends Controller
{
    //
    public function index() {
        $unit_kerja = UnitKerja::orderBy('nama')->get();

        return Inertia::render('master-data/unit-kerja/index', [
            'unit_kerja' => $unit_kerja,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
        ]);

        UnitKerja::create($validated);

        return redirect()->route('unit-kerja.index')->with('success', 'Data jenis data berhasil ditambahkan');
    }

    public function update(Request $request, UnitKerja $unitKerja)
    {
        $validated = $request->validate([
            'nama' => ['required', 'string', 'max:100'],
        ]);

        $unitKerja->update($validated);

        return back()->with('success', 'Data jenis data berhasil diperbarui');
    }

    public function destroy(Request $request, $unitKerja = null)
    {
        if ($unitKerja) {
            $model = UnitKerja::findOrFail($unitKerja);
            $model->delete();

            return redirect()->back()->with('success', 'Jenis data berhasil dihapus');
        }

        $ids = $request->input('ids', []);
        if (!empty($ids)) {
            UnitKerja::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Beberapa data jenis data berhasil dihapus');
        }

        return redirect()->back()->with('error', 'Tidak ada ID yang dipilih');
    }
}
