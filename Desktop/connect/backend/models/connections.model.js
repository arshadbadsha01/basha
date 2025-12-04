import mongoose from "mongoose"; 

 

const connectionRequest = new mongoose.Schema({ 

  userId: { 

    type: mongoose.Schema.Types.ObjectId, 

    ref: "User", 

  }, 

  connectionId: { 

    type: mongoose.Schema.Types.ObjectId, 

    ref: "User", 

  }, 

  statusAccepted: { 

    type: Boolean, 

    default: null, 

  }, 

}); 

 

const Connection = mongoose.model("connectionRequest", connectionRequest); 

export default connectionRequest; 

