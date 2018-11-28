const resUser = userDoc => {
  const doc = userDoc.toObject();
  return {
    _id: doc._id,
    username: doc.username,
    email: doc.email
  };
};

module.exports = {
  resUser
};
