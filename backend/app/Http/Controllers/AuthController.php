<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Auth;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        DB::beginTransaction();

        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8'
            ]);
            if ($validator->fails()) {
                return response()->json($validator->errors());
            }
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password)
            ]);
            $token = $user->createToken('auth_token')->plainTextToken;


            DB::commit();
            return response()
                ->json([
                    'data' => $user,
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                ]);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Failed to register'], 500);
        }
    }


    public function login(Request $request)
    {
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()
                ->json(['message' => 'Unauthorized'], 401);
        }
        $user = User::where('email', $request['email'])->firstOrFail();
        $token = $user->createToken('auth_token')->plainTextToken;
        return response()
            ->json([
                'message' => 'Hi ' . $user->name . ', welcome to home',
                'access_token' => $token,
                'token_type' => 'Bearer',
            ]);
    }
    // method for user logout and delete token
    public function logout()
    {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'Logged out'
        ];
    }


    public function update(Request $request)
    {
        DB::beginTransaction();

        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string',
                'email' => 'required|string|email|max:255|unique:users,email,' . auth()->user()->id,
                'password' => 'required|string|min:8'
            ]);

            if ($validator->fails()) {
                return response()->json($validator->errors());
            }

            $user = User::where('id', auth()->user()->id)->lockForUpdate()->firstOrFail();

            //$user = User::findOrFail(auth()->user()->id);

            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();

            DB::commit();
            return response()->json(['message' => 'User information updated successfully']);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Failed to update user information'], 500);
        }
    }


    public function delete(Request $request)
    {
        DB::beginTransaction();

        try {
            $user = User::findOrFail(auth()->user()->id);
            $user->delete();

            DB::commit();
            return response()->json(['message' => 'User deleted successfully']);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Failed to delete user'], 500);
        }
    }
}
