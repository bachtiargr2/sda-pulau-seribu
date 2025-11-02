<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DataAnggaran extends Model
{
    use HasFactory;

    protected $table = 'data_anggaran';

    protected $fillable = [
        'id_pulau',
        'id_jenis_data',
        'id_kategori',
        'tahun',
        'dokumen_path',
        'dokumen_nama',
        'tanggal_upload',
        'status',
    ];

    public function pulau()
    {
        return $this->belongsTo(MstPulau::class, 'id_pulau');
    }

    public function jenisData()
    {
        return $this->belongsTo(JenisData::class, 'id_jenis_data');
    }

    public function kategori()
    {
        return $this->belongsTo(KategoriData::class, 'id_kategori');
    }

    public function statusData()
    {
        return $this->belongsTo(Status::class, 'status');
    }
}