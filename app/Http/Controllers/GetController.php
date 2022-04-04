<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;

class GetController extends Controller
{
    public function getCategory($kategoria) {
        $kategoriaId = DB::table('categories')
        ->select('id')
        ->where('nimi','=', $kategoria)
        ->first();
        return response()->json([
            'kategoriaId'=>$kategoriaId
        ], Response::HTTP_OK);
    }
    public function getTag($tag) {
        $tagId = DB::table('tags')
        ->select('id')
        ->where('nimi', '=', $tag)
        ->first();
        return response()->json([
            'tagId'=>$tagId
        ], Response::HTTP_OK);
    }
    public function getAllTags() {
        $tags = DB::table('tags')
        ->select('nimi')
        ->get();
        return response()->json([
            'tags'=>$tags
        ], Response::HTTP_OK);
    }
    public function getAllCategories() {
        $categories = DB::table('categories')
        ->select('nimi')
        ->get();
        return response()->json([
            'categories'=>$categories
        ], Response::HTTP_OK);
    }
    //DB::raw('group_concat(tag_conns.nimi) as tags'),
    public function getGridData() {
        $data = DB::table('problem_solution_conns')
        ->join('problems', 'problem_solution_conns.problemId', '=', 'problems.id')
       // ->join('tag_conns', 'problem_solution_conns.problemId', '=', 'ongelma.id')
        ->join('solutions', 'problem_solution_conns.solutionId', '=', 'solutions.id')
        ->join('kpis', 'problem_solution_conns.kpiId', '=', 'kpis.id')
        ->join('categories', 'problem_solution_conns.categoryId', '=', 'categories.id')
        ->select('problems.nimi AS problems', 'solutions.nimi AS solutions', 'kpis.name AS kpis', 'categories.nimi AS categories')
        ->get();
        return response()->json([
            'griddata'=>$data
        ], Response::HTTP_OK);
    } 
}