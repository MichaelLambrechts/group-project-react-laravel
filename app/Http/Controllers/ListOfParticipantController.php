<?php

namespace App\Http\Controllers;

use App\listOfParticipant;
use App\Event;
use App\User;
use Illuminate\Http\Request;

class ListOfParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $participants = listOfParticipant::all();
        return response()->json($participants);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Event $id)
    {
        $params['participant'] = auth('api')->user()->id;
        $params['event'] = $id;
        $inscription = listOfParticipant::create($params);
        return response()->json([
            'message' => 'Inscription successful',
            'event' => $inscription
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\listOfParticipant  $listOfParticipant
     * @return \Illuminate\Http\Response
     */
    public function show(listOfParticipant $listOfParticipant)
    {
        return $listOfParticipant;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\listOfParticipant  $listOfParticipant
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, listOfParticipant $listOfParticipant)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\listOfParticipant  $listOfParticipant
     * @return \Illuminate\Http\Response
     */
    public function destroy(listOfParticipant $listOfParticipant)
    {
        $event->delete();
        return response()->json([
            "message" => "Record deleted"
        ]);
    }
}
