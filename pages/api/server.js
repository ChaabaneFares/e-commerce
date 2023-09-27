export default function handler(req, res) {
    
    if (req.method === 'GET') {
      res.setHeader('Content-Type', 'application/json');
      console.log(res);
      res.status(200).json({ message: 'Hello from the backend!' });
    } else {
      res.setHeader('Content-Type', 'application/json');
      res.status(405).json({ message: 'Method not allowed' });
    }

  }