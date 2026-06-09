import { NextRequest, NextResponse } from "next/server";

const ZAPIER_WEBHOOK = "https://hooks.zapier.com/hooks/catch/14955932/4bmvzsb/";
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const MIN_SCORE = 0.5;

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { recaptchaToken, ...formData } = body;

  if (!recaptchaToken) {
    return NextResponse.json({ error: "Verificatie ontbreekt." }, { status: 400 });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Server configuratiefout." }, { status: 500 });
  }

  const verifyResponse = await fetch(RECAPTCHA_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret: secretKey, response: recaptchaToken }),
  });

  const verifyData = await verifyResponse.json();

  if (!verifyData.success || verifyData.score < MIN_SCORE) {
    return NextResponse.json({ error: "Verificatie mislukt. Probeer het opnieuw." }, { status: 400 });
  }

  const zapierResponse = await fetch(ZAPIER_WEBHOOK, {
    method: "POST",
    body: new URLSearchParams(formData),
  });

  if (!zapierResponse.ok) {
    return NextResponse.json({ error: "Versturen mislukt. Probeer het opnieuw." }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
