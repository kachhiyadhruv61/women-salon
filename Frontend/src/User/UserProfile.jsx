function UserProfile() {
  const user = {
    name: "Aditi Patel",
    email: "aditi@gmail.com",
    phone: "9876543210",
  };

  return (
    <div className="card p-3">
      <h4>My Profile</h4>
      <p><b>Name:</b> {user.name}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Phone:</b> {user.phone}</p>
    </div>
  );
}

export default UserProfile;