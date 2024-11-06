// // import { NextResponse } from "next/server";


// // export async function GET(){
// //     try{
// // const response=await NextResponse.json({
// //     message:"Logout Successfull",
// //     success:true,
// // })
// // response.cookies.set("token","",{
// //     httpOnly:true,expires:new Date(0)
// // })
// // return response;
// //     }catch(error){
// //         return NextResponse.json({error:error.message},{status:500})
// //     }
// // }




// // logout.ts
// import { NextResponse } from "next/server";

// export async function GET() {
//     try {
//         const response = NextResponse.json({
//             message: "Logout successful",
//             success: true,
//         });
//         response.cookies.set("token", "", {
//             httpOnly: true,
//             expires: new Date(0),
//         });
//         return response;
//     } catch (error) {
//         console.error("Logout error:", error);
//         return NextResponse.json({ error: "An error occurred during logout." }, { status: 500 });
//     }
// }





// logout.ts
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });
        response.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0),
        });
        return response;
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json({ error: "An error occurred during logout." }, { status: 500 });
    }
}
