<?php

namespace Database\Seeders;

use App\Models\MstPulau;
use Illuminate\Database\Seeder;

class PulauSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                'nama' => 'Pulau Harapan',
                'kelurahan' => 'Pulau Harapan',
                'kecamatan' => 'Kepulauan Seribu Utara',
            ],
            [
                'nama' => 'Pulau Kelapa',
                'kelurahan' => 'Pulau Kelapa',
                'kecamatan' => 'Kepulauan Seribu Utara',
            ],
        ];

        foreach ($data as $item) {
            MstPulau::create($item);
        }
    }
}
