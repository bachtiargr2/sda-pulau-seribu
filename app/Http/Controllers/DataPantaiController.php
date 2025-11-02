<?php

namespace App\Http\Controllers;

use App\Models\DataAnggaran;
use App\Models\MstPulau;
use App\Models\JenisData;
use App\Models\Status;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DataPantaiController extends Controller
{
    public function index()
    {
        // Hanya ambil data dengan kategori pantai
        $dataPantai = DataAnggaran::with(['pulau', 'jenisData', 'kategori', 'statusData'])
            ->where('id_kategori', 1)
            ->orderBy('tahun', 'desc')
            ->get();

        return Inertia::render('kelola-data/pantai/index', [
            'data_pantai' => $dataPantai,
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

        $validated['id_kategori'] = 1;

        if ($request->hasFile('dokumen')) {
            $path = $request->file('dokumen')->store('dokumen_pantai', 'public');
            $validated['dokumen_path'] = $path;
            $validated['dokumen_nama'] = $request->file('dokumen')->getClientOriginalName();
        }

        DataAnggaran::create($validated);

        return redirect()->route('kelola-data.pantai.index')->with('success', 'Data pantai berhasil ditambahkan');
    }

    public function update(Request $request, DataAnggaran $dataPantai)
    {
        $validated = $request->validate([
            'id_pulau' => 'required|exists:mst_pulau,id',
            'id_jenis_data' => 'required|exists:jenis_data,id',
            'tahun' => 'required|integer',
            'dokumen_path' => 'nullable|string',
            'dokumen_nama' => 'nullable|string|max:255',
            'tanggal_upload' => 'nullable|date',
            'status' => 'nullable|integer',
        ]);

        $dataPantai->update($validated);

        return back()->with('success', 'Data pantai berhasil diperbarui');
    }

    public function destroy($id)
    {
        $model = DataAnggaran::findOrFail($id);
        $model->delete();

        return back()->with('success', 'Data pantai berhasil dihapus');
    }
}
