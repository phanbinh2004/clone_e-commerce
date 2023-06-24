const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user",
    },
    cart: {
        type:Array,
        default:[],
    },
    address: [{type:mongoose.Types.ObjectId,ref:"Address"}],
    wishlist: [{type:mongoose.Types.ObjectId,ref: "Product"}],
    isBlocked:{
        type: Boolean,
        default: false
    },
    refreshToken:{
        type:String,
    },
    passwordChangeAt:{
        type:String,
    },
    passwordResetToken:{
        type:String,
    },
    passwordResetExprires:{
        type:String,
    }

},{
    timestamps:true,
});
userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        const salt = bcrypt.genSaltSync(10);
        this.password = await bcrypt.hash(this.password,salt);
    }else{
        next();
    }
})

userSchema.methods = {
    isCorrectPassword: async function(password){
        return await bcrypt.compare(password, this.password);
    },
    createPasswordChangeToken: function(){
        const resetToken = crypto.randomBytes(32).toString("hex");
        this.passwordResetToken = crypto
          .createHash("sha256")
          .update(resetToken)
          .digest("hex");
        this.passwordResetExprires = Date.now() + 10 * 60 *1000;
        return resetToken;
    },
}
//Export the model
module.exports = mongoose.model('User', userSchema);