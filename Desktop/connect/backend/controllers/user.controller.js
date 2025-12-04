// import Profile from "../models/profile.model.js";
// import User from "../models/user.model.js";

// import bcrypt from 'bcrypt';
// import crypto from "crypto";
// import PDFDocument from "pdfkit";


// // A Function to convert User Data into PDF Page
// const convertUserDataToPDF = (userData) => {
//   const doc = new PDFDocument();
//   const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
//   // const fullPath = uploads/${outputPath};
// }

// export const register = async (req, res) => {
//     try {
//         const { name, email, password, userName } = req.body;

//         if (!name || !email || !password || !userName) {
//             return res.status(400).json({ message: "All fields are required" })
//         }

//         const user = await User.findOne({
//             email
//         });

//         if (user) return res.status(400).json({ message: "User already exists" }) 

//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//           name,
//           email,
//           password: hashedPassword,
//           userName
//         });

//     await newUser.save();

//     const profile = new Profile({ userId: newUser._id });

//         await profile.save()

//     return res.json({ message: "User Created" })

//     } catch (error) {
//         return res.status(500).json({ message: error.message })
//     }
// }

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch)
//       return res.status(400).json({ message: "Invalid credentials" });

//     const token = crypto.randomBytes(32).toString("hex");

//     const updatedUser = await User.findOneAndUpdate(
//       { email },
//       { token },
//       { new: true } // returns the updated document
//     );

//     return res.status(200).json({ token });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };


// export const updateUserProfile = async (req, res) => { 

//   console.log(req.body); 

//   try { 

//     const { token, ...newUserData } = req.body; 



//     const user = await User.findOne({ token: token }); 



//     if (!user) return res.status(404).json({ message: "User not found" }); 



//     const { userName, email } = newUserData; 



//     const existingUser = await User.findOne({ $or: [{ userName }, { email }] }); 



//     if (existingUser) { 

//       if (existingUser || String(existingUser._id) !== String(user._id)) { 

//         return res.status(400).json({ message: "User already exist" }); 

//       } 

//     } 



//     Object.assign(user, newUserData); 



//     await user.save(); 



//     return res.status(201).json({ message: "User updated" }); 

//   } catch (error) { 

//     return res.status(500).json({ message: error.message }); 

//   } 

// }; 



// // To Get user Profile that Have Logged In 

// export const getUserProfile = async (req, res) => { 

//   try { 

// //     const token = req.query.token;  
//         const { token } = req.body; 

//     const user = await User.findOne({ token: token }); 

//     if (!user) return res.status(404).json({ message: "User not Found" }); 



//     const userProfile = await Profile.findOne({ userId: user._id }).populate( 

//       "userId", 

//       "name email userName profilePicture" 

//     ); 



//     return res.status(200).json({ userProfile }); 

//   } catch (error) { 

//     return res.status(500).json({ message: error.message }); 

//   } 

// }; 


// export const uploadProfilePicture = async (req, res) => {
//   try {
//     const { token } = req.body;

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const user = await User.findOne({ token });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.profilePicture = req.file.filename;
//     await user.save();

//     return res.status(201).json({ message: "Profile picture updated successfully" });
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
// };


import Profile from "../models/profile.model.js";

import User from "../models/user.model.js";



import bcrypt from 'bcrypt';

import crypto from "crypto";

import PDFDocument from "pdfkit";



// A Function to convert User Data into PDF Page 

const convertUserDataToPDF = (userData) => {

    const doc = new PDFDocument();

    const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";

    // const fullPath = uploads/${outputPath}; 

}



export const register = async (req, res) => {

    try {

        const { name, email, password, userName } = req.body;



        if (!name || !email || !password || !userName) {

            return res.status(400).json({ message: "All fields are required" })

        }



        const user = await User.findOne({

            email

        });



        if (user) return res.status(400).json({ message: "User already exists" })



        const hashedPassword = await bcrypt.hash(password, 10);



        const newUser = new User({

            name,

            email,

            password: hashedPassword,

            userName

        });



        await newUser.save();



        const profile = new Profile({ userId: newUser._id });



        await profile.save()



        return res.json({ message: "User Created" })



    } catch (error) {

        return res.status(500).json({ message: error.message })

    }

}



export const login = async (req, res) => {

    try {

        const { email, password } = req.body;



        if (!email || !password) {

            return res.status(400).json({ message: "All fields are required" });

        }

        const user = await User.findOne({ email });

        if (!user) return res.status(400).json({ message: "User not found" });



        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch)

            return res.status(400).json({ message: "Invalid credentials" });



        const token = crypto.randomBytes(32).toString("hex");



        const updatedUser = await User.findOneAndUpdate(

            { email },

            { token },

            { new: true } // returns the updated document 

        );



        return res.status(200).json({ token });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }

};



// To Upload the profile picture 

export const uploadProfilePicture = async (req, res) => {

    const { token } = req.body;



    try {

        if (!req.file) return res.status(400).json({ message: "No file uploaded" });



        const user = await User.findOne({ token });

        if (!user) return res.status(404).json({ message: "User not found" });



        user.profilePicture = req.file.filename;

        await user.save();



        return res

            .status(201)

            .json({ message: "Profile picture updated successfully" });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }

};



// To Update the profile picture of user 

export const updateUserProfile = async (req, res) => {

    console.log(req.body);

    try {

        const { token, ...newUserData } = req.body;



        const user = await User.findOne({ token: token });



        if (!user) return res.status(404).json({ message: "User not found" });



        const { userName, email } = newUserData;



        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });



        if (existingUser) {

            if (existingUser || String(existingUser._id) !== String(user._id)) {

                return res.status(400).json({ message: "User already exist" });

            }

        }



        Object.assign(user, newUserData);



        await user.save();



        return res.status(201).json({ message: "User updated" });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }

};



// To Get user Profile that Have Logged In 

export const getUserProfile = async (req, res) => {

    try {

        const { token } = req.body;

        const user = await User.findOne({ token: token });

        if (!user) return res.status(404).json({ message: "User not Found" });



        const userProfile = await Profile.findOne({ userId: user._id }).populate(

            "userId",

            "name email userName profilePicture"

        );



        return res.status(200).json({ userProfile });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }

};



// To Upadte User's Profile Data 

export const updateProfileData = async (req, res) => {

    try {

        const { token, ...newProfileData } = req.body;



        if (!token) {

            return res.status(400).json({ message: "Token is required" });

        }



        const user = await User.findOne({ token: token });

        if (!user) {

            return res.status(404).json({ message: "User not found" });

        }



        const profile = await Profile.findOne({ userId: user._id });

        if (!profile) {

            return res.status(404).json({ message: "Profile not found" });

        }



        // Update profile fields 

        Object.assign(profile, newProfileData);

        await profile.save();



        return res.status(200).json({

            message: "Profile updated successfully",

            profile,

        });

    } catch (error) {

        console.error("Error updating profile:", error);

        return res.status(500).json({ message: error.message });

    }

};



// To get all user exist in db 

export const getAllUserProfile = async (req, res) => {

    try {

        const profiles = await Profile.find().populate(

            "userId",

            "name email userName profilePicture"

        );

        return res.json({ profiles });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }

};



// To download the resume of A user 

export const downloadProfile = async (req, res) => {

    try {

        const userId = req.query.id;



        const userProfile = await Profile.findOne({ userId: userId }).populate(

            "userId",

            "name userName email profilePicture"

        );



        let outputPath = await convertUserDataToPDF(userProfile);



        return res.json({ message: outputPath });

    } catch (error) {

        return res.status(500).json({ message: error.message });

    }

}; 