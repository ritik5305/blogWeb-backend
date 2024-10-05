export const sendToken = (user, statusCode, message, res) => {
  const token = user.getJWTToken();
  
  // Ensure COOKIE_EXPIRE is a valid number, default to 7 days if undefined
  const cookieExpireDays = Number(process.env.COOKIE_EXPIRE) || 7;
  
  const options = {
    expires: new Date(
      Date.now() + cookieExpireDays * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  
  // Log to check if expires is valid
  console.log("Cookie Expires At:", options.expires);
  
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    message,
    token,
  });
};
