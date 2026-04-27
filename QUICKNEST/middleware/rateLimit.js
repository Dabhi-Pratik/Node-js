import rateLimit from "express-rate-limit";

export const rateLimiter = rateLimit({
    windowMs:15*60*1000,
    limit:500,
    message:"Too many request from this Ip,Please try again after 15 minutes"
})

export const authLimit = rateLimit({
    windowMs:15*60*1000,
    limit:5,
    message:"Too many request from this Ip,Please try again after 15 minutes"
})
 
export default {authLimit,rateLimiter}