import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../../store/auth-context";

const ProfileForm = () => {
  const authCtx = useContext(AuthContext);
  const newPasswordInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const newEnteredPassword = newPasswordInputRef.current.value;
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDax2R2gWzHXwcMK-iyObT0nuK0iGkxDeQ",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: authCtx.token,
            password: newEnteredPassword,
            returnSecureToken: false,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      if(response.ok){
        alert('Your password was successfully chnaged!');
      }else{
        const errData = await response.json();
        alert(`Failed to change the password, ${errData} `)
      }
    }catch(error) {
      console.log(error);
    }
   
  };
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          minLength="6"
          ref={newPasswordInputRef}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
