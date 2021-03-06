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
        if($ratkaisu == "") {
            $data = array('nimi'=>$nimi);
            $ongelmaId = DB::table('problems')->insertGetId($data);

            for ($x = 0; $x < count($tags);$x++) {
                $data = array('tagid'=>(int)$tags[$x], 'ongelmaid'=>$ongelmaId, 'nimi'=>$tagnames[$x]);
                DB::table('tag_conns')->insert($data);
            }
        }

    }

    public function delete(Request $request) {
        $tables = $request->get('table');
        $items = $request->get('items');

        for($x = 0; $x < count($items); $x++) {
            if($tables[$x] == 'category') {
                DB::table('categories')
                ->where('nimi', '=', $items[$x])
                ->delete();
            }
            else if($tables[$x] == 'kpi') {
                DB::table('kpis')
                ->where('name', '=', $items[$x])
                ->delete();
            }
            else if($tables[$x] == 'tag') {
                DB::table('tags')
                ->where('nimi', '=', $items[$x])
                ->delete();
                DB::table('tag_conns')
                ->where('nimi', '=', $items[$x])
                ->delete();
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
        $pID = $request->get('ongelmaId');

        if($table == "ongelma") {
            if ($ongelma == "") {
                DB::table("problems")
                ->where('id', '=', $pID)
                ->delete();
                DB::table('tag_conns')
                ->where('ongelmaid', '=', $pID)
                ->delete();
                DB::table('problem_solution_conns')
                ->where('problemId', '=', $pID)
                ->delete();
            }
            else {
                $data = array('nimi'=>$ongelma);
                DB::table('problems')
                ->where('nimi', '=', $vanhaData)
                ->update($data);
            }
        }
        else if($table == "ratkaisu") {
            $data = array('nimi'=>$ratkaisu);
            DB::table('solutions')
            ->where('nimi', '=', $vanhaData)
            ->update($data);
        }
        else if($table == "kpi") {
            $data = array('name'=>$kpi);
            $x = DB::table('kpis')->insertGetId($data);
            $data = array('kpiId'=>$x);
            DB::table('problem_solution_conns')
            ->where('problemId', '=', $pID)
            ->update($data);
        }
        else if($table == "kategoriat") {
            $data = array('nimi'=>$kategoria);
            $x = DB::table('categories')->insertGetId($data);
            $data = array('categoryId'=>$x);
            DB::table('problem_solution_conns')
            ->where('problemId', '=', $pID)
            ->update($data);
        }
        else if($table == "tag") {
            $id = $request->get('id');
            $newArr = array();
            if (count($tag) < count($vanhaData)) {
                for ($x = 0; $x < count($vanhaData); $x++) {
                    if(!in_array($vanhaData[0], $tag)) {
                        $newArr.push($newArr, $vanhaData[0]);
                    }
                }
                if(count($newArr) > 0) {
                    foreach($newArr as $value) {
                        DB::table('tag_conns')
                        ->where('ongelmaid', '=', $id + 1)
                        ->where('nimi', '=', $value)
                        ->delete();
                    }
                }
            }
            /*for($x = 0; $x < count($tag); $x++) {
                $data = array('nimi'=>$tag[$x]);
                DB::table('tags')
                ->where('nimi', '=', $vanhaData[$x])
                ->update($data);
                DB::table('tag_conns')
                ->where('nimi', '=', $vanhaData[$x])
                ->update($data); 
            } */
        }
    }
}
