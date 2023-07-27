const express = require('express');
const { Wallets, Gateway } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const helper = require('../../fabric/fabric-samples/asset-app/helper');
const path = require('path');
const app = express();
const ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
const walletPath = path.join(__dirname, 'wallet');
const bodyParser = require('body-parser'); // Import body-parser library
const cors = require('cors');
const mongoose = require('mongoose');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

///////////////////////////
// MongoDB connection function
async function connectMongoDB() {
  const password = '5jF3vJSsRrS4dAfJ'; // Replace with your actual password
  const URI = `mongodb+srv://rahmakhedimi285:${password}@cluster0.km5scbb.mongodb.net/?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(URI, { useNewUrlParser: true });
    console.log('Database connected successfully');
  } catch (error) {
    console.log('Error while connecting to the database', error);
  }
}
//////////////////////////////////



async function main() {

 try {

  await connectMongoDB();

   // Load network configuration
   const ccp = helper.buildCCPOrg1();
   console.log('Loaded network config from:', ccpPath);


   // Build wallet
   const wallet = await helper.buildWallet(Wallets, walletPath);
   console.log('Built wallet from', walletPath);


   // Create a new CA client
   const caInfo = ccp.certificateAuthorities['ca.org1.example.com'];
   const caTLSCACerts = caInfo.tlsCACerts.pem;
   const caClient = new FabricCAServices(
     caInfo.url,
     {
       trustedRoots: caTLSCACerts,
       verify: false,
     },
     caInfo.caName
   );
   console.log('Built a CA client named:', caInfo.caName);


   // Enroll the admin user
   const adminUserId = 'admin';
   const adminUserPasswd = 'adminpw';
   const enrollment = await caClient.enroll({
     enrollmentID: adminUserId,
     enrollmentSecret: adminUserPasswd,
   });
   const x509Identity = {
     credentials: {
       certificate: enrollment.certificate,
       privateKey: enrollment.key.toBytes(),
     },
     mspId: 'Org1MSP',
     type: 'X.509',
   };
   await wallet.put(adminUserId, x509Identity);
   console.log('Enrolled admin user');


   // Start the gateway connection
   const gateway = new Gateway();
   await gateway.connect(ccp, {
     wallet,
     identity: 'admin',
     discovery: { enabled: true, asLocalhost: true },
   });
   console.log('Connected to gateway');


   // Get the network and contract objects from the gateway
   const network = await gateway.getNetwork('channel1');
 
   const contract = network.getContract('basic');
 ////////////////////////////////////////
 // Get the network and contract objects from the gateway
/*const network1 = await gateway.getNetwork('channel1');
 const contract1 = network1.getContract('basic');




 // Invoke the desired transaction and display the result
 const result = await contract1.submitTransaction('GetAllAssets');
 console.log(result.toString()); */
////////////////////////////////////////////////////


// Define a Mongoose schema for the assets
const assetSchema = new mongoose.Schema({
  ID: String,
  username: String,
  name: String,
  password: String,
  email: String,
  role: String,
  createddate: Date,
});

// Create a Mongoose model for the assets collection
const AssetModel = mongoose.model('Asset', assetSchema);


   // API route to fetch all assets from the blockchain
   app.get('/api/assets', async (req, res) => {
     try {
      await AssetModel.deleteMany();

      const network2 = await gateway.getNetwork('channel1');
      const contract2 = network2.getContract('basic');
      const result = await contract2.submitTransaction('GetAllAssets');


      //res.status(200).send(result.toString());
      //console.log(result.toString());

      const assets = JSON.parse(result.toString());

      // Save assets in MongoDB
      for (const asset of assets) {
        await AssetModel.create({
          ID: asset.Record.ID,
          username: asset.Record.username,
          name: asset.Record.name,
          password: asset.Record.password,
          email: asset.Record.email,
          role: asset.Record.role,
          createddate: new Date(asset.Record.createddate),
        });
      }
  
      res.status(200).json(assets);
     } catch (error) {
   
       res.status(500).json({ error: error.message });
       console.log('fail');
     }

   });

// get one asset 
app.get('/api/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // Get the network and contract objects from the gateway
    const network2 = await gateway.getNetwork('channel1');
    const contract2 = network2.getContract('basic');

    // Call the ReadAsset function from your chaincode to read the asset with the given ID
    const assetJSON = await contract2.evaluateTransaction('ReadAsset', id);

    if (!assetJSON || assetJSON.length === 0) {
      return res.status(404).json({ error: `The asset ${id} does not exist` });
    }

    // Return the asset as a response
    res.status(200).json(JSON.parse(assetJSON.toString()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


 // create asset 
   app.post('/api/assets', async (req, res) => {
    try {
      const { ID, username, name, password, email, role } = req.body;
      console.log('Received request body:', req.body);
  
      // Rest of the code remains the same...
      // Get the network and contract objects from the gateway
      const network2 = await gateway.getNetwork('channel1');
      const contract2 = network2.getContract('basic');
  
      // Create the asset using the CreateAsset function from your chaincode
      const result = await contract2.submitTransaction(
        'CreateAsset',
        ID,
        username,
        name,
        password,
        email,
        role
        // Remove the "new Date().toISOString()" argument as it's not needed for now
      );
      console.log('transaction submitted : ');
      console.log('Asset created successfully:', result.toString());
  
      // Return the newly created asset as a response
      res.status(201).json({
        ID,
        username,
        name,
        password,
        email,
        role,
        createddate: new Date().toISOString(),
      });

//update 
app.put('/api/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, name, password, email, role } = req.body;
    console.log('Received request body:', req.body);

    // Rest of the code remains the same...
    // Get the network and contract objects from the gateway
    const network2 = await gateway.getNetwork('channel1');
    const contract2 = network2.getContract('basic');

    // Update the asset using the UpdateAsset function from your chaincode
    const result = await contract2.submitTransaction(
      'UpdateAsset',
      id,
      username,
      name,
      password,
      email,
      role
    );
    console.log('transaction submitted : ');
    console.log('Asset updated successfully:', result.toString());

    // Return the updated asset as a response
    res.status(200).json({
      ID: id,
      username,
      name,
      password,
      email,
      role,
      createddate: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//delete
app.delete('/api/assets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received delete request for asset ID:', id);

    // Rest of the code remains the same...
    // Get the network and contract objects from the gateway
    const network2 = await gateway.getNetwork('channel1');
    const contract2 = network2.getContract('basic');

    // Delete the asset using the DeleteAsset function from your chaincode
    const result = await contract2.submitTransaction('DeleteAsset', id);
    console.log('transaction submitted : ');

    console.log('Asset deleted successfully:', result.toString());

    // Return a success message as a response
    res.status(200).json({ message: `Asset with ID ${id} deleted successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


    } catch (error) {
      console.error('Error creating asset:', error.message);
      res.status(500).json({ error: 'Failed to create asset' });
    }
  });
  
  
  

  




 } catch (error) {
   console.error('Failed to run the application:', error);
 }
}


// Execute the main function
main();


const port = process.env.PORT || 3002;


app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});

