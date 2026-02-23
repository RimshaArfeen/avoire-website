
// checkout
"use client";

import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  ChevronRight,
  Lock,
  Banknote,
  Truck,
  CheckCircle2,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import CartCard from "../Components/CartCard";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// ─── Bank Details (Update these with your real info) ───
const BANK_DETAILS = {
  accountTitle: "Your Account Title",
  accountNumber: "1234-5678-9012-3456",
  bankName: "Your Bank Name",
  iban: "PK00XXXXXXXXXXXXXXXXXXX",
};

// ─── Step Indicator (outside component to prevent re-render) ───
const StepIndicator = ({ number, title, active }) => (
  <div
    className={`flex items-center space-x-3 transition-all duration-300 ${
      active ? "opacity-100" : "opacity-40"
    }`}
  >
    <span
      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[11px] font-bold transition-all duration-300 ${
        active
          ? "bg-text-primary text-text-inverse border-text-primary"
          : "border-border-default"
      }`}
    >
      {number}
    </span>
    <span className="text-caption font-bold tracking-widest uppercase">
      {title}
    </span>
  </div>
);

// ─── Input Field (outside component to prevent focus loss on re-render) ───
const InputField = ({ type = "text", placeholder, value, onChange, className = "" }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={`w-full bg-bg-card border border-border-default rounded-xl px-5 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-200 ${className}`}
  />
);

const CheckoutPage = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postCode: "",
    country: "Pakistan",
  });

  const [paymentMethod, setPaymentMethod] = useState(""); // "cod" or "bank_transfer"
  const [paymentScreenshot, setPaymentScreenshot] = useState(null); // base64
  const [screenshotPreview, setScreenshotPreview] = useState(null);

  // Pre-fill from session if logged in
  useEffect(() => {
    if (session?.user) {
      setFormData((prev) => ({
        ...prev,
        firstName: prev.firstName || session.user.name?.split(" ")[0] || "",
        lastName: prev.lastName || session.user.name?.split(" ").slice(1).join(" ") || "",
        email: prev.email || session.user.email || "",
      }));
    }
  }, [session]);

  const { cartItems, clearCart } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * (item.qty ?? 1),
    0
  );
  const shipping = subtotal === 0 ? 0 : subtotal >= 200 ? 0 : 30;
  const total = subtotal + shipping;



  // ─── Validation ───
  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]{2,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-+()]{7,}$/;

    if (!nameRegex.test(formData.firstName))
      return "First name must be letters only and at least 2 characters.";
    if (!nameRegex.test(formData.lastName))
      return "Last name must be letters only and at least 2 characters.";
    if (!emailRegex.test(formData.email))
      return "Please enter a valid email address.";
    if (!phoneRegex.test(formData.phone))
      return "Please enter a valid phone number.";
    if (!formData.address.trim()) return "Address is required.";
    if (!formData.city.trim()) return "City is required.";
    if (!formData.postCode.trim()) return "Post code is required.";
    return null;
  };

  // ─── Screenshot Handler ───
  const handleScreenshotUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      Swal.fire("File too large", "Please upload an image under 5MB.", "warning");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPaymentScreenshot(reader.result);
      setScreenshotPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeScreenshot = () => {
    setPaymentScreenshot(null);
    setScreenshotPreview(null);
  };

  // ─── Place Order ───
  const handlePlaceOrder = async () => {
    setLoading(true);

    if (total === 0) {
      setLoading(false);
      return Swal.fire({
        icon: "warning",
        title: "Your cart is empty",
        text: "Add something before placing an order.",
        confirmButtonText: "Go to Shop",
        confirmButtonColor: "#000",
      }).then(() => router.push("/shop"));
    }

    if (!paymentMethod) {
      setLoading(false);
      return Swal.fire("Payment Required", "Please select a payment method.", "warning");
    }

    if (paymentMethod === "bank_transfer" && !paymentScreenshot) {
      setLoading(false);
      return Swal.fire(
        "Screenshot Required",
        "Please upload a screenshot of your bank transfer payment.",
        "warning"
      );
    }

    try {
      const orderData = {
        items: cartItems.map((i) => ({
          productId: i._id,
          name: i.name,
          price: i.price,
          qty: i.qty || 1,
        })),
        total,
        shippingAddress: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postCode,
          country: formData.country,
        },
        paymentMethod,
        paymentScreenshot: paymentMethod === "bank_transfer" ? paymentScreenshot : "",
      };

      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const result = await res.json();

      if (result.success) {
        await Swal.fire({
          icon: "success",
          title: "Order Placed!",
          text:
            paymentMethod === "cod"
              ? "Your order has been placed. Pay on delivery!"
              : "Your order has been placed. We'll verify your payment shortly.",
          confirmButtonColor: "#000",
          confirmButtonText: "Continue Shopping",
        });

        clearCart();
        router.push("/");
      } else {
        Swal.fire("Error", result.error || "Failed to place order.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // ─── Empty Cart View ───
  if (total === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center space-y-6">
        <ShoppingBag size={60} className="opacity-40" />
        <h2 className="text-2xl font-headline">Your cart is empty</h2>
        <p className="text-text-muted">
          Add something to your cart to continue
        </p>
        <Link
          href="/shop"
          className="px-10 h-14 flex items-center justify-center rounded-full bg-accent text-text-inverse uppercase tracking-widest text-sm font-bold hover:bg-accent-hover transition"
        >
          Go to Shop
        </Link>
      </div>
    );
  }



  return (
    <div className="min-h-screen bg-bg-page font-sans text-text-primary selection:bg-accent selection:text-text-inverse py-24">
      <main className="w-full mx-auto px-page-x py-16 lg:py-24">

        {/* Optional: Sign in banner for guest users */}
        {status !== "authenticated" && (
          <div className="max-w-3xl mb-10 p-5 bg-bg-card border border-border-default rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium">Have an account?</p>
              <p className="text-xs text-text-muted">
                Sign in for a faster checkout experience. (Optional)
              </p>
            </div>
            <button
              onClick={() => signIn("google")}
              className="px-6 py-2.5 border border-border-default rounded-full text-xs font-bold uppercase tracking-widest hover:bg-bg-subtle transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:flex lg:flex-row justify-around gap-20">
          {/* Left: Forms */}
          <div className="lg:col-span-7 space-y-12 max-w-3xl w-full">
            {/* Steps */}
            <div className="flex flex-wrap gap-8 pb-12 border-b border-border-subtle">
              <StepIndicator number="1" title="Shipping" active={step >= 1} />
              <ChevronRight size={14} className="opacity-20 self-center" />
              <StepIndicator number="2" title="Payment" active={step >= 2} />
              <ChevronRight size={14} className="opacity-20 self-center" />
              <StepIndicator number="3" title="Review" active={step >= 3} />
            </div>

            {/* ── Step 1: Shipping ── */}
            <section className={step !== 1 ? "opacity-40 pointer-events-none" : ""}>
              <h3 className="text-lg font-headline font-bold mb-6">
                Shipping Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
                <InputField
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
                <InputField
                  type="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="md:col-span-2"
                />
                <InputField
                  type="tel"
                  placeholder="Phone Number *"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="md:col-span-2"
                />
                <InputField
                  placeholder="Address *"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="md:col-span-2"
                />
                <InputField
                  placeholder="City *"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                />
                <InputField
                  placeholder="Post Code *"
                  value={formData.postCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postCode: e.target.value })
                  }
                />
              </div>
              {step === 1 && (
                <button
                  onClick={() => {
                    const errorMsg = validateForm();
                    if (errorMsg) {
                      return Swal.fire("Invalid input", errorMsg, "warning");
                    }
                    setStep(2);
                  }}
                  className="mt-10 w-full md:w-auto px-12 h-14 bg-accent text-text-inverse rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-accent-hover transition-all active:scale-95"
                >
                  Continue to Payment
                </button>
              )}
            </section>

            {/* ── Step 2: Payment ── */}
            <section className={step < 2 ? "hidden" : step > 2 ? "opacity-40 pointer-events-none" : ""}>
              <h3 className="text-lg font-headline font-bold mb-6">
                Payment Method
              </h3>
              <div className="space-y-4">
                {/* COD Option */}
                <button
                  onClick={() => {
                    setPaymentMethod("cod");
                    removeScreenshot();
                  }}
                  className={`w-full p-6 border-2 rounded-2xl flex items-center justify-between transition-all duration-300 ${
                    paymentMethod === "cod"
                      ? "border-accent bg-accent/5 shadow-sm"
                      : "border-border-default bg-bg-card hover:border-border-strong"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        paymentMethod === "cod"
                          ? "bg-accent text-text-inverse"
                          : "bg-bg-subtle text-text-muted"
                      }`}
                    >
                      <Truck size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">Cash on Delivery</p>
                      <p className="text-xs text-text-muted">
                        Pay when your order arrives
                      </p>
                    </div>
                  </div>
                  {paymentMethod === "cod" && (
                    <CheckCircle2 size={22} className="text-accent" />
                  )}
                </button>

                {/* Bank Transfer Option */}
                <button
                  onClick={() => setPaymentMethod("bank_transfer")}
                  className={`w-full p-6 border-2 rounded-2xl flex items-center justify-between transition-all duration-300 ${
                    paymentMethod === "bank_transfer"
                      ? "border-accent bg-accent/5 shadow-sm"
                      : "border-border-default bg-bg-card hover:border-border-strong"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        paymentMethod === "bank_transfer"
                          ? "bg-accent text-text-inverse"
                          : "bg-bg-subtle text-text-muted"
                      }`}
                    >
                      <Banknote size={20} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold">Bank Transfer</p>
                      <p className="text-xs text-text-muted">
                        Transfer to our account & upload receipt
                      </p>
                    </div>
                  </div>
                  {paymentMethod === "bank_transfer" && (
                    <CheckCircle2 size={22} className="text-accent" />
                  )}
                </button>

                {/* Bank Details + Screenshot Upload (shown when bank_transfer selected) */}
                {paymentMethod === "bank_transfer" && (
                  <div className="mt-6 space-y-6 animate-in fade-in duration-300">
                    {/* Bank Details Card */}
                    <div className="p-6 bg-bg-subtle border border-border-default rounded-2xl space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
                        Transfer to this account
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-text-disabled font-bold">
                            Account Title
                          </p>
                          <p className="text-sm font-bold mt-1">
                            {BANK_DETAILS.accountTitle}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-text-disabled font-bold">
                            Account Number
                          </p>
                          <p className="text-sm font-bold mt-1 font-mono">
                            {BANK_DETAILS.accountNumber}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-text-disabled font-bold">
                            Bank Name
                          </p>
                          <p className="text-sm font-bold mt-1">
                            {BANK_DETAILS.bankName}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-widest text-text-disabled font-bold">
                            IBAN
                          </p>
                          <p className="text-sm font-bold mt-1 font-mono">
                            {BANK_DETAILS.iban}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Screenshot Upload */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted mb-4">
                        Upload Payment Screenshot
                      </h4>
                      {!screenshotPreview ? (
                        <label className="flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-border-default rounded-2xl cursor-pointer hover:border-accent hover:bg-accent/5 transition-all duration-300 group">
                          <Upload
                            size={28}
                            className="text-text-disabled group-hover:text-accent transition-colors mb-3"
                          />
                          <p className="text-sm font-medium text-text-muted group-hover:text-accent transition-colors">
                            Click to upload screenshot
                          </p>
                          <p className="text-[10px] text-text-disabled mt-1">
                            PNG, JPG up to 5MB
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleScreenshotUpload}
                          />
                        </label>
                      ) : (
                        <div className="relative border border-border-default rounded-2xl overflow-hidden">
                          <img
                            src={screenshotPreview}
                            alt="Payment screenshot"
                            className="w-full max-h-64 object-contain bg-bg-subtle"
                          />
                          <button
                            onClick={removeScreenshot}
                            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-lg hover:bg-red-50 transition-colors"
                          >
                            <X size={16} className="text-red-500" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {step === 2 && paymentMethod && (
                <button
                  onClick={() => {
                    if (
                      paymentMethod === "bank_transfer" &&
                      !paymentScreenshot
                    ) {
                      return Swal.fire(
                        "Screenshot Required",
                        "Please upload your payment screenshot before continuing.",
                        "warning"
                      );
                    }
                    setStep(3);
                  }}
                  className="mt-10 w-full md:w-auto px-12 h-14 bg-accent text-text-inverse rounded-full font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-accent-hover transition-all active:scale-95"
                >
                  Review Order
                </button>
              )}
            </section>

            {/* ── Step 3: Review & Place Order ── */}
            <section className={step < 3 ? "hidden" : ""}>
              <h3 className="text-lg font-headline font-bold mb-6">
                Review Your Order
              </h3>

              {/* Shipping Summary */}
              <div className="p-6 bg-bg-card border border-border-default rounded-2xl mb-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                  Shipping To
                </h4>
                <p className="text-sm font-bold">
                  {formData.firstName} {formData.lastName}
                </p>
                <p className="text-sm text-text-muted">
                  {formData.address}, {formData.city}, {formData.postCode}
                </p>
                <p className="text-sm text-text-muted">{formData.email}</p>
                <p className="text-sm text-text-muted">{formData.phone}</p>
              </div>

              {/* Payment Summary */}
              <div className="p-6 bg-bg-card border border-border-default rounded-2xl mb-8 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-widest text-text-muted">
                  Payment Method
                </h4>
                <div className="flex items-center space-x-3">
                  {paymentMethod === "cod" ? (
                    <>
                      <Truck size={18} className="text-accent" />
                      <span className="text-sm font-bold">
                        Cash on Delivery
                      </span>
                    </>
                  ) : (
                    <>
                      <Banknote size={18} className="text-accent" />
                      <span className="text-sm font-bold">Bank Transfer</span>
                    </>
                  )}
                </div>
                {paymentMethod === "bank_transfer" && screenshotPreview && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                    <ImageIcon size={14} />
                    <span>Payment screenshot uploaded ✓</span>
                  </div>
                )}
              </div>

              {/* Free shipping nudge */}
              {subtotal < 200 && (
                <Link
                  href="/shop"
                  className="w-full h-14 mb-6 bg-bg-subtle text-text-primary border border-border-default rounded-full font-bold uppercase tracking-[0.2em] text-[11px] flex items-center justify-center hover:bg-bg-card transition-all"
                >
                  Add ${(200 - subtotal).toFixed(2)} more for free shipping
                </Link>
              )}

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full h-16 bg-accent text-text-inverse rounded-full font-bold uppercase tracking-[0.3em] text-[12px] flex items-center justify-center shadow-xl shadow-accent/10 hover:bg-accent-hover transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed gap-3"
              >
                <Lock size={16} />
                {loading
                  ? "Processing..."
                  : `Pay $${total.toFixed(2)} — Place Order`}
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-[10px] text-text-disabled uppercase tracking-widest font-bold">
                <Lock size={12} />
                <span>Secure checkout</span>
              </div>
            </section>
          </div>

          {/* Right: Order Summary */}
          <CartCard
            cartItems={cartItems}
            subtotal={subtotal.toFixed(2)}
            shipping={shipping.toFixed(2)}
            total={total.toFixed(2)}
          />
        </div>
      </main>
    </div>
  );
};

export default CheckoutPage;