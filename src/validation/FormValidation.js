import validator from "email-validator";
import { toast } from "react-toastify";

// signup form validate
export const signupFormValidation = ({
  name,
  email,
  phone,
  avatar,
  password,
  confirmPassword,
}) => {
  const regex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
  if (!name || !email || !phone || !password || !confirmPassword || !avatar) {
    toast.info("Please fill the form first");
    return false;
  } else if (!validator.validate(email)) {
    toast.info("Invalid Email");
    return false;
  } else if (!regex.test(phone)) {
    toast.info("Invalid Phone Number");
    return false;
  } else if (password.length < 8) {
    toast.info("Password must be at least 8 character");
    return false;
  } else if (password !== confirmPassword) {
    toast.info("Password does not matched");
    return false;
  } else {
    return true;
  }
};

// login form validate
export const loginFormValidate = ({ email, password }) => {
  const regex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
  if (!email || !password) {
    toast.info("Please fill the form first");
    return false;
  } else if (!validator.validate(email)) {
    toast.info("Invalid Email");
    return false;
  } else if (regex.test(password)) {
    toast.info("Invalid Phone Number");
    return false;
  } else {
    return true;
  }
};

// reset form validate
export const validateResetForm = ({ password, confirmPassword }) => {
  if (!password || !confirmPassword) {
    toast.info("Please fill the form first");
    return false;
  } else if (password !== confirmPassword) {
    toast.info("Password does not matched");
    return false;
  } else if (password.length < 8) {
    toast.info("Password length should be at least 8 character");
    return false;
  } else {
    return true;
  }
};

// forget form validate
export const validateForgetForm = (email) => {
  if (!email) {
    toast.info("Please fill the form first");
    return false;
  } else if (!validator.validate(email)) {
    toast.info("Invalid Email");
    return false;
  } else {
    return true;
  }
};

// update form validate
export const validateUserUpdate = ({ name, email }) => {
  if (!name || !email) {
    toast.info("Please fill the form first");
    return false;
  } else if (!validator.validate(email)) {
    toast.info("Invalid Email");
    return false;
  } else {
    return true;
  }
};

// update form validate
export const updatePasswordFormValidation = ({
  oldPassword,
  newPassword,
  confirmPassword,
}) => {
  if (!oldPassword || !newPassword || !confirmPassword) {
    toast.info("Please fill the form first");
    return false;
  } else if (newPassword !== confirmPassword) {
    toast.info("Password does not matched");
    return false;
  } else {
    return true;
  }
};

// product form validate
export const productFormValidate = ({
  productId,
  price,
  productname,
  description,
  brand,
  image,
  category,
  subcategory,
  stock,
}) => {
  if (
    !productId ||
    !price ||
    !productname ||
    !description ||
    !brand ||
    !image ||
    !category ||
    !subcategory ||
    !stock
  ) {
    toast.info("Please fill required field");
    return false;
  } else {
    return true;
  }
};
// discount product form validate
export const discountProductFormValidate = ({
  productId,
  price,
  productname,
  description,
  discountInPercent,
  image,
  stock,
  brand,
  category,
  subcategory,
}) => {
  if (
    !productId ||
    !price ||
    !productname ||
    !description ||
    !discountInPercent ||
    !image ||
    !stock ||
    !brand ||
    !category ||
    !subcategory
  ) {
    toast.info("Please fill the form first");
    return false;
  } else {
    return true;
  }
};

// client form validate
export const clientFormValidate = ({ name, designation, description }) => {
  if (!name || !designation || !description) {
    toast.info("Please fill the form first");
    return false;
  } else {
    return true;
  }
};

// campaign form validate
export const campaignFormValidate = ({
  campaignname,
  validationDate,
  discountPriceInTk,
  discount,
  category,
}) => {
  if (
    !campaignname ||
    !validationDate ||
    !discountPriceInTk ||
    !discount ||
    !category
  ) {
    toast.info("Please fill the form first");
    return false;
  } else {
    return true;
  }
};

// coupon form validation
export const couponVlidateForm = ({
  name,
  code,
  discountPercent,
  validationDate,
}) => {
  if (!name || !code || !discountPercent || !validationDate) {
    toast.info("Please fill the form first");
    return false;
  } else {
    return true;
  }
};

// shipping form validation
export const shippingFormValidation = ({ address, city, phone, postCode }) => {
  const regex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
  if (!address || !city || !phone || !postCode) {
    toast.info("Please fill the form first");
    return false;
  } else if (!regex.test(phone)) {
    toast.info("Invalid Phone Number");
    return false;
  } else {
    return true;
  }
};

// shipping cost form validation
export const shippingCostVlidateForm = ({
  insideDhaka,
  outsideDhaka,
  bkashNo,
  nagadNo,
  rocketNo,
}) => {
  const regex = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
  if (!insideDhaka || !outsideDhaka || !bkashNo || !nagadNo || !rocketNo) {
    toast.info("Please fill the form first");
    return false;
  } else if (!regex.test(bkashNo)) {
    toast.info("Invalid Bkash Phone Number");
    return false;
  } else if (!regex.test(nagadNo)) {
    toast.info("Invalid Nagad Phone Number");
    return false;
  } else if (!regex.test(rocketNo)) {
    toast.info("Invalid Rocket Phone Number");
    return false;
  } else {
    return true;
  }
};

// shipping form validation
export const aboutFormValidate = ({ title, subHeader, description }) => {
  if (!title || !subHeader || !description) {
    toast.info("Please fill the form first");
    return false;
  } else {
    return true;
  }
};

// payment form validation
export const paymentFormValidation = ({ paymentMethod, transactionId }) => {
  if (!paymentMethod) {
    toast.info("Please select a payment method");
    return false;
  } else if (paymentMethod === "cashOnDelivery") {
    return true;
  } else if (!transactionId) {
    toast.info("Please enter the Transaction Id");
    return false;
  } else {
    return true;
  }
};
