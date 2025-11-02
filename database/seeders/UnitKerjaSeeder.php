<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UnitKerjaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('unit_kerja')->insert([
            [ 'nama' => 'Pengelolaan sumber daya air' ],
            [ 'nama' => 'Pengendalian banjir dan drainase' ],
            [ 'nama' => 'Pengelolaan air minum' ],
            [ 'nama' => 'Pengelolaan air limbah' ],
            [ 'nama' => 'Pemantauan dan evaluasi' ],
            [ 'nama' => 'Pelaksanaan kesekretariatan' ],
            [ 'nama' => 'Pemeliharaan prasarana dan sarana'],
        ]);
    }
}
