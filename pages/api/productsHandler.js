import admin from '../../db/firebaseAdmin';

export default async function productsHandler(req, res) {
  if (req.method === 'GET') {
    try {
      const firestore = admin.firestore();
      const productsRef = firestore.collection('Products');
      const snapshot = await productsRef.get();

      const products = [];

      
      for (const doc of snapshot.docs) {
        const productData = doc.data();

        
        const subcollectionRef = productsRef.doc(doc.id).collection('Chairs');
        const subcollectionSnapshot = await subcollectionRef.get();
        const subcollectionRef2 = productsRef.doc(doc.id).collection('Sofas');
        const subcollectionSnapshot2 = await subcollectionRef2.get();
        
        const subcollectionData = [];

        subcollectionSnapshot.forEach((subdoc) => {
          subcollectionData.push(subdoc.data());
        });
        
        subcollectionSnapshot2.forEach((subdoc) => {
            subcollectionData.push(subdoc.data());
          });

       
        if (subcollectionData.length > 0) {
          productData.subcollectionData = subcollectionData;
          products.push(productData);
        }
      }

      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
