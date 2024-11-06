// import { connect } from "@/dbConfig/dbConfig";
// import User from "@/models/userModel";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import { sendEmail } from "@/helpers/mailer";

// export async function POST(request: NextRequest) {
//     // const { tenantId } = request.json();
//     // await connect(tenantId); 
//     connect();
//     try {
//         const reqBody = await request.json();
//         const { username, email, password } = reqBody;


 

   
//         // Check if user already exists
//         const user = await User.findOne({ email });

//         if (user) {
//             return NextResponse.json(
//                 { error: "User already exists" },
//                 { status: 400 }
//             );
//         }

//         // Hash password
//         const salt = await bcryptjs.genSalt(10);
//         const hashedPassword = await bcryptjs.hash(password, salt);

//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword,
//         });

//         await newUser.save();
//         // await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

//         return NextResponse.json(
//             { message: "User created successfully" },
//             { status: 201 }
//         );
//     } catch (error: any) {
//         return NextResponse.json({ error: error.message }, { status: 500 });
//     }
// }




import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
    try {
        // Establish the connection to the database
        await connect();

        // Parse the JSON request body
        const reqBody = await request.json();
        const { username, email, password } = reqBody;

        // Basic validation for the required fields
        if (!username || !email || !password) {
            return NextResponse.json(
                { error: "Username, email, and password are required." },
                { status: 400 }
            );
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists." },
                { status: 400 }
            );
        }

        // Hash the password using bcrypt
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // Create a new user document
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        // Save the new user to the database
        await newUser.save();

        // Return a success response
        return NextResponse.json(
            { message: "User created successfully." },
            { status: 201 }
        );
    } catch (error: any) {
        // Log the error for debugging and send the error message as a response
        console.error("Error during user registration:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
