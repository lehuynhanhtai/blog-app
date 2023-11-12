const url = "http://localhost:3000";

export const findAllCategories = async () => {
  const res = await fetch(url + "/api/categories", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
};
