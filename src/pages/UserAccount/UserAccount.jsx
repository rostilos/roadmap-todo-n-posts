import React, { useState } from "react";
import EditUserForm from "../../components/UserAccount/components/Form/EditUserForm";
import EditUserPasswordForm from "../../components/UserAccount/components/Form/EditUserPasswordForm";
import UserEditTabs from "../../components/UserAccount/components/UserEditTabs";
import useAppContext from "../../hook/useAppContext";
import userImagePlaceHolder from "../../assets/images/user/user-image-placeholder.png";
import edit from "../../assets/images/common/edit.svg";

const UserAccount = function () {
  const { userData } = useAppContext();
  const [showEditTabs, setShowEditTabs] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (id) => {
    setActiveTab(id);
  };

  const { firstname, lastname, birth_date, email } = userData;
  const fullname = `${firstname} ${lastname}`;

  return (
    <div>
      <div className="user-account _section">
        <h1 className="page__title">Account Information</h1>
        <div className="user-account__body">
          <div className="user-account__image">
            <img src={userImagePlaceHolder} alt="" />
          </div>
          <div className="user-account__info">
            <p className="user-account__fullname">{fullname}</p>
            <p>{birth_date}</p>
            <p>{email}</p>
            <button type="button" onClick={() => setShowEditTabs(!showEditTabs)}>
              <img src={edit} alt="Edit User Data" className="user-account__edit-button" />
            </button>
          </div>
        </div>
      </div>
      {showEditTabs && (
        <UserEditTabs handleTabChange={handleTabChange} activeTab={activeTab}>
          {activeTab === 0 && <EditUserForm userData={userData} />}
          {activeTab === 1 && <EditUserPasswordForm />}
        </UserEditTabs>
      )}
    </div>
  );
};

export default UserAccount;
