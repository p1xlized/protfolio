import { Elysia } from "elysia";
import { z } from "zod";
import { Resend } from "resend";
import {ContactSchema} from "@portfolio/types";
const resend = new Resend(process.env.RESEND_API_KEY);



export const contact = new Elysia({ prefix: "/contact" })
  .post("/", async ({ body, set }) => {
    try {
      const { name, email, message, priority, projectType} = body;

      // 1. Send the notification TO YOU
      const { error: notifyError } = await resend.emails.send({
        from: `Portfolio System <no-reply@pixlized.net>`,
        to: ["apaduret@pixlized.net"],
        replyTo: [email],
        subject: `[contact] [${priority}]New message from ${name}`,
        html: `<strong>FROM:</strong> ${name} (${email})<br/><strong>BODY:</strong> ${message} <br/><strong>MESSAGE:</strong> ${projectType}, end`,
      });

      if (notifyError) {
        set.status = 400;
        return { success: false, error: notifyError };
      }

      // 2. AUTO-RESPONDER: Send a confirmation TO THE SENDER
      // We don't necessarily need to 'await' this if we want the response to be faster,
      // but awaiting ensures we know if BOTH sent successfully.
      await resend.emails.send({
        from: `Alexandru Paduret <no-reply@pixlized.net>`,
        to: [email],
        subject: "Message Received // Alexandru Paduret",
        html: `
          <div style="font-family: monospace; background: #000; color: #10b981; padding: 20px; border: 1px solid #064e3b;">
            <h2 style="color: #fff; margin-bottom: 20px;">> ACKNOWLEDGMENT_RECEIPT</h2>
            <p>Hello ${name},</p>
            <p>Your message has been successfully routed to my terminal. I will review the payload and get back to you shortly.</p>
            <div style="margin: 20px 0; padding: 10px; border-top: 1px solid #064e3b; border-bottom: 1px solid #064e3b;">
              <p style="font-size: 11px; color: #059669; margin: 0;">STATUS: QUEUED_FOR_REVIEW</p>
              <p style="font-size: 11px; color: #059669; margin: 0;">ORIGIN: pixlized.net</p>
            </div>
            <p>Best regards,<br/>Alexandru Paduret</p>
            <p style="font-size: 9px; color: #064e3b; margin-top: 30px;">This is an automated response. Do not reply to this specific address.</p>
          </div>
        `,
      });

      return { success: true, message: "Messages dispatched successfully" };

    } catch (err) {
      set.status = 500;
      return { success: false, error: "Internal Server Error" };
    }
  }, {
    body: ContactSchema
  });
