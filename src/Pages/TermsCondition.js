import React from "react";
import Footer from "../components/Footer/Footer";
import CommonLayout from "./CommonLayout";

const TermsCondition = () => {
  return (
    <CommonLayout>
      <div className=" container my-10 space-y-5">
        <p className=" text-2xl text-textColor font-semibold ">
          Terms &amp; Conditions
        </p>

        <p className=" text-xl text-textColor font-semibold ">
          1. Introduction:
        </p>
        <p>
          Our Privacy Policy also governs your use of our Service and explains
          how we collect, safeguard and disclose information that results from
          your use of our web pages.
        </p>

        <p>
          Your agreement with us includes these Terms and our Privacy Policy
          (“Agreements”). You acknowledge that you have read and understood the
          Agreements, and agree to be bound of them.
        </p>

        <p>
          If you do not agree with (or cannot comply with) Agreements, then you
          may not use the Service, but please let us know by emailing at
          krishanagro18@gmail.com so we can try to find a solution. These Terms
          apply to all visitors, users, and others who wish to access or use
          Service.
        </p>
        <p className=" text-xl text-textColor font-semibold ">
          2. Communications:
        </p>

        <p>
          By using our Service, you agree to subscribe to newsletters, marketing
          or promotional materials and other information we may send. However,
          you may opt out of receiving any, or all, of these communications from
          us by following the unsubscribe link or by emailing at
          krishanagro18@gmail.com or unsubcription.{" "}
        </p>
        <p className=" text-xl text-textColor font-semibold ">3. Purchases:</p>
        <p>
          If you wish to purchase any product or service made available through
          Service (“Purchase”), you may be asked to supply certain information
          relevant to your Purchase including but not limited to, your credit or
          debit card number, the expiration date of your card, your billing
          address, and your shipping information.
        </p>
        <p>
          You represent and warrant that: (i) you are legally entitled to use
          any card(s) or other payment method(s) in connection with any
          Purchase; and (ii) the information you supply to us is true, correct,
          and complete.
        </p>
        <p>
          We may employ the use of third-party services to facilitate payment
          and the completion of purchases. By submitting your information, you
          grant us the right to provide the information to these third parties
          subject to our Privacy Policy.
        </p>
        <p>
          We reserve the right to refuse or cancel your order at any time for
          reasons including but not limited to product or service availability,
          errors in the description or price of the product or service, errors
          in your order or other reasons.
        </p>
        <p>
          We reserve the right to refuse or cancel your order if fraud or an
          unauthorized or illegal transaction is suspected.
        </p>
        <p className=" text-xl text-textColor font-semibold ">
          4. Contests, sweepstakes, and Promotions
        </p>
        <p>
          Any contests, sweepstakes, or other promotions (collectively,
          “Promotions”) made available through the Service may be governed by
          rules that are separate from these Terms of Service. If you
          participate in any promotions, please review the applicable rules as
          well as our Privacy Policy. If the rules for a promotion conflict with
          these Terms of Service, promotion rules will apply.
        </p>
        <p className=" text-xl text-textColor font-semibold ">
          5. Return policy:
        </p>
        <p>
          Any product may be returned by a user during the time of delivery or
          within 7 days if:
        </p>
        <ul>
          <li>1. Has a problem with the packaging</li>
          <li>2. The product falls short of what the user had hoped for.</li>
          <li>3. Found damage during delivery time</li>
          <li>4. Received in an unfavorable or unexpected state</li>
          <li>5. Got wrong product</li>
        </ul>
        <p>
          {" "}
          We have a one (1) day return policy for perishable items including
          fresh fruit and vegetables, milk, and other perishable foods. We will
          identify the problem and make solution. But any fake return system is
          not allowed.
        </p>
        <p>
          We keep an eye on accounts of consumers who make a lot of returns and
          refund requests. To avoid this, we take the appropriate actions.
        </p>
        <p className=" text-xl text-textColor font-semibold ">
          6. Refund policy:
        </p>
        <p>
          Krishan Bazar makes every effort to assist users. However, if for any
          reason we are unable to keep our word or supply the service, we will
          let you know within 24-72 hours via push notification, phone, text, or
          email. If our service is unable to provide it and a refund is
          necessary, it will be processed no later than 7 working days after our
          acknowledgement to your account. Refund requests will be addressed in
          the following situations:
        </p>
        <ul>
          <li>
            1. We will process your refund when we have evaluated your return.
          </li>
          <li>
            2. There is no money to be refunded if you chose Cash on Delivery
            (COD) because you haven't paid for your item.
          </li>
          <li>
            3. Please be aware that the shipping fee and the Cash on Delivery
            convenience fee are non-refundable and are not included in the value
            of your order's refund.
          </li>
          <li>
            4. You will get a refund for payments made using a credit card,
            debit card, mobile banking, or bank transfer in the appropriate
            account.
          </li>
          <li>
            5. If an online transaction is made again because of a technical
            issue, a payment refund will be issued.
          </li>
        </ul>
      </div>
      <Footer />
    </CommonLayout>
  );
};

export default TermsCondition;
