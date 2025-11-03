<?php

namespace App\Http\Controllers;

use App\Models\DataAnggaran;
use App\Models\MstPulau;
use App\Models\JenisData;
use App\Models\Status;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class DataLimbahController extends Controller
{
    public function index()
    {
        // Hanya ambil data dengan kategori limbah
        $dataLimbah = DataAnggaran::with(['pulau', 'jenisData', 'kategori', 'statusData'])
            ->where('id_kategori', 3)
            ->orderBy('tahun', 'desc')
            ->get()
            ->map(function ($item) {
                $item->dokumen_url = $item->dokumen_path
                    ? asset('storage/' . $item->dokumen_path)
                    : null;
                return $item;
            });

        return Inertia::render('kelola-data/limbah/index', [
            'data_limbah' => $dataLimbah,
            'pulauOptions' => MstPulau::all(['id', 'nama']),
            'jenisDataOptions' => JenisData::all(['id', 'nama']),
            'statusOptions' => Status::all(['id', 'nama']),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_pulau' => 'required|exists:mst_pulau,id',
            'id_jenis_data' => 'required|exists:jenis_data,id',
            'tahun' => 'required|integer',
            'dokumen' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx',
            'status' => 'nullable|integer|exists:statuses,id',
        ]);

        $validated['id_kategori'] = 3;

        if ($request->hasFile('dokumen')) {
            $path = $request->file('dokumen')->store('dokumen_limbah', 'public');
            $validated['dokumen_path'] = $path;
            $validated['dokumen_nama'] = $request->file('dokumen')->getClientOriginalName();
        }

        DataAnggaran::create($validated);

        return redirect()->route('kelola-data.limbah.index')->with('success', 'Data limbah berhasil ditambahkan');
    }

    public function update(Request $request, DataAnggaran $dataLimbah)
    {
        $validated = $request->validate([
            'id_pulau' => 'required|exists:mst_pulau,id',
            'id_jenis_data' => 'required|exists:jenis_data,id',
            'tahun' => 'required|integer',
            'dokumen' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx',
            'status' => 'nullable|integer|exists:statuses,id',
        ]);

        $validated['id_kategori'] = 3;

        if ($request->hasFile('dokumen')) {
            if ($dataLimbah->dokumen_path && Storage::disk('public')->exists($dataLimbah->dokumen_path)) {
                Storage::disk('public')->delete($dataLimbah->dokumen_path);
            }

            $path = $request->file('dokumen')->store('dokumen_pantai', 'public');
            $validated['dokumen_path'] = $path;
            $validated['dokumen_nama'] = $request->file('dokumen')->getClientOriginalName();
        } else {
            $validated['dokumen_path'] = $dataLimbah->dokumen_path;
            $validated['dokumen_nama'] = $dataLimbah->dokumen_nama;
        }

        $dataLimbah->update($validated);

        return back()->with('success', 'Data pantai berhasil diperbarui');
    }

    public function destroy($id)
    {
        $model = DataAnggaran::findOrFail($id);
        $model->delete();

        return back()->with('success', 'Data limbah berhasil dihapus');
    }
}
