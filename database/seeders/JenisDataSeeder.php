<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenisDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('jenis_data')->insert([
            [
                'nama' => 'Kajian',
                'deskripsi' => 'Studi awal proyek',
            ],
            [
                'nama' => 'DED',
                'deskripsi' => 'Detail Engineering Design',
            ],
            [
                'nama' => 'Dokumen Ringkas',
                'deskripsi' => 'Versi ringkas dokumen',
            ],
            [
                'nama' => 'RAB',
                'deskripsi' => 'Rencana anggaran biaya',
            ],
        ]);
    }
}