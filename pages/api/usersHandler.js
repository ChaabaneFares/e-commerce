import admin from '../../db/firebaseAdmin';
export default async function usersHandler(req, res) {
    if (req.method === 'GET') {
      try {
        const firestore = admin.firestore();
        const usersRef = firestore.collection('Users');
        const snapshot = await usersRef.get();
  // console.log("snapshot",snapshot)
        const users = [];
        snapshot.forEach((doc) => {
          users.push(doc.data());
        });
  
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
      } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }
  