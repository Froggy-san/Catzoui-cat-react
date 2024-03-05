import supabase, { supabaseUrl } from "./supabase";

interface signUpProps {
  avatar: File[] | [];
  building_num: string;
  city: string;
  email: string;
  phone: string;
  street: string;
  username: string;
  password: string;
}

export async function signup({
  email,
  password,
  username,
  street,
  phone,
  city,
  building_num,
  avatar,
}: signUpProps) {
  //   console.log(
  //     email,
  //     password,
  //     street,
  //     city,
  //     building_num,
  //     phone,
  //     username,
  //     avatar,
  //     "data from the api !!>>>"
  //   );

  //   const fileName = `avater-${data.user.id}-${Math.random()}`;

  //   const { error: storageError } = await supabase.storage
  //     .from("avaters")
  //     .upload(fileName, avatar); // just watch one of the videos where he uploads images, like video 24 7mins .

  let imageName;
  let imagePath;
  if (avatar.length > 0) {
    imageName = `avatar-${Math.random()}-${avatar[0].name}`.replace(/\//g, "");
    //danikyifviurhveealoe.supabase.co/storage/v1/object/public/avatar/402655289_360577659974552_7874423053522086265_n.jpg?t=2024-02-21T19%3A12%3A38.469Z
    imagePath = `${supabaseUrl}/storage/v1/object/public/avatar/${imageName}`;
  } else {
    imageName = "";
    imagePath = "";
  }

  console.log(imagePath, "imagepath here !!");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,

    // this is the options we want to give the user the ability to change, that is why it shows in the user_metadata in react query's dev tool .
    options: {
      data: {
        username,
        city,
        street,
        building_num,
        phone,
        avater: imagePath,
      },
    },
  });

  console.log(data, "data from signup!!!>>>");
  if (error) throw error;

  if (!error && imageName !== "") {
    const { error: storageError } = await supabase.storage
      .from("avatar")
      .upload(imageName, avatar[0]);

    if (storageError) console.error(storageError, "erorr from api");
  }

  return data;
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
}

export async function getCurrentUser() {
  /// this will get the data from localstorage , if it exists of course .
  const { data: session } = await supabase.auth.getSession();

  /// it seems obvious but am ganna say it anyways , so if the user's data isn't in the localStorage it iwll return null , so we are ganna get the user's data some other way , like redirectiong the user to the login page or soemthing , i don't know up until this point .
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  console.log(data);

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(`Had truble loging out`);
}

interface updateUser {
  password?: string;
  username?: string;
  street?: string;
  phone?: string;
  city?: string;
  building_num?: string;
  imageToRemove?: string;
  avatar?: string | File[];
}

export async function updateUser({
  password,
  username,
  street,
  phone,
  imageToRemove,
  city,
  building_num,
  avatar,
}: updateUser) {
  console.log(
    username,
    street,
    imageToRemove,
    phone,
    city,
    building_num,
    imageToRemove,
    avatar,
    "DATA RECEIVED BY THE UPDATING API"
  );

  if (password) {
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) throw new Error(`Had truble updating the password`);
  }

  let imageName;
  let imagePath;
  if (avatar && typeof avatar !== "string") {
    imageName = `avatar-${Math.random()}-${avatar[0].name}`.replace(/\//g, "");
    //danikyifviurhveealoe.supabase.co/storage/v1/object/public/avatar/402655289_360577659974552_7874423053522086265_n.jpg?t=2024-02-21T19%3A12%3A38.469Z
    imagePath = `${supabaseUrl}/storage/v1/object/public/avatar/${imageName}`;
  } else {
    imageName = "";
    imagePath = "";
  }

  console.log(imagePath, "imagepath here !!");

  const { data, error } = await supabase.auth.updateUser({
    data: { username, street, phone, city, building_num },
  });

  if (avatar && typeof avatar !== "string") {
    const { error: updateProfilePicError } = await supabase.auth.updateUser({
      data: { avater: imagePath },
    });

    if (updateProfilePicError)
      throw new Error(`had truble updating the profile picture`);
  }

  if (!error && avatar && imageName !== "") {
    const { error: storageError } = await supabase.storage
      .from("avatar")
      .upload(imageName, avatar[0]);

    if (storageError) console.error(storageError, "erorr from api");

    if (!storageError && imageToRemove) {
      const { error } = await supabase.storage
        .from("avatar")
        .remove([imageToRemove]);
      if (error) throw new Error(`profile image didn't get deleted.`);
    }
  }

  return data;
}
