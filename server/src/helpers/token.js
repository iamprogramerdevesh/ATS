import jwt from "jsonwebtoken";

const generateTokens = async (UserInfo) => {
  try {
    const { id: UserId } = UserInfo;
    const payload = { id: UserId };

    const authToken = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "168h" }
    );

    return { authToken };
  } catch (err) {
    return err;
  }
};

export default generateTokens;