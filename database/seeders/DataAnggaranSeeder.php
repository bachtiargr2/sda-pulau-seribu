<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DataAnggaranSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        DB::table('data_anggaran')->insert([
            [
                'id_pulau' => 1,
                'id_jenis_data' => 1,
                'id_kategori' => 1,
                'tahun' => 2025,
                'nama_dokumen' => 'Studi Awal Pembangunan Dermaga',
                'tanggal_upload' => $now,
                'status' => 1,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ]);
    }
}