const Contact = () => {
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
      </div>
      <div className="mb-3">
        <label className="form-label">Example textarea</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" >
        </textarea>
      </div>
    </>
  );
}

export default Contact
