const UserCard = ({ user }) => {
  const { firstName, lastName, photoURL, age, gender, skills } = user;

  return (
    <div className="card bg-base-300 w-96 shadow-lg ">
      <figure className="px-10 pt-10">
        <img src={photoURL} alt="Shoes" className="rounded-xl w-full" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{gender + "   " + age} </p>}
        {skills && <p> Skills : {skills.join(",")}</p>}
        <div className="card-actions mb-4">
          <button className="btn btn-secondary">Interested</button>
          <button className="btn btn-primary">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
