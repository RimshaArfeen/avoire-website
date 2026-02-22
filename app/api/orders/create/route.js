

// /app/api/orders/create/route.js
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectToDB } from "@/app/lib/db";

export async function POST(req) {
     try {
          const session = await getServerSession(authOptions);
          if (!session?.user) {
               return new Response(JSON.stringify({ success: false, error: "Not authenticated" }), { status: 401 });
          }

          const data = await req.json();
          const { items, shippingAddress, total } = data;

          if (!items || items.length === 0 || !shippingAddress || !total) {
               return new Response(JSON.stringify({ success: false, error: "Missing required fields" }), { status: 400 });
          }

          const db = await connectToDB();

          const order = {
               userId: session.user.id,
               items: items.map(i => ({
                    productId: i.productId,
                    name: i.name,
                    price: i.price,
                    qty: i.qty || 1
               })),
               total,
               shippingAddress,
               paymentStatus: "pending",
               orderStatus: "pending",
               createdAt: new Date()
          };

          const result = await db.collection("orders").insertOne(order);

          return new Response(JSON.stringify({ success: true, id: result.insertedId }), { status: 200 });
     } catch (err) {
          console.error("Order creation error:", err);
          return new Response(JSON.stringify({ success: false, error: err.message }), { status: 500 });
     }
}