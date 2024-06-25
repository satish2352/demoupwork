<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contact;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json(Contact::all(), 201);
    }

    public function show($id)
    {
        return Contact::findOrFail($id);
    }

    public function store(Request $request)
    {
        $contact = new Contact();        
        $contact->name = $request->name;        
        $contact->email = $request->email;
        $contact->phone = $request->phone;
        $contact->save();


        return response()->json($contact, 201);
    }

    public function update(Request $request)
    {
        info($request);
        $contact = Contact::where('id',$request->id)->update([
            'name'=> $request->name,
            'email'=> $request->email,
            'phone'=> $request->phone,
        ]);
      
        return response()->json($contact, 200);
    }

    public function destroy(Request $request)
    {
        $id=$request->id;
        Contact::findOrFail($id)->delete();
        return response()->json(null, 204);
    }
}
