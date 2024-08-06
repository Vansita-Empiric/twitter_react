import { User } from "../model/user.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong while generating access and refresh token",
    });
    return console.log(
      "Something went wrong while generating access and refresh token"
    );
  }
};

const registerUser = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log(req.body);
  console.log(password);

  const emailPattern = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,}$/;
  const isValid = emailPattern.test(email);

  if (
    email === "" ||
    username === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    res.status(400).json({ message: "All fields are required" });
    return console.log("All fields are required");
  }
  if (!isValid) {
    res.status(400).json({ message: "Invalid email" });
    return console.log("Invalid email");
  }
  if (password !== confirmPassword) {
    res
      .status(400)
      .json({ message: "password and confirm password are different" });
    return console.log("password and confirm password are different");
  }
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existedUser) {
    res.status(400).json({ message: "username or password already exist" });
    return console.log("username or password already exist");
  }
  const user = await User.create({
    email,
    password,
    username,
  });
  const createdUser = await User.findById(user._id).select("-password");
  if (!createdUser) {
    res
      .status(500)
      .json({ message: "Something went wrong while registering user" });
    return console.log("Something went wrong while registering user");
  }
  res.status(201).json({ message: "User registered successfully!" });
  return console.log("User registered successfully!");
};

const loginUser = async (req, res) => {
  // 1. req body -> data
  // 2. username or email
  // 3. find the user
  // 4. password check
  // 5. access and refresh token
  // 6. send cookies
  const { username, email, password } = req.body;

  if (!(username || email)) {
    res.status(400).json({ message: "username or email is required" });
    return console.log("username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    res.status(404).json({ message: "user does not exist" });
    return console.log("user does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    res.status(401).json({ message: "Incorrect Password" });
    return console.log("Incorrect Password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  await User.findById(user._id).select("-password -refreshToken");

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({ message: "User logged in successfully" });
  return console.log("User logged in successfully");
};

const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ message: "User logged out" });
  return console.log("User logged out");
};

export { registerUser, loginUser, logoutUser };
