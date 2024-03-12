import { Request, Response, NextFunction } from 'express';
import { TOKEN_KEY } from "../config/env";
import jwt from 'jsonwebtoken';
import { Req, Decode } from "../utiles/interface/EmployeInface";

function authEmployee(req: Request, res: Response, next: NextFunction) {
    const bearerHeader = req?.headers?.['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader?.split(' ');
        const token = bearer?.[1];
        if (token) {
            jwt.verify(token, TOKEN_KEY as any, function (err: any, decoded: any) {
                if (err) {
                    return res.status(500).send({ auth: false, message: err });
                }
                const reqObj: Req = {} as Req;
                const decodedObj: Decode = {} as Decode;

                reqObj.email = decoded.email;
                console.log('here')

                console.log(decoded.role)
                console.log("here")

                // Check if the role is 'admin'
                if (decoded.role == 'Admin') {
                    // If the role is 'admin', proceed with the next middleware
                    next();
                } else {
                    // If the role is not 'admin', deny access
                    return res.status(403).json({ message: 'Access denied. Admin role required.' });
                }
            });
        } else {
            // Access Denied 
            return res.status(401).json({ message: 'Invalid token' });
        }
    } else {
        // Access Denied 
        return res.status(401).json({ message: 'Invalid token' });
    }
}


export default authEmployee;