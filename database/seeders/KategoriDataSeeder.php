<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KategoriDataSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('kategori_data')->insert([
            [ 'nama' => 'Pantai' ],
            [ 'nama' => 'Air Bersih' ],
            [ 'nama' => 'Limbah' ],
        ]);
    }
}