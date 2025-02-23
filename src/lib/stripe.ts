import { env } from "process";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY!);

export default stripe;