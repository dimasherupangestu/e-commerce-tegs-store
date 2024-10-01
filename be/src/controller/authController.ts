import { google } from 'googleapis';
import { prismaClient } from '../application/database';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import "dotenv/config";
import { NextFunction, Request, Response } from 'express';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})


const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

export class AuthController {
    static async googleAuth(req: Request, res: Response, next: NextFunction) {
        try {
            const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
                'http://localhost:5000/auth/google/callback'
            );

            const scopes = [
                'https://www.googleapis.com/auth/userinfo.email',
                'https://www.googleapis.com/auth/userinfo.profile',
            ];

            const authorizationUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: scopes,
                include_granted_scopes: true
            });

            res.redirect(authorizationUrl);
        } catch (e) {
            next(e);
        }
    }

    static async googleCallback(req: Request, res: Response, next: NextFunction) {
        try {
            const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET, 
                'http://localhost:5000/auth/google/callback'
            );

            const { code } = req.query;

            if (!code || typeof code !== 'string') {
                return res.status(400).json({ error: 'Missing or invalid code parameter' });
            }

            const { tokens } = await oauth2Client.getToken(code);
            oauth2Client.setCredentials(tokens);

            const oauth2 = google.oauth2({
                auth: oauth2Client,
                version: 'v2'
            });

            const { data } = await oauth2.userinfo.get();

            if (!data.email || !data.name) {
                return res.status(400).json({ error: 'Failed to retrieve user information' });
            }

            let user = await prismaClient.user.findUnique({
                where: { email: data.email }
            });
            

            const payload = { email: data.email };
            const authToken = jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

            if (user) {
                user = await prismaClient.user.update({
                    where: { email: data.email },
                    data: { token: authToken }
                });
            } else {
                const randomPassword = crypto.randomBytes(16).toString('hex');
                user = await prismaClient.user.create({
                    data: {
                        email: data.email,
                        full_name: data.name,
                        password: randomPassword,
                        token: authToken
                    }
                });
            }

            return res.redirect(`http://localhost:5173?token=${authToken}`);
        } catch (e) {
            console.error(e);
            next(e);
        }
    }

    static async requestVerification(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.body;
            const verificationCode = generateVerificationCode();
            const existingUser = await prismaClient.user.findUnique({
                where: { email }
            });
           

            if (existingUser) {
                return res.status(400).send('Email is already registered');
            }

            const test = await prismaClient.emailVerification.deleteMany({
                where: {
                    createdAt: {
                        lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
                    },
                    isRegistered: false
                }
            })
         

            const existingVerification = await prismaClient.emailVerification.findUnique({
                where: { email }
            })
           
            if (existingVerification) {
                if (!existingVerification.isRegistered) {
                    await prismaClient.emailVerification.update({
                        where: { email },
                        data: {
                            code: verificationCode,
                            createdAt: new Date(),
                            verified: false,
                        }
                    });
                } else {
                    return res.status(400).send('Email is already registered');
                }
            } else {
                await prismaClient.emailVerification.create({
                    data: {
                        email,
                        code: verificationCode
                    }
                })
            }
            
            const mailOptions = {
                from: "noreply",
                to: email,
                subject: "Verification Code",
                text: `Your verification code is: ${verificationCode}`,  
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).send(error.toString());
                }
                
            
                res.status(200).send('Verification token sent to email');
              });
        } catch (e) {
           
            next(e);
        }
    }

    static async verifyEmail(req: Request, res: Response, next: NextFunction) {
        const { email, code } = req.body;
                  
        const verification = await prismaClient.emailVerification.findUnique({
            where: { email },
        });
         

        if (!verification) {
            return res.status(400).send('Verfication request not found');
        }

        if (verification.code !== code) {
            return res.status(400).send('Invalid verification code');
        }

        const isExpired = verification.createdAt < new Date(Date.now() - 24 * 60 * 60 * 1000);
        if (isExpired) {
            return res.status(400).send('Verification code expired');
        }

        await prismaClient.emailVerification.update({
            where: { email },
            data: { verified: true },
        });

        return res.status(200).send('Email verified sucessfully'); 
    }
}
