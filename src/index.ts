import express, {Request, Response, Application, NextFunction } from "express";
import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { StatusCodes } from "http-status-codes";
import trackingGoogleAnalytics from "./middleware/firebaseAnalytics/firebaseAnalytics";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import notFoundMiddleware from "./middleware/404Handler/404Handler";
import errorHandlerMiddleware from "./middleware/errorHandler/errorHandler";
import trackIncomingRequest from "./middleware/timerMiddleware/timerMiddleware";
import csurf from "csurf";
import { Server } from 'socket.io';
import { SetSocketIO } from "./controllers/chat/chatController";
import http from 'http';
import { setupSwagger } from "./utils/swagger/swagger";
import 'dotenv/config';
import helmet from 'helmet';
import cors from 'cors';
import limiter from "./middleware/limiter/limiter";
import { rateLimiterMiddleware } from "./middleware/limiter/rateLimiter";
import authRoute from "./routes/auth/auth.route";
import aboutMeRoute from './routes/aboutMe/aboutMe.route';
import contactMeRoute from './routes/contactMe/contactMe.route';
import userRoute from './routes/user/user.route';
import productRoute from './routes/product/product.route';
import wishListRoute from './routes/wishList/wishList.route';
import shoppingCartRoute from './routes/cart/cart.route';
import promoCodeRoute from './routes/promoCode/promoCode.route';
import orderRoute from './routes/order/order.route';
import salesRoute from './routes/sales/sales.route';
import customerRoute from './routes/customer/customer.route';
import stockRoute from './routes/stock/stock.route';
import notificationManagerRoute from './routes/notificationManager/notificationManager.route'  
import chatRoute from './routes/chat/chat.route';
import stripeRoute from './routes/payments/stripe/stripe.route';
import paypalRoute from './routes/payments/paypal/paypal.route';
import suggestionRoute from './routes/suggestion/suggestion.route';
import blogRoute from './routes/blog/blog.route';
import feedbackRoute from './routes/feedback/feedback.route';
import shippingMethodRoute from './routes/shipping/shipping.route';
import faqRoute from './routes/faqs/faqs.route';
import testimonialRoute from './routes/testimonial/testimonial.route';
import serviceRoute from './routes/services/services.route';
import trainingRoute from './routes/training/training.route';
import databaseConfiguration from "./config/databaseConfig/databaseConfig";
import termsAndConditionsRoute from './routes/termsAndConditions/termsAndConditions.route'
const app: Application = express();
const port: number | string = process.env.APP_PORT as  string | number || 8000;
const csrfProtection = csurf({cookie: true});
const server = http.createServer(app);
const io = new Server(server);
SetSocketIO(io)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
if (process.env.NODE_ENV as string === 'development') {
  app.use(morgan('dev'));
  console.log('Morgan enabled...');
}
setupSwagger(app);
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL as string,
  credentials: true,
}));
app.use(limiter);
app.use(rateLimiterMiddleware);
const aj = arcjet({
  key: process.env.ARCJET_KEY as string,
  characteristics: ["ip.src"], // Track requests by IP
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection, clickjacking, rate limiting among others
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        "CATEGORY:MONITOR", // Uptime monitoring services
        "CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});
app.use(`/api/${process.env.API_VERSION}/auth`, authRoute);
app.use(`/api/${process.env.API_VERSION}/about-me`, aboutMeRoute);
app.use(`/api/${process.env.API_VERSION}/contact-me`, contactMeRoute);
app.use(`/api/${process.env.API_VERSION}/user`, userRoute);
app.use(`/api/${process.env.API_VERSION}/product`, productRoute);
app.use(`/api/${process.env.API_VERSION}/notify`, notificationManagerRoute);
app.use(`/api/${process.env.API_VERSION}/stock`, stockRoute);
app.use(`/api/${process.env.API_VERSION}/wishlist`, wishListRoute);
app.use(`/api/${process.env.API_VERSION}/shopping-cart`, shoppingCartRoute);
app.use(`/api/${process.env.API_VERSION}/promo-code`, promoCodeRoute);
app.use(`/api/${process.env.API_VERSION}/order`, orderRoute);
app.use(`/api/${process.env.API_VERSION}/sales`, salesRoute);
app.use(`/api/${process.env.API_VERSION}/customer`, customerRoute);
app.use(`/api/${process.env.API_VERSION}/chat`, chatRoute);
app.use(`/api/${process.env.API_VERSION}/stripe-payment`, stripeRoute);
app.use(`/api/${process.env.API_VERSION}/paypal-payment`, paypalRoute);
app.use(`/api/${process.env.API_VERSION}/shipping`, shippingMethodRoute);
app.use(`/api/${process.env.API_VERSION}/suggest`, suggestionRoute);
app.use(`/api/${process.env.API_VERSION}/my-blog`, blogRoute);
app.use(`/api/${process.env.API_VERSION}/feedback`,feedbackRoute);
app.use(`/api/${process.env.API_VERSION}/faq`,faqRoute);
app.use(`/api/${process.env.API_VERSION}/testimonial`, testimonialRoute);
app.use(`/api/${process.env.API_VERSION}/service`, serviceRoute);
app.use(`/api/${process.env.API_VERSION}/training`, trainingRoute);
app.use(`/api/${process.env.API_VERSION}/terms-and-conditions`, termsAndConditionsRoute);


function isSpoofed(result:any) {
  return (
    result.state !== "DRY_RUN" &&
    result.reason.isBot() &&
    result.reason.isSpoofed()
  );
};
app.get("/", async (req:Request, res:Response) => {
  const decision = await aj.protect(req, { requested: 5 }); // Deduct 5 tokens from the bucket
   if(process.env.ARCJET_ENV as string) {
      console.log("Arcjet decision", decision);
   }
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Too Many Requests from this particular IP address" }));
    } else if (decision.reason.isBot()) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No bots allowed" }));
    } else {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Forbidden" }));
    }
  } else if (decision.results.some(isSpoofed)) {
    // Arcjet Pro plan verifies the authenticity of common bots using IP data.
    // Verification isn't always possible, so we recommend checking the decision
    // separately.
    // https://docs.arcjet.com/bot-protection/reference#bot-verification
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Forbidden" }));
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Hello World" }));
  }
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.use(trackIncomingRequest);
app.use(trackingGoogleAnalytics);
app.use(csrfProtection); 
app.use((req: Request, res: Response, next: NextFunction) => {
  res.cookie(process.env.XSRF_TOKEN as string, req.csrfToken());
  next();
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code === process.env.CSRF_TOKEN as string) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Invalid CSRF token." });
    }
    next(err);
});
io.on('connection', (socket) => {
console.log('A user connected', socket.id);
socket.on('disconnect', () => {
  console.log('User disconnected', socket.id);
});
}); 
async function serve() {
  try {
    await databaseConfiguration();
    app.listen(port, () => {
      console.log(`
        Server is owned by 
        ${process.env.APP_NAME as string} 
        running on ${process.env.APP_HOST as string | number}
        ${process.env.APP_PORT as string | number} on 
        api/${process.env.API_VERSION as string | number}`);
    });
  } catch (error) {
    console.log("Error occur running the server", error );
  }
}
serve();
export { io } 
export { app };
