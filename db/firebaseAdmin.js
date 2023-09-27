import admin from 'firebase-admin';


if (!admin.apps.length) {
  const serviceAccount = require('/db/serviceAccount');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    
  });
}

export default admin
