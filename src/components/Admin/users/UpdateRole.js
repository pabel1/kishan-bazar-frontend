import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateRoleAPI } from "../../../api/userApi";

const UpdateRole = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [role, setRole] = useState("");

  //    set productdata to dropdown
  useEffect(() => {
    setRole(location.state.userRole);
  }, []);
  const handleUpdate = () => {
    const updateRole = async () => {
      const res = await updateRoleAPI(location.state._id, role); //api call
      if (res && res.status === 200) {
        toast.success(res.data.message);
        navigate("/admin");
      }
    };
    updateRole();
  };
  return (
    <div>
      <h2 className="mb-4 text-secondary text-[1.2rem] font-semibold">
        Update Product
      </h2>
      <div className="w-full flex flex-col justify-center items-start gap-6">
        <select
          className="mb-6 w-[50%] outline-none px-[0.8rem] py-[0.5rem] rounded-xl border border-secondary"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="Admin">Admin</option>
          <option value="User">User</option>
          <option value="Moderator">Moderator</option>
        </select>
      </div>

      <button
        onClick={handleUpdate}
        className="flex items-center text-secondary px-[0.8rem] py-[0.5rem] border border-secondary rounded-full transition-all duration-[0.3s] hover:text-white hover:bg-secondary"
      >
        Update
      </button>
    </div>
  );
};

export default UpdateRole;
