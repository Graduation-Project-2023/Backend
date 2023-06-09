import { PaymentProcessor } from "../models/paymentProcessor";
import { Request, Response, NextFunction } from "express";
import { createHmac } from "crypto";
import axios from "axios";

export class PaymentController {
  checkout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { order_cart, billing_data, amount_cents, type, identifier } =
        req.body;
      const paymentKey = await PaymentProcessor.pay(
        order_cart,
        billing_data,
        amount_cents,
        type
      );
      if (type == "card") {
        const link = `https://accept.paymob.com/api/acceptance/iframes/416800?payment_token=${paymentKey}`;
        return res.status(200).json(link);
      } else if (type == "wallet" && identifier.length == 11) {
        const url = "https://accept.paymob.com/api/acceptance/payments/pay";
        const req = await axios.post(
          url,
          {
            source: {
              identifier: identifier,
              subtype: "WALLET",
              type: "WALLET",
            },
            payment_token: paymentKey,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return res.status(200).json(req.data.redirect_url);
      }
    } catch (err) {
      next(err);
    }
  };

  // get trx by id
  getById = async (req: Request, res: Response, next: NextFunction) => {
    const { transactionId } = req.params;
    try {
      const transaction = await PaymentProcessor.getById(transactionId);
      res.status(200).json(transaction);
    } catch (err) {
      next(err);
    }
  };

  refund = async (req: Request, res: Response, next: NextFunction) => {
    const { transactionId, refundAmount } = req.body;
    try {
      const transaction = await PaymentProcessor.refund(
        transactionId,
        refundAmount
      );
      res.status(200).json(transaction);
    } catch (err) {
      next(err);
    }
  };

  void = async (req: Request, res: Response, next: NextFunction) => {
    const { transactionId } = req.body;
    try {
      const transaction = await PaymentProcessor.void(transactionId);
      res.status(200).json(transaction);
    } catch (err) {
      next(err);
    }
  };

  order = async (req: Request, res: Response, next: NextFunction) => {
    const order_id = req.params.id;
    try {
      const transaction = await PaymentProcessor.order(order_id);
      res.status(200).json(transaction);
    } catch (err) {
      next(err);
    }
  };

  callback = async (req: Request, res: Response, next: NextFunction) => {
    console.log("callback");
    // Get the transaction details from the request body
    const {
      amount_cents,
      created_at,
      currency,
      error_occured,
      has_parent_transaction,
      id,
      integration_id,
      is_3d_secure,
      is_auth,
      is_capture,
      is_refunded,
      is_standalone_payment,
      is_voided,
      order: { id: order_id },
      owner,
      pending,
      source_data: {
        pan: source_data_pan,
        sub_type: source_data_sub_type,
        type: source_data_type,
      },
      success,
    } = req.body.obj;

    // Create a lexogragical string with the order specified by Paymob @ https://docs.paymob.com/docs/hmac-calculation
    let lexogragical =
      amount_cents +
      created_at +
      currency +
      error_occured +
      has_parent_transaction +
      id +
      integration_id +
      is_3d_secure +
      is_auth +
      is_capture +
      is_refunded +
      is_standalone_payment +
      is_voided +
      order_id +
      owner +
      pending +
      source_data_pan +
      source_data_sub_type +
      source_data_type +
      success;

    // Create a hash using the lexogragical string and the HMAC key
    let hash = createHmac("sha512", process.env.HMAC_KEY as string)
      .update(lexogragical)
      .digest("hex");

    // Compare the hash with the hmac sent by Paymob to verify the request is authentic
    if (hash === req.query.hmac) {
        console.log("hash is correct");
      // the request is authentic and you can store in the db whtever you want
    //   const payment = new payStore({
    //     amount_cents,
    //     created_at,
    //     currency,
    //     error_occured,
    //     has_parent_transaction,
    //     id,
    //     integration_id,
    //     is_3d_secure,
    //     is_auth,
    //     is_capture,
    //     is_refunded,
    //     is_standalone_payment,
    //     is_voided,
    //     order_id,
    //     owner,
    //     pending,
    //     source_data_pan,
    //     source_data_sub_type,
    //     source_data_type,
    //     success,
    //   });
    //   await payment.save();
      return;
    }
  };
}
