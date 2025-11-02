<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MstPulauSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('mst_pulau')->insert([
            [
                'nama' => 'Pulau Harapan',
                'longitude' => '106.5915',
                'latitude' => '-5.5992',
            ],
            [
                'nama' => 'Pulau Tidung',
                'longitude' => '106.5087',
                'latitude' => '-5.7998',
            ],
        ]);
    }
}