import { getOneUser } from "@/utils/callAPI";
import React from "react";

const SinglePageUser = async ({ params }) => {
  const { id } = params;
  const data = await getOneUser(id);
  return (
    <div>
      <div>aaaab</div>
    </div>
  );
};

export default SinglePageUser;
