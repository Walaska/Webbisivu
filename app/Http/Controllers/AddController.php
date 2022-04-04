<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Problem;


class AddController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function add(Request $request) {
        $nimi = $request->get('ongelma');
        $ratkaisu = $request->get('ratkaisu');
        $kpi = $request->get('kpi');
        $kategoriaId = $request->get('kategoriaid');
        $tags = $request->get('tagid');

        if ($ratkaisu != "" && $kpi != "") {
            // Insert ratkaisu
            $data = array('nimi'=>$ratkaisu, 'kpi'=>$kpi);
            $ratkaisuId = DB::table('solutions')->insertGetId($data);

            //Insert ongelma
            $data = array('nimi'=>$nimi, 'ratkaisuId'=>$ratkaisuId);
            $ongelmaId = DB::table('problems')->insertGetId($data);

            $data = array('problemId'=>$ongelmaId, 'solutionId'=>$ratkaisuId, 'kpiId'=>$kpiId, 'categoryId'=>$kategoriaId);
            DB::table('problem_solution_conns')->insert($data);

            //Yhdistä tagit       
            for ($x = 0; $x < count($tags);$x++) {
                $data = array('tagid'=>(int)$tags[$x], 'ongelmaid'=>$ongelmaId);
                DB::table('tag_conns')->insert($data);          
            } 
        }

    }

    public function addTag(Request $request) {
        $tag = $request->get('tag');
        $data = array('nimi'=>$tag);
        DB::table('tags')->insert($data);
    }

    public function addCategory(Request $request) {
        $kategoria = $request->get('kategoria');
        $data = array('nimi'=>$kategoria);
        DB::table('categories')->insert($data);
    }
    public function addKpi(Request $request) {
        $kpi = $request->get('kpi');
        $data = array('name'=>$kpi);
        DB::table('kpis')->insert($data);
    }
}
