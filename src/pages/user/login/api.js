export const idDuplicateCheck = async (id) => {
  const response = await fetch(`/api/check-id?email=${id}`);
  const data = await response.json();
  return data.isAvailable;
};

export const nicknameDuplicateCheck = async (nickname) => {
  const response = await fetch(`/api/check-nickname?nickname=${nickname}`);
  const data = await response.json();
  return data.isAvailable;
};

export const sendVerificationCode = async (id) => {
  const response = await fetch(`/api/send-verification-code?email=${id}`, {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to send verification code.");
  }
};
