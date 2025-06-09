import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();


export default function protect(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, "process.env.JWT_SECRET");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

// Middleware to verify token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  console.log("Received token:", token); // Debugging line

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  // Verify the token using the secret key from the environment variable
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.log("Token verification error:", err); // Log the error for debugging
      return res.status(401).json({ message: "Expired token , Please Login first" });
    }

    req.user = decoded; // Attach user info to the request object
    console.log("Decoded user info:", req.user); // Log the decoded user information for debugging
    next();
  });
};



// Middleware for Admin-only access
// export function verifyAdmin(req, res, next) {
//   if (req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Admin access required' });
//   }
//   next();
// }

// Middleware for Patient-only access
// export function verifyPatient(req, res, next) {
//   verifyToken(req, res, () => {
//     if (req.user?.role !== "patient") {
//       return res.status(403).json({ message: "Access denied: Not a patient" });
//     }
//     next();
//   });
// }
