<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('data_anggaran', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_pulau')->constrained('mst_pulau')->onDelete('cascade');
            $table->foreignId('id_jenis_data')->constrained('jenis_data')->onDelete('cascade');
            $table->foreignId('id_kategori')->constrained('kategori_data')->onDelete('cascade');
            $table->year('tahun');
            $table->string('dokumen_nama');
            $table->text('dokumen_path');
            $table->date('tanggal_upload')->nullable();
            $table->foreignId('status')->constrained('statuses')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('data_anggaran');
    }
};
