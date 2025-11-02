<?php

namespace App\Http\Controllers;

use App\Models\DataAnggaran;
use App\Models\JenisData;
use App\Models\MstPulau;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request) {
        $pulauId = $request->query('pulau_id');

        $query = DataAnggaran::with(['pulau', 'jenisData', 'kategori', 'statusData']);

        if ($pulauId) {
            $query->where('id_pulau', $pulauId);
        }

        $jenisData = JenisData::select('id', 'nama')->get();

        $documentData = $jenisData->map(function ($jenis) use ($query) {
            return [
                'name' => $jenis->nama,
                'value' => (clone $query)->where('id_jenis_data', $jenis->id)->count(),
            ];
        });

        $dataPantai = (clone $query)->where('id_kategori', 1)->count();
        $dataAir    = (clone $query)->where('id_kategori', 2)->count();
        $dataLimbah = (clone $query)->where('id_kategori', 3)->count();

        return Inertia::render('dashboard', [
            'pulau' => MstPulau::all(['id', 'nama']),
            'data_pantai' => $dataPantai,
            'data_air_bersih' => $dataAir,
            'data_limbah' => $dataLimbah,
            'dokumen_data' => $documentData,
        ]);
    }
}
