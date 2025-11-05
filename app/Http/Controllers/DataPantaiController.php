<?php

namespace App\Http\Controllers;

use App\Models\DataAnggaran;
use App\Models\MstPulau;
use App\Models\JenisData;
use App\Models\Status;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class DataPantaiController extends Controller
{
    public function index()
    {
        // Hanya ambil data dengan kategori pantai
        $dataPantai = DataAnggaran::with(['pulau', 'jenisData', 'kategori', 'statusData'])
            ->where('id_kategori', 1)
            ->orderBy('tahun', 'desc')
            ->get()
            ->map(function ($item) {
                $item->dokumen_url = $item->dokumen_path
                    ? asset('storage/' . $item->dokumen_path)
                    : null;
                return $item;
            });

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
            'dokumen' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx',
            'status' => 'nullable|integer|exists:statuses,id',
        ]);

        Log::info($dataPantai);
        $validated['id_kategori'] = 1;

        if ($request->hasFile('dokumen')) {
            if ($dataPantai->dokumen_path && Storage::disk('public')->exists($dataPantai->dokumen_path)) {
                Storage::disk('public')->delete($dataPantai->dokumen_path);
            }

            $path = $request->file('dokumen')->store('dokumen_pantai', 'public');
            $validated['dokumen_path'] = $path;
            $validated['dokumen_nama'] = $request->file('dokumen')->getClientOriginalName();
        } else {
            $validated['dokumen_path'] = $dataPantai->dokumen_path;
            $validated['dokumen_nama'] = $dataPantai->dokumen_nama;
        }

        $dataPantai->update($validated);

        return back()->with('success', 'Data pantai berhasil diperbarui');
    }

    public function destroy(Request $request, $pantai = null)
    {
        // $model = DataAnggaran::findOrFail($id);
        // $model->delete();

        // return back()->with('success', 'Data pantai berhasil dihapus');
        if ($pantai) {
            $model = DataAnggaran::findOrFail($pantai);
            $model->delete();

            return redirect()->back()->with('success', 'Pantai berhasil dihapus');
        }

        $ids = $request->input('ids', []);
        if (!empty($ids)) {
            DataAnggaran::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Beberapa data Pantai berhasil dihapus');
        }

        return redirect()->back()->with('error', 'Tidak ada ID yang dipilih');
    }
}
