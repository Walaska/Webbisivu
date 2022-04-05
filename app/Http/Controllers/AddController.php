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
        $kpiId = $request->get('kpi');
        $kategoriaId = $request->get('kategoriaid');
        $tags = $request->get('tagid');
        $tagnames = $request->get('tagnames');

        if ($ratkaisu != "" && $kpiId != "") {
            // Insert ratkaisu
            $data = array('nimi'=>$ratkaisu);
            $ratkaisuId = DB::table('solutions')->insertGetId($data);

            //Insert ongelma
            $data = array('nimi'=>$nimi);
            $ongelmaId = DB::table('problems')->insertGetId($data);

            $data = array('problemId'=>$ongelmaId, 'solutionId'=>$ratkaisuId, 'kpiId'=>$kpiId, 'categoryId'=>$kategoriaId);
            DB::table('problem_solution_conns')->insert($data);

            //Yhdistä tagit
            for ($x = 0; $x < count($tags);$x++) {
                $data = array('tagid'=>(int)$tags[$x], 'ongelmaid'=>$ongelmaId, 'nimi'=>$tagnames[$x]);
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

    public function updateTable(Request $request) {
        $ongelma = $request->get('ongelmaValue');
        $ratkaisu = $request->get('ratkaisuValue');
        $kpi = $request->get('kpiValue');
        $tag = $request->get('tagValue');
        $kategoria = $request->get('kategoriatValue');
        $table = $request->get('table');
        $vanhaData = $request->get('vanhaData');

        if($table == "ongelma") {
            $data = array('nimi'=>$ongelma);
            DB::table('problems')
            ->where('nimi', '=', $vanhaData)
            ->update($data);
        }
        else if($table == "ratkaisu") {
            $data = array('nimi'=>$ratkaisu);
            DB::table('solutions')
            ->where('nimi', '=', $vanhaData)
            ->update($data);
        }
        else if($table == "kpi") {
            $data = array('name'=>$kpi);
            DB::table('kpis')
            ->where('name', '=', $vanhaData)
            ->update($data);
        }
        else if($table == "kategoriat") {
            $data = array('nimi'=>$kategoria);
            DB::table('categories')
            ->where('nimi', '=', $vanhaData)
            ->update($data);
        }
        else if($table == "tag") {
            //if (count($tag) )
            for($x = 0; $x < count($tag); $x++) {
                $data = array('nimi'=>$tag[$x]);
                DB::table('tags')
                ->where('nimi', '=', $vanhaData[$x])
                ->update($data);
                DB::table('tag_conns')
                ->where('nimi', '=', $vanhaData[$x])
                ->update($data); 
            }
        }
    }
}
