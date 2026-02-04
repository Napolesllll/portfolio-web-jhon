"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export async function sendContactEmail(data: ContactFormData) {
  const { name, email, subject, message } = data;

  // Validaciones
  if (!name || !email || !subject || !message) {
    return { success: false, error: "Todos los campos son requeridos" };
  }

  if (message.length < 20) {
    return {
      success: false,
      error: "El mensaje debe tener al menos 20 caracteres",
    };
  }

  try {
    // Si NO tienes Resend configurado, simplemente guarda en consola
    if (!process.env.RESEND_API_KEY) {
      console.log("📧 Mensaje de contacto recibido:", {
        name,
        email,
        subject,
        message,
      });

      // Simular delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return { success: true };
    }

    // Si SÍ tienes Resend configurado, envía el email
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>", // Cambia cuando tengas dominio
      to: "canojhon148@gmail.com",
      replyTo: email,
      subject: `Nuevo mensaje de contacto: ${subject}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Asunto:</strong> ${subject}</p>
        <hr />
        <h3>Mensaje:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: "Error al enviar el mensaje. Intenta nuevamente.",
    };
  }
}