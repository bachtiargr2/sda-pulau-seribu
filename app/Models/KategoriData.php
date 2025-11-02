<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KategoriData extends Model
{
    use HasFactory;

    protected $table = 'kategori_data';

    protected $fillable = [
        'nama',
    ];

    public function dataAnggaran()
    {
        return $this->hasMany(DataAnggaran::class, 'id_kategori');
    }
}