const Users = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification } = require('firebase/auth');

const generateToken = (id, role) => {
    const token = jwt.sign({ id, role }, process.env.SECRET_KEY, { expiresIn: '1d' });
    return token;
}

const register = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    try {
        if (!firstName || !lastName || !email || !password || !role)
            throw Error("All fields must be filled!");

        const existEmail = await Users.findOne({ email });
        if (existEmail) throw Error("Email already in use");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role
        });
        const auth = getAuth();
        const firebaseUser = await createUserWithEmailAndPassword(auth, email, password);
        user.firebaseUid = firebaseUser.user.uid;
        await user.save();
        await sendEmailVerification(auth.currentUser);
        const token = generateToken(user._id, role);
        res.status(200).json({ message: "User added successfully",user,token,id:user._id });
    } catch (error) {
        res.status(500).json({ message: "Failed to add ann user", error: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) throw Error("All fields must be filled");
        const exist = await Users.findOne({ email });
        if (!exist){
            return res.status(400).json({
                success: false,
                message: `Not registered yet!`,
            });
        }
        const comparing = await bcrypt.compare(password, exist.password);
        if(!comparing){
            return res.status(400).json({
                success: false,
                message: `Wrong password!`,
            });
        }
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (!userCredential.user.emailVerified) {
            return res.status(400).json({
                success: false,
                message: `Email not verified. We sent you a verification link via email. Please follow it.`,
            });
        }
        const token = generateToken(exist._id, exist.role);
        res.status(200).json({ message: "login successfully", token, id:exist._id });
    } catch (error) {
        res.status(500).json({ message: `Failed to login by ${email}`, error: error.message })
    }
}

const findOne = async (req, res) => {
    const {Id} = req.params;
    try {
        if (!Id) throw Error("No id detected to continue");
        const user = await Users.findById({ _id:Id });
        if (!user) throw Error("An error occured");
        res.status(200).json({ message: "User retrieved successfully", user });
    } catch (error) {
        res.status(500).json({ message: "failed to get the user", error: error.message });
    }
}

const getAll = async (req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json({ message: "Users retrieved successfully", users });
    } catch (error) {
        res.status(500).json({ message: 'An error occured during selecting all users', error: error.message })
    }
}

const deleteUser = async (req, res) => {
    const { Id } = req.params;
    try {
        if(!Id)throw Error("No id passed as parameter");
        const resultat = await Users.findByIdAndDelete({ _id:Id });
        if (!resultat) throw Error("An error occured");
        const users =await Users.find({});
        res.status(200).json({ message: "One of users deleted successfully", users});
    } catch (error) {
        res.status(500).json({ message: "An error occured during deleting a user", error: error.message })
    }
}

const updateUser = async (req, res) => {
    const { firstName, lastName, email, role } = req.body;
    const { Id } = req.params
    try {
        if (!Id) throw Error("No id sent as parameter");
        const resultat = await Users.findByIdAndUpdate({ _id:Id }, { firstName, lastName, email, role });
        if(!resultat)throw Error("Error while updating");
        const user=await getUserById(Id);
        res.status(200).json({ message: "Updating a user successfully" ,user});
    } catch (error) {
        res.status(500).json({ message: "Failed to update a user", error: error.message })
    }
}

const updateProfile = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const { Id } = req.params
    try {
        if (!Id) throw Error("No id sent as parameter");
        const userToUpdate = await Users.findById({_id : Id});
        if(userToUpdate.email !== email){
            const existEmail = await Users.findOne({email});
            if(existEmail){
                return res.status(400).json({message : "email already exist"})
            }
        }
        const salt = await bcrypt.genSalt(10);
        var hashedPassword;
        var resultat;
        if(password){
           hashedPassword = await bcrypt.hash(password, salt);
           resultat = await Users.findByIdAndUpdate({ _id:Id }, { firstName, lastName, email, password:hashedPassword  });
        }
        else{
           resultat = await Users.findByIdAndUpdate({ _id:Id }, { firstName, lastName, email  });
        }
        if(!resultat)throw Error("Error while updating");
        const user=await getUserById(Id);
        res.status(200).json({ message: "Updating a user successfully" ,user});
    } catch (error) {
        res.status(500).json({ message: "Failed to update a user", error: error.message })
    }
}

// const updatePassword = async (req, res) => {
//     const { password } = req.body;
//     const { Id } = req.params;
//     try {
//         if(!Id)throw Error("no id passed as parameter")
//         if (!password) throw Error("Password field can not be empty")
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         const changePassword = await Users.findByIdAndUpdate({ _id:Id }, { password: hashedPassword });
//         const user=await getUserById(Id);
//         res.status(200).json({ message: "Your password updated successfully" ,user})
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to update the password' });
//     }
// }
const findByRole=async(req,res)=>{
    const {role}= req.body;
    try {
        if(!role)throw Error("no role specified");
        const users=await Users.find({role});
        if(!users || users.length==0)throw Error(`Error while getting users by role ${role}`)
        res.status(200).json({message:`users with role ${role} retrieved successfully `,users})
    } catch (error) {
        res.status(404).json({message:'no users with this role',error:error.message})
    }
}

const getUserById = async(Id)=>{
    try {
      const user= await Users.findById({_id:Id});
      return user;
    } catch (error) {
      return error;
    }
  }

//   const updateEmailAndPass = async (req, res) => {
//     const { email,password } = req.body;
//     const { Id } = req.params;
//     try {
//         if (!password || !email) throw Error("Password and email fields can not be empty")
//         const duplicate = await Users.findOne({email});
//         if(duplicate)throw Error("duplicate email");
//         const hashedPassword = await bcrypt.hash(password, 10);
//         const newOne = await Users.findByIdAndUpdate({ _id:Id }, {email:email, password: hashedPassword });
//         const user=await getUserById(Id);
//         res.status(200).json({ message: "Your email and password updated successfully" ,user})
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to update the profile',error:error.message });
//     }
// }  
module.exports = {updateProfile, findByRole, register, login, findOne, getAll, deleteUser, updateUser };