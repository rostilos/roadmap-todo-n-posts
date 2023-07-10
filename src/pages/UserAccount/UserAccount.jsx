import React, { useState } from "react";
import EditUserForm from "../../components/UserAccount/components/Form/EditUserForm";
import EditUserPasswordForm from "../../components/UserAccount/components/Form/EditUserPasswordForm";
import UserEditTabs from "../../components/UserAccount/components/UserEditTabs";
import useAppContext from "../../hook/useAppContext";

const UserAccount = function () {
  const { userData } = useAppContext();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (id) => {
    setActiveTab(id);
  };
  console.log(activeTab);

  return (
    <div>
      <div className="user-account _section">
        <h1 className="page__title">Account Information</h1>

        <p>{userData?.firstname}</p>
        <p>{userData?.lastname}</p>
        <p>{userData?.birth_date}</p>
        <p>{userData?.email}</p>
      </div>
      <UserEditTabs handleTabChange={handleTabChange} activeTab={activeTab}>
        {activeTab === 0 && <EditUserForm userData={userData} />}
        {activeTab === 1 && <EditUserPasswordForm />}
      </UserEditTabs>
    </div>
  );
};

export default UserAccount;
