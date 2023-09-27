import admin from '../../db/firebaseAdmin';

export default async function userOrdersHandler(req, res) {
  if (req.method === 'GET') {
    try {
  
      const userId = 'QbQi8xg4ZGthrMot86ba';

      const firestore = admin.firestore();
      const userRef = firestore.collection('Users').doc(userId);
      const ordersRef = userRef.collection('orders');

      const snapshot = await ordersRef.get();

      const orders = [];

      snapshot.forEach((doc) => {
        orders.push(doc.data());
      });

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(orders);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
