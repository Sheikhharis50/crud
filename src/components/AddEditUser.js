import React from "react";

const REGEX_PATTERN = {
  regexMobileNumber: /^[1-9]{1}[0-9]{9}$/,
};

function AddEditUser({ user, addAndUpdateUser, onCancel }) {
  const initialState = { firstName: "", lastName: "", phone: "" };

  const [error, setError] = React.useState(false);
  const firstNameRef = React.useRef(initialState.firstName);
  const lastNameRef = React.useRef(initialState.lastName);
  const phoneRef = React.useRef(initialState.phone);

  React.useEffect(() => {
    firstNameRef.current.value = user.firstName;
    lastNameRef.current.value = user.lastName;
    phoneRef.current.value = user.phone;
  }, [user]);

  const handleCancel = (_) => {
    firstNameRef.current.value = initialState.firstName;
    lastNameRef.current.value = initialState.lastName;
    phoneRef.current.value = initialState.phone;
    setError(false);
    onCancel();
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (
      !firstNameRef.current?.value ||
      !lastNameRef.current?.value ||
      !phoneRef.current?.value ||
      !phoneRef.current?.value?.match(REGEX_PATTERN.regexMobileNumber)
    )
      setError(true);
    else {
      addAndUpdateUser({
        ...(user?.id && { id: user.id }),
        firstName: firstNameRef.current?.value,
        lastName: lastNameRef.current?.value,
        phone: phoneRef.current?.value,
      });
      handleCancel();
    }
  };

  return (
    <section>
      <div className="pa-30">
        <form onSubmit={submitForm} noValidate="noValidate">
          <div className="layout-column mb-15">
            <label htmlFor="firstName" className="mb-3">
              First Name
            </label>
            <input
              ref={firstNameRef}
              type="text"
              placeholder="Enter first name"
              name="firstName"
              required
              data-testid="firstNameInput"
            />
          </div>
          <div className="layout-column mb-15">
            <label htmlFor="lastName" className="mb-3">
              Last Name
            </label>
            <input
              ref={lastNameRef}
              type="text"
              placeholder="Enter last name"
              name="lastName"
              required
              data-testid="lastNameInput"
            />
          </div>
          <div className="layout-column mb-15">
            <label htmlFor="phone" className="mb-3">
              Phone Number
            </label>
            <input
              ref={phoneRef}
              type="number"
              placeholder="Enter phone number"
              name="phone"
              required
              data-testid="phoneInput"
            />
          </div>
          {error && (
            <div className="alert error mb-30" data-testid="validationAlert">
              Error: All fields are mandatory. And phone number to be of 10
              digits.
            </div>
          )}
          <div className="layout-row justify-content-end">
            <button
              type="button"
              className=""
              onClick={handleCancel}
              data-testid="cancelEditUserButton"
            >
              Cancel
            </button>
            <button type="submit" className="mx-0" data-testid="addEditButton">
              Add/Edit User
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default AddEditUser;
