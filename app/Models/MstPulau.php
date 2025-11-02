<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MstPulau extends Model
{
    use HasFactory;

    protected $table = 'mst_pulau';

    protected $fillable = [
        'nama',
        'longitude',
        'latitude',
    ];

    public function dataAnggaran()
    {
        return $this->hasMany(DataAnggaran::class, 'id_pulau');
    }
}
