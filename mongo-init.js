db.createUser(
  {
    user: "noxart",
    pwd: "password",
    roles: [
      {
        role: "readWrite",
        db: "noxart"
      }
    ]
  }
);
