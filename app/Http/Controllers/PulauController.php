<?php

namespace App\Http\Controllers;

use App\Models\MstPulau;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class PulauController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pulau = MstPulau::orderBy('nama')->get();

        return Inertia::render('master-data/pulau/index', [
            'pulau' => $pulau,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'nama' => ['required','string','max:100'],
            'kelurahan' => ['nullable','string','max:100'],
            'kecamatan' => ['nullable','string','max:100'],
        ]);

        MstPulau::create($request->all());

        return redirect()->route('pulau.index')->with('success', 'Data pulau berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, MstPulau $pulau)
    {
        $validated = $request->validate([
            'nama' => ['required','string','max:100'],
            'kelurahan' => ['nullable','string','max:100'],
            'kecamatan' => ['nullable','string','max:100'],
        ]);

        $pulau->update($validated);

        return back()->with('success', 'Task updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $pulau = null)
    {
        if ($pulau) {
            $model = MstPulau::findOrFail($pulau);
            $model->delete();

            return redirect()->back()->with('success', 'Pulau deleted successfully');
        }

        $ids = $request->input('ids', []);
        if (!empty($ids)) {
            MstPulau::whereIn('id', $ids)->delete();
            return redirect()->back()->with('success', 'Selected Pulau deleted successfully');
        }

        return redirect()->back()->with('error', 'No ID provided');
    }
}
