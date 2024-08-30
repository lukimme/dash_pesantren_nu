<?php

namespace Database\Seeders;

use App\Models\Tingkat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TingkatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tingkat = [
            ['name' => 'Umum'],
            ['name' => 'Mahasiswa'],
            ['name' => 'SLTA'],
            ['name' => 'SLTP']
        ];

        Tingkat::insert($tingkat);
    }
}
