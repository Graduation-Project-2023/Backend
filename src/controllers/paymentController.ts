import { PaymentProcessor } from "../models/paymentProcessor";
import { Request, Response, NextFunction } from "express";
import { createHmac } from "crypto";
import axios from "axios";

const PAY_URL = "https://accept.paymob.com/api/acceptance/payments/pay";

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
        return res.status(200).json(paymentKey);
      } else if (type == "wallet" && identifier.length == 11) {
        const req = await axios.post(
          PAY_URL,
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
      } else if (type == "koshk") {
        const req = await axios.post(
          PAY_URL,
          {
            "source": {
              "identifier": "AGGREGATOR", 
              "subtype": "AGGREGATOR"
            },
            payment_token: paymentKey,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        return res.status(200).json({
          bill_reference: req.data.data.bill_reference,
          amount: req.data.amount_cents,
          message: req.data.data.message,
        });
      }
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const transactions = await PaymentProcessor.getAll();
      res.status(200).json(transactions);
    } catch (err) {
      next(err);
    }
  };

  getByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params;
    try {
      const transactions = await PaymentProcessor.getByEmail(email);
      res.status(200).json(transactions);
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

  callback = async (req: Request, res: Response, next: NextFunction) => {
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
        // the request is authentic and you can store in the db whtever you want
        await PaymentProcessor.callback({id, amount: amount_cents, student: req.body.obj.order.shipping_data.email, items: req.body.obj.order.items, order_id, date: new Date(created_at), isRefunded: is_refunded, isVoided: is_voided});
        return;
    }
  };
}
