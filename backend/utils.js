import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
    return jwt.sign({id: user._id.toString},process.env.SECRET_KEY,{
        expiresIn: 10,
    })
}