// Mengimpor NextRequest dan NextResponse dari next/server untuk handle request dan response
import { NextRequest, NextResponse } from "next/server";
// Mengimpor stripe dari lib/stripe untuk integrasi dengan Stripe API
import { stripe } from "@/lib/stripe";

// Headers CORS yang digunakan untuk mengizinkan akses dari berbagai sumber
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// Handler untuk metode OPTIONS, mengembalikan response JSON kosong dengan headers CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Handler untuk metode POST, melakukan proses checkout menggunakan Stripe
export async function POST(req: NextRequest) {
  try {
    // Mendapatkan cartItems dan customer dari body request
    const { cartItems, customer } = await req.json();

    // Memeriksa apakah data cartItems atau customer kosong
    if (!cartItems || !customer) {
      return new NextResponse("Not enough data to checkout", { status: 400 });
    }

    // Membuat session checkout menggunakan Stripe API
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        { shipping_rate: "shr_1MfufhDgraNiyvtnDGef2uwK" },
        { shipping_rate: "shr_1OpHFHDgraNiyvtnOY4vDjuY" },
      ],
      line_items: cartItems.map((cartItem: any) => ({
        price_data: {
          currency: "cad",
          product_data: {
            name: cartItem.item.title,
            metadata: {
              productId: cartItem.item._id,
              ...(cartItem.size && { size: cartItem.size }),
              ...(cartItem.color && { color: cartItem.color }),
            },
          },
          unit_amount: cartItem.item.price * 100,
        },
        quantity: cartItem.quantity,
      })),
      client_reference_id: customer.clerkId,
      success_url: `${process.env.ECOMMERCE_STORE_URL}/payment_success`,
      cancel_url: `${process.env.ECOMMERCE_STORE_URL}/cart`,
    });

    // Mengembalikan response session JSON dengan headers CORS
    return NextResponse.json(session, { headers: corsHeaders });
  } catch (err) {
    // Menangkap dan menangani error jika terjadi kesalahan dalam proses checkout
    console.log("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
